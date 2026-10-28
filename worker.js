// site/ の静的ファイルにない URL だけがここに来る。
// /api/servers は、運営している Misskey サーバーのユーザー数と投稿数を NodeInfo から集めて返す。
// 毎回取りに行かないよう、Cloudflare のキャッシュに10分置く

const HOSTS = ["mattyaski.co", "prismisskey.space"];
const TTL = 600;

async function nodeinfo(host) {
	const res = await fetch(`https://${host}/nodeinfo/2.1`, {
		cf: { cacheTtl: TTL, cacheEverything: true },
	});
	if (!res.ok) throw new Error(`${host}: ${res.status}`);
	const info = await res.json();
	return {
		users: info.usage.users.total,
		notes: info.usage.localPosts,
	};
}

export default {
	async fetch(request) {
		const url = new URL(request.url);
		if (url.pathname !== "/api/servers") {
			return new Response("Not Found", { status: 404 });
		}

		// 1台が落ちていても、もう1台の数字は返す
		const results = await Promise.allSettled(HOSTS.map(nodeinfo));
		const body = Object.fromEntries(
			HOSTS.map((host, i) => [
				host,
				results[i].status === "fulfilled" ? results[i].value : null,
			]),
		);
		return Response.json(body, {
			headers: { "Cache-Control": `public, max-age=${TTL}` },
		});
	},
};
