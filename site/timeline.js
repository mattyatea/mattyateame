// 年表のコンポーネント
// <life-timeline birth="2008-07-03"> の中に、年齢ごとの <life-age age="13"> を置き、
// その中に出来事の <life-event> を並べる。年齢が親、年月が子の形で表示する。
// 日付は <time slot="when">、本文はそのまま中に書く。JavaScript が動かなくても中身は読める

function sheet(css) {
	const s = new CSSStyleSheet();
	s.replaceSync(css);
	return s;
}

function pad(n) {
	return String(n).padStart(2, "0");
}

const ageSheet = sheet(`
:host {
	display: block;
	padding-bottom: 24px;
}

header {
	display: grid;
	grid-template-columns: 12px auto 1fr;
	align-items: center;
	gap: 14px;
}

.mark {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: var(--accent);
	box-shadow: 0 0 0 4px var(--accent-soft);
}

.age {
	margin: 0;
	font-family: var(--mono);
	font-size: 24px;
	font-weight: 800;
	line-height: 1.4;
}

.range {
	margin: 0;
	color: var(--sub);
	font-family: var(--mono);
	font-size: 12px;
}

/* 子の出来事を、左の縦線でつなぐ */
.children {
	margin: 6px 0 0 5px;
	padding-left: 19px;
	border-left: 2px solid var(--line);
}
`);

class LifeAge extends HTMLElement {
	static observedAttributes = ["age"];

	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [ageSheet];
		root.innerHTML = `
			<header>
				<span class="mark"></span>
				<p class="age"></p>
				<p class="range"></p>
			</header>
			<div class="children" role="list"><slot></slot></div>
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
		const age = Number(this.getAttribute("age"));
		root.querySelector(".age").textContent = `${age}歳`;

		// 誕生日から、その年齢だった期間を出す
		const birth = this.closest("life-timeline")?.getAttribute("birth");
		if (!birth) return;
		const [y, m] = birth.split("-").map(Number);
		root.querySelector(".range").textContent =
			`${y + age}.${pad(m)} 〜 ${y + age + 1}.${pad(m)}`;
	}
}

const eventSheet = sheet(`
:host {
	display: block;
	position: relative;
	padding-block: 10px;
}

/* 縦線から出来事へ伸びる枝 */
.branch {
	position: absolute;
	top: 22px;
	left: -19px;
	width: 13px;
	height: 2px;
	background: var(--line);
}

.when {
	margin: 0;
	color: var(--sub);
	font-family: var(--mono);
	font-size: 13px;
	font-variant-numeric: tabular-nums;
}
`);

class LifeEvent extends HTMLElement {
	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [eventSheet];
		root.innerHTML = `
			<span class="branch"></span>
			<p class="when"><slot name="when"></slot></p>
			<slot></slot>
		`;
	}

	connectedCallback() {
		if (!this.hasAttribute("role")) this.setAttribute("role", "listitem");
	}
}

class LifeTimeline extends HTMLElement {
	connectedCallback() {
		if (!this.hasAttribute("role")) this.setAttribute("role", "list");
	}
}

customElements.define("life-timeline", LifeTimeline);
customElements.define("life-age", LifeAge);
customElements.define("life-event", LifeEvent);
