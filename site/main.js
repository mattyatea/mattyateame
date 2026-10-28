// 年齢と年号を今日の日付から出す
const today = new Date();

function yearsSince(year, month, day = 1) {
	let years = today.getFullYear() - year;
	const m = today.getMonth() + 1 - month;
	if (m < 0 || (m === 0 && today.getDate() < day)) years--;
	return years;
}

for (const el of document.querySelectorAll("[data-age]")) {
	el.textContent = String(yearsSince(2008, 7, 3));
}
for (const el of document.querySelectorAll("[data-year]")) {
	el.textContent = String(today.getFullYear());
}

// 運営しているサーバーのユーザー数と投稿数を、Worker（worker.js）経由で読み込む。
// 読み込めないときは HTML に書いてある数字のまま残す
fetch("/api/servers")
	.then((res) => (res.ok ? res.json() : {}))
	.then((servers) => {
		for (const card of document.querySelectorAll("[data-misskey]")) {
			const server = servers[card.dataset.misskey];
			if (!server) continue;
			const field = (name) => card.querySelector(`[data-field="${name}"]`);
			field("users").textContent = server.users.toLocaleString();
			field("notes").textContent = server.notes.toLocaleString();
		}
	})
	.catch(() => {});
