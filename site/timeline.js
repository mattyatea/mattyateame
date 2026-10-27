// 年表のコンポーネント
// <life-timeline> の中に <life-event> を並べると、
// variant="list" は読み物の形、variant="rail" は図の形で表示する

const KINDS = {
	code: "コード",
	server: "サーバー",
	write: "ブログ",
	oss: "OSS",
	work: "仕事",
	school: "学校",
};

function sheet(css) {
	const s = new CSSStyleSheet();
	s.replaceSync(css);
	return s;
}

// "2021-11" を 2021.83 のような年の小数にする。月がなければ年の真ん中に置く
function toYear(datetime) {
	const [y, m = 7] = datetime.split("-").map(Number);
	return y + (m - 1) / 12;
}

function ageAt(birth, date) {
	let age = date.getFullYear() - birth.getFullYear();
	const before =
		date.getMonth() < birth.getMonth() ||
		(date.getMonth() === birth.getMonth() && date.getDate() < birth.getDate());
	if (before) age--;
	return age;
}

const kindRules = Object.keys(KINDS)
	.map((k) => `:host([kind="${k}"]), .k-${k} { --kind: var(--k-${k}); }`)
	.join("\n");

const eventSheet = sheet(`
${kindRules}

:host {
	display: block;
	--kind: var(--sub);
}

.line,
.dot,
.kind {
	display: none;
}

.age,
.head {
	margin: 0;
	font-size: 14px;
}

.age {
	font-weight: 700;
}

.head {
	color: var(--sub);
	font-variant-numeric: tabular-nums;
}

/* 読み物の形 */

:host([variant="list"]) {
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: baseline;
	padding-block: 12px;
	border-top: 1px dashed var(--line);
}

:host([variant="list"]:first-of-type) {
	border-top: 0;
}

:host([variant="list"]) .age:not(:empty) {
	margin-right: 0.8em;
}

:host([variant="list"]) .body {
	grid-column: 1 / -1;
}

@media (min-width: 600px) {
	:host([variant="list"]) {
		grid-template-columns: 3.4em 7em 1fr;
	}

	:host([variant="list"]) .head {
		padding-right: 16px;
	}

	:host([variant="list"]) .body {
		grid-column: auto;
	}
}

/* 図の形 */

:host([variant="rail"]) {
	position: relative;
	padding: 0 0 28px 36px;
}

:host([variant="rail"]) .line {
	display: block;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 9px;
	width: 2px;
	background: var(--line);
}

:host([variant="rail"]) .age:empty {
	display: none;
}

:host([variant="rail"]) .age {
	position: relative;
	width: fit-content;
	margin: 4px 0 16px -36px;
	padding: 0 10px;
	border-radius: 999px;
	background: var(--fg);
	color: var(--bg);
	font-size: 13px;
	line-height: 1.9;
}

:host([variant="rail"]) .head {
	position: relative;
	font-size: 13px;
}

:host([variant="rail"]) .dot {
	display: block;
	position: absolute;
	top: 0.55em;
	left: -32px;
	box-sizing: border-box;
	width: 12px;
	height: 12px;
	border: 2px solid var(--kind);
	border-radius: 50%;
	background: var(--bg);
}

:host([variant="rail"][milestone]) .dot {
	top: 0.4em;
	left: -34px;
	width: 16px;
	height: 16px;
	border: 0;
	background: var(--kind);
	box-shadow: 0 0 0 4px var(--bg);
}

:host([variant="rail"]) .kind {
	display: inline;
	margin-left: 0.8em;
	color: var(--kind);
}

:host([variant="rail"][milestone]) .body {
	margin-top: 6px;
	padding: 10px 16px;
	border-radius: 8px;
	background: color-mix(in srgb, var(--kind) 10%, transparent);
}

:host([flash]) .body {
	animation: flash 1.4s ease-out;
}

@keyframes flash {
	from {
		background: color-mix(in srgb, var(--kind) 35%, transparent);
	}
}
`);

class LifeEvent extends HTMLElement {
	static observedAttributes = ["age", "kind"];

	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [eventSheet];
		root.innerHTML = `
			<span class="line"></span>
			<p class="age"></p>
			<p class="head"><span class="dot"></span><slot name="when"></slot><span class="kind"></span></p>
			<div class="body"><slot></slot></div>
		`;
	}

	connectedCallback() {
		if (!this.hasAttribute("role")) this.setAttribute("role", "listitem");
		this.render();
	}

	attributeChangedCallback() {
		this.render();
	}

	render() {
		const root = this.shadowRoot;
		const age = this.getAttribute("age");
		root.querySelector(".age").textContent = age ? `${age}歳` : "";
		root.querySelector(".kind").textContent =
			KINDS[this.getAttribute("kind")] ?? "";
	}
}

const timelineSheet = sheet(`
${kindRules}

:host {
	display: block;
}

.overview,
.now {
	display: none;
}

/* 上の概観。年の軸に出来事を点で置く */

:host([variant="rail"]) .overview {
	display: block;
	container-type: inline-size;
	margin-bottom: 32px;
	padding: 16px 16px 12px;
	border: 1px solid var(--line);
	border-radius: 10px;
}

.axis,
.years {
	position: relative;
}

.axis {
	height: 56px;
}

.axis::before {
	content: "";
	position: absolute;
	right: 0;
	bottom: 8px;
	left: 0;
	height: 2px;
	background: var(--line);
}

.tick {
	position: absolute;
	bottom: calc(9px + var(--level) * 13px);
	width: 10px;
	height: 10px;
	translate: -50% 50%;
	border-radius: 50%;
	background: var(--kind);
	cursor: pointer;
	transition: scale 0.15s;
}

.tick.milestone {
	width: 14px;
	height: 14px;
	box-shadow: 0 0 0 2px var(--bg);
}

.tick:hover {
	scale: 1.4;
}

.years {
	height: 34px;
	margin-top: 4px;
}

.years span {
	position: absolute;
	translate: -50% 0;
	color: var(--sub);
	font-size: 11px;
	line-height: 1.4;
	text-align: center;
	font-variant-numeric: tabular-nums;
}

.years small {
	display: block;
	font-size: 10px;
}

/* 幅が狭いときは、1年おきに目盛りを出す */
@container (max-width: 480px) {
	.years .odd {
		visibility: hidden;
	}
}

.legend {
	display: flex;
	flex-wrap: wrap;
	gap: 4px 16px;
	margin: 12px 0 0;
	padding: 0;
	list-style: none;
	color: var(--sub);
	font-size: 12px;
}

.legend li::before {
	content: "";
	display: inline-block;
	width: 8px;
	height: 8px;
	margin-right: 6px;
	border-radius: 50%;
	background: var(--kind);
}

:host([variant="rail"]) .now {
	display: block;
	width: fit-content;
	margin: 0;
	padding: 0 10px;
	border-radius: 999px;
	background: var(--k-oss);
	color: var(--bg);
	font-size: 13px;
	font-weight: 700;
	line-height: 1.9;
}
`);

class LifeTimeline extends HTMLElement {
	static observedAttributes = ["variant", "birth"];

	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [timelineSheet];
		root.innerHTML = `
			<div class="overview" aria-hidden="true">
				<div class="axis"></div>
				<div class="years"></div>
				<ul class="legend"></ul>
			</div>
			<slot></slot>
			<p class="now"></p>
		`;
		root
			.querySelector("slot")
			.addEventListener("slotchange", () => this.render());
	}

	connectedCallback() {
		if (!this.hasAttribute("role")) this.setAttribute("role", "list");
		this.render();
	}

	attributeChangedCallback() {
		this.render();
	}

	get events() {
		return [...this.querySelectorAll(":scope > life-event")];
	}

	render() {
		const variant = this.getAttribute("variant") ?? "list";
		for (const event of this.events) event.setAttribute("variant", variant);
		if (variant === "rail") this.renderOverview();
	}

	renderOverview() {
		const root = this.shadowRoot;
		const birth = new Date(this.getAttribute("birth") ?? "");
		const today = new Date();
		const end = today.getFullYear() + today.getMonth() / 12;

		const items = this.events
			.map((event) => {
				const time = event.querySelector('time[slot="when"]');
				return {
					event,
					at: toYear(time?.getAttribute("datetime") ?? ""),
					label: time?.textContent ?? "",
					kind: event.getAttribute("kind") ?? "",
					milestone: event.hasAttribute("milestone"),
				};
			})
			.filter((item) => !Number.isNaN(item.at));
		if (items.length === 0) return;

		const start = Math.floor(Math.min(...items.map((item) => item.at)));
		const pos = (year) => `${((year - start) / (end - start)) * 100}%`;

		// 近い時期の点は、上に積んで重ならないようにする
		const levels = new Map();
		const ticks = items.map((item) => {
			const bucket = Math.round(item.at * 2);
			const level = levels.get(bucket) ?? 0;
			levels.set(bucket, level + 1);

			const tick = document.createElement("span");
			tick.className = `tick k-${item.kind}${item.milestone ? " milestone" : ""}`;
			tick.style.left = pos(item.at);
			tick.style.setProperty("--level", String(level));
			tick.title = item.label;
			tick.addEventListener("click", () => {
				item.event.scrollIntoView({ behavior: "smooth", block: "center" });
				item.event.setAttribute("flash", "");
				setTimeout(() => item.event.removeAttribute("flash"), 1400);
			});
			return tick;
		});
		root.querySelector(".axis").replaceChildren(...ticks);

		const years = [];
		for (let y = start; y <= Math.floor(end); y++) {
			const label = document.createElement("span");
			label.style.left = pos(y);
			if ((y - start) % 2 === 1) label.className = "odd";
			label.textContent = String(y);
			if (!Number.isNaN(birth.getTime())) {
				const age = document.createElement("small");
				age.textContent = `${ageAt(birth, new Date(y, 0, 1))}歳`;
				label.append(age);
			}
			years.push(label);
		}
		root.querySelector(".years").replaceChildren(...years);

		const kinds = new Set(items.map((item) => item.kind));
		const legend = Object.entries(KINDS)
			.filter(([kind]) => kinds.has(kind))
			.map(([kind, name]) => {
				const li = document.createElement("li");
				li.className = `k-${kind}`;
				li.textContent = name;
				return li;
			});
		root.querySelector(".legend").replaceChildren(...legend);

		root.querySelector(".now").textContent = Number.isNaN(birth.getTime())
			? "いま"
			: `いま ${ageAt(birth, today)}歳`;
	}
}

customElements.define("life-event", LifeEvent);
customElements.define("life-timeline", LifeTimeline);
