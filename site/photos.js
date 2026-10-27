// 写真のコンポーネント
// <photo-zoom> は中の <img> を押すと拡大して見せる。
// <photo-stack> は中の <img> を重ねて置き、押すと次の1枚をいちばん上に出す

// 拡大の画面はページに1つだけ作って使い回す
let viewer;

function openViewer(img, caption) {
	if (!viewer) {
		viewer = document.createElement("dialog");
		viewer.className = "viewer";
		viewer.innerHTML = `
			<img alt="" />
			<p></p>
			<button type="button" class="viewer-close" aria-label="閉じる">×</button>
		`;
		// 画面のどこを押しても閉じる
		viewer.addEventListener("click", () => viewer.close());
		document.body.append(viewer);
	}
	const big = viewer.querySelector("img");
	big.src = img.currentSrc || img.src;
	big.alt = img.alt;
	viewer.querySelector("p").textContent = caption ?? "";
	viewer.showModal();
}

function sheet(css) {
	const s = new CSSStyleSheet();
	s.replaceSync(css);
	return s;
}

const zoomSheet = sheet(`
:host {
	display: block;
	cursor: zoom-in;
}

:host(:focus-visible) {
	outline: 2px solid var(--accent);
	outline-offset: 4px;
	border-radius: 12px;
}
`);

class PhotoZoom extends HTMLElement {
	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [zoomSheet];
		root.innerHTML = "<slot></slot>";
	}

	connectedCallback() {
		this.tabIndex = 0;
		this.setAttribute("role", "button");
		this.setAttribute("aria-label", "写真を拡大する");
		this.addEventListener("click", () => this.open());
		this.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				this.open();
			}
		});
	}

	open() {
		const img = this.querySelector("img");
		if (!img) return;
		const caption = this.closest("figure")?.querySelector("figcaption");
		openViewer(img, caption?.textContent);
	}
}

const stackSheet = sheet(`
:host {
	display: block;
}

.stack {
	position: relative;
	aspect-ratio: 20 / 9;
	margin: 24px 16px 0;
	cursor: pointer;
}

::slotted(img) {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border: 6px solid var(--surface);
	border-radius: 10px;
	object-fit: cover;
	box-shadow: 0 8px 24px rgb(0 0 0 / 0.18);
	transform: translate(var(--x, 0), var(--y, 0)) rotate(var(--r, 0deg));
	transition:
		transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
		opacity 0.3s;
}

/* いちばん上の1枚を横へ飛ばしてから、いちばん下に戻す */
::slotted(img.is-leaving) {
	transform: translate(70%, -8%) rotate(14deg);
	opacity: 0;
}

.bar {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 44px;
	font-size: 13px;
}

.caption {
	flex: 1;
	margin: 0;
	color: var(--sub);
}

.count {
	color: var(--sub);
	font-family: var(--mono);
	font-variant-numeric: tabular-nums;
}

button {
	padding: 2px 12px;
	border: 1px solid var(--line);
	border-radius: 8px;
	background: var(--surface);
	color: var(--fg);
	font: inherit;
	cursor: pointer;
}

button:hover {
	border-color: var(--accent);
	color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
	::slotted(img) {
		transition: none;
	}
}
`);

// 重ねた写真の傾きとずれ。手で置いたように少しずつ変える
const TILTS = [
	[-2, 0, 0],
	[3, 10, 6],
	[-4, -12, 10],
	[5, 14, -4],
	[-6, -6, 14],
];

class PhotoStack extends HTMLElement {
	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [stackSheet];
		root.innerHTML = `
			<div class="stack"><slot></slot></div>
			<div class="bar">
				<p class="caption" aria-live="polite"></p>
				<span class="count"></span>
				<button type="button" class="next">次へ</button>
				<button type="button" class="zoom">拡大</button>
			</div>
		`;
		root.querySelector(".stack").addEventListener("click", () => this.next());
		root.querySelector(".next").addEventListener("click", () => this.next());
		root
			.querySelector(".zoom")
			.addEventListener("click", () =>
				openViewer(this.photos[0], this.photos[0].dataset.caption),
			);
	}

	connectedCallback() {
		this.photos = [...this.querySelectorAll(":scope > img")];
		this.turned = 0;
		this.layout();
	}

	layout() {
		const total = this.photos.length;
		this.photos.forEach((img, i) => {
			const [r, x, y] = TILTS[i % TILTS.length];
			img.style.zIndex = String(total - i);
			img.style.setProperty("--r", `${r}deg`);
			img.style.setProperty("--x", `${x}px`);
			img.style.setProperty("--y", `${y}px`);
			// 下の写真は飾りなので、読み上げでは上の1枚だけにする
			img.toggleAttribute("aria-hidden", i !== 0);
			// 重ねて見えるので、遅延読み込みをやめて先に読む
			img.loading = "eager";
		});
		const top = this.photos[0];
		const root = this.shadowRoot;
		root.querySelector(".caption").textContent = top?.dataset.caption ?? "";
		root.querySelector(".count").textContent =
			`${(this.turned % total) + 1} / ${total}`;
	}

	next() {
		const top = this.photos[0];
		if (!top || top.classList.contains("is-leaving")) return;
		top.classList.add("is-leaving");
		setTimeout(() => {
			this.photos.push(this.photos.shift());
			this.turned++;
			top.classList.remove("is-leaving");
			this.layout();
		}, 350);
	}
}

customElements.define("photo-zoom", PhotoZoom);
customElements.define("photo-stack", PhotoStack);
