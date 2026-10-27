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

// 年表の見せ方を切り替える。?tl=rail で図の形から始める
const timeline = document.querySelector("life-timeline");
const switches = document.querySelectorAll(".tl-switch [data-variant]");

function setVariant(variant) {
	timeline?.setAttribute("variant", variant);
	for (const button of switches) {
		button.setAttribute(
			"aria-pressed",
			String(button.dataset.variant === variant),
		);
	}
}

const initial = new URLSearchParams(location.search).get("tl");
if (initial === "list" || initial === "rail") setVariant(initial);

for (const button of switches) {
	button.addEventListener("click", () => {
		setVariant(button.dataset.variant);
		const url = new URL(location.href);
		url.searchParams.set("tl", button.dataset.variant);
		history.replaceState(null, "", url);
	});
}
