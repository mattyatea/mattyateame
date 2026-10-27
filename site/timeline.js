// 年表のコンポーネント
// <life-timeline> の中に <life-event> を並べる。
// 日付は <time slot="when">、本文はそのまま中に書く。JavaScript が動かなくても中身は読める

function sheet(css) {
	const s = new CSSStyleSheet();
	s.replaceSync(css);
	return s;
}

const eventSheet = sheet(`
:host {
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: baseline;
	padding-block: 14px;
	border-top: 1px dashed var(--line);
}

:host(:first-of-type) {
	border-top: 0;
}

.age,
.when {
	margin: 0;
	font-family: var(--mono);
	font-size: 13px;
	font-variant-numeric: tabular-nums;
}

.age {
	color: var(--accent);
	font-weight: 700;
}

.age:not(:empty) {
	margin-right: 1em;
}

.when {
	color: var(--sub);
}

.body {
	grid-column: 1 / -1;
	margin-top: 2px;
}

@media (min-width: 640px) {
	:host {
		grid-template-columns: 4.5em 8.5em 1fr;
	}

	.body {
		grid-column: auto;
		margin-top: 0;
	}
}
`);

class LifeEvent extends HTMLElement {
	static observedAttributes = ["age"];

	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [eventSheet];
		root.innerHTML = `
			<p class="age"></p>
			<p class="when"><slot name="when"></slot></p>
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
		const age = this.getAttribute("age");
		this.shadowRoot.querySelector(".age").textContent = age ? `${age}歳` : "";
	}
}

class LifeTimeline extends HTMLElement {
	connectedCallback() {
		if (!this.hasAttribute("role")) this.setAttribute("role", "list");
	}
}

customElements.define("life-event", LifeEvent);
customElements.define("life-timeline", LifeTimeline);
