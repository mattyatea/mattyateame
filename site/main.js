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

// 運営しているサーバーの数字を NodeInfo から読み込む。
// 読み込めないときは HTML に書いてある数字のまま残す
for (const card of document.querySelectorAll("[data-misskey]")) {
	const field = (name) => card.querySelector(`[data-field="${name}"]`);

	fetch(`https://${card.dataset.misskey}/nodeinfo/2.1`)
		.then((res) => {
			if (!res.ok) throw new Error(String(res.status));
			return res.json();
		})
		.then((info) => {
			field("users").textContent = info.usage.users.total.toLocaleString();
			field("notes").textContent = info.usage.localPosts.toLocaleString();
			field("version").textContent = info.software.version;
			const status = field("status");
			status.textContent = "稼働中";
			status.classList.add("is-up");
		})
		.catch(() => {});
}
