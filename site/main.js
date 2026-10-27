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

// スクロールしたらナビに背景を付ける
const navWrap = document.querySelector(".nav-wrap");
const onScroll = () =>
	navWrap?.classList.toggle("is-scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// 画面に入ったセクションをふわっと表示する
const revealObserver = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			entry.target.classList.add("is-visible");
			revealObserver.unobserve(entry.target);
		}
	},
	{ rootMargin: "0px 0px -8% 0px" },
);
for (const el of document.querySelectorAll(".reveal")) {
	revealObserver.observe(el);
}

// 画面の中央付近にあるセクションをナビで強調する
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sectionObserver = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			for (const link of navLinks) {
				if (link.hash === `#${entry.target.id}`) {
					link.setAttribute("aria-current", "true");
				} else {
					link.removeAttribute("aria-current");
				}
			}
		}
	},
	{ rootMargin: "-45% 0px -50% 0px" },
);
for (const link of navLinks) {
	const section = document.querySelector(link.hash);
	if (section) sectionObserver.observe(section);
}
