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
