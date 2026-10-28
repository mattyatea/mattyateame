// 写真のコンポーネント
// <photo-stack> は中の <img> を重ねて置き、押すと <photo-viewer> で大きく表示する。
// <photo-viewer> は押した写真の位置から広がって開き、中で拡大と移動ができる。
// 上下にスワイプするか、写真の外を押すか、Esc で閉じる

function sheet(css) {
	const s = new CSSStyleSheet();
	s.replaceSync(css);
	return s;
}

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const MAX_SCALE = 4;

// from の矩形に重なるように、to の矩形を動かす transform を作る
function rectTransform(from, to) {
	const dx = from.left + from.width / 2 - (to.left + to.width / 2);
	const dy = from.top + from.height / 2 - (to.top + to.height / 2);
	return `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

const viewerSheet = sheet(`
dialog {
	width: 100vw;
	max-width: none;
	height: 100dvh;
	max-height: none;
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	overflow: hidden;
}

dialog::backdrop {
	background: transparent;
}

.scrim {
	position: absolute;
	inset: 0;
	background: rgb(10 10 9 / 0.9);
}

.stage {
	position: absolute;
	inset: 0;
	display: grid;
	place-items: center;
	padding: 56px 12px;
	touch-action: none;
	user-select: none;
}

.photo {
	max-width: 100%;
	max-height: 100%;
	border-radius: 8px;
	transform-origin: center;
	cursor: zoom-in;
	will-change: transform;
}

.photo.is-zoomed {
	cursor: grab;
}

.caption {
	position: absolute;
	right: 16px;
	bottom: 16px;
	left: 16px;
	margin: 0;
	color: #e9e6dc;
	font-family: var(--mono, monospace);
	font-size: 12px;
	text-align: center;
	pointer-events: none;
}

.close {
	position: absolute;
	top: 10px;
	right: 12px;
	width: 40px;
	height: 40px;
	border: 0;
	border-radius: 50%;
	background: rgb(255 255 255 / 0.12);
	color: #fff;
	font-size: 22px;
	line-height: 1;
	cursor: pointer;
	transition: background-color 0.2s;
}

.close:hover {
	background: rgb(255 255 255 / 0.22);
}
`);

class PhotoViewer extends HTMLElement {
	constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [viewerSheet];
		root.innerHTML = `
			<dialog aria-label="写真の拡大表示">
				<div class="scrim"></div>
				<div class="stage">
					<img class="photo" alt="" draggable="false" />
				</div>
				<p class="caption"></p>
				<button type="button" class="close" aria-label="閉じる">×</button>
			</dialog>
		`;
		this.dialog = root.querySelector("dialog");
		this.scrim = root.querySelector(".scrim");
		this.stage = root.querySelector(".stage");
		this.photo = root.querySelector(".photo");
		this.caption = root.querySelector(".caption");

		this.pointers = new Map();
		this.reset();

		root.querySelector(".close").addEventListener("click", () => this.close());
		// Esc でもアニメーションしてから閉じる
		this.dialog.addEventListener("cancel", (e) => {
			e.preventDefault();
			this.close();
		});

		this.stage.addEventListener("pointerdown", (e) => this.onDown(e));
		this.stage.addEventListener("pointermove", (e) => this.onMove(e));
		this.stage.addEventListener("pointerup", (e) => this.onUp(e));
		this.stage.addEventListener("pointercancel", (e) => this.onUp(e));
		this.stage.addEventListener("wheel", (e) => this.onWheel(e), {
			passive: false,
		});
		this.photo.addEventListener("dblclick", (e) => this.toggleZoom(e));
	}

	reset() {
		this.scale = 1;
		this.x = 0;
		this.y = 0;
		this.pointers.clear();
		this.gesture = null;
		this.photo.style.transform = "";
		this.photo.classList.remove("is-zoomed");
		this.scrim.style.opacity = "";
	}

	apply() {
		this.photo.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
		this.photo.classList.toggle("is-zoomed", this.scale > 1);
	}

	async open(source, caption) {
		this.source = source;
		this.reset();
		this.photo.src = source.currentSrc || source.src;
		this.photo.alt = source.alt;
		this.caption.textContent = caption ?? "";
		await this.photo.decode().catch(() => {});
		this.dialog.showModal();
		if (reduceMotion.matches) return;

		// 押した写真の位置から、いまの位置まで広げる
		const from = source.getBoundingClientRect();
		const to = this.photo.getBoundingClientRect();
		const options = { duration: 380, easing: EASE };
		this.photo.animate(
			[{ transform: rectTransform(from, to), borderRadius: "10px" }, {}],
			options,
		);
		this.scrim.animate([{ opacity: 0 }, { opacity: 1 }], options);
	}

	// direction を渡すとその向きへ飛ばして閉じ、渡さなければ元の写真の位置へ戻して閉じる
	async close(direction) {
		if (!this.dialog.open || this.closing) return;
		this.closing = true;
		if (!reduceMotion.matches) {
			const options = { duration: 300, easing: EASE, fill: "forwards" };
			const now = getComputedStyle(this.photo).transform;
			const from = now === "none" ? "none" : now;
			let end;
			if (direction) {
				end = `translate(${this.x}px, ${direction * window.innerHeight}px) scale(${this.scale})`;
			} else {
				this.photo.style.transform = "";
				end = rectTransform(
					this.source.getBoundingClientRect(),
					this.photo.getBoundingClientRect(),
				);
			}
			const scrimFrom = getComputedStyle(this.scrim).opacity;
			await Promise.all([
				this.photo.animate([{ transform: from }, { transform: end }], options)
					.finished,
				this.scrim.animate([{ opacity: scrimFrom }, { opacity: 0 }], options)
					.finished,
			]);
		}
		this.dialog.close();
		this.closedAt = performance.now();
		for (const a of this.photo.getAnimations()) a.cancel();
		for (const a of this.scrim.getAnimations()) a.cancel();
		this.reset();
		this.closing = false;
	}

	onDown(e) {
		this.stage.setPointerCapture(e.pointerId);
		this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		this.moved = false;
		if (this.pointers.size === 2) {
			const [a, b] = [...this.pointers.values()];
			this.gesture = {
				type: "pinch",
				dist: Math.hypot(a.x - b.x, a.y - b.y),
				scale: this.scale,
			};
		} else if (this.pointers.size === 1) {
			this.gesture = {
				// 拡大していれば写真を動かし、していなければ閉じるためのスワイプとして扱う
				type: this.scale > 1 ? "pan" : "swipe",
				startX: e.clientX,
				startY: e.clientY,
				x: this.x,
				y: this.y,
			};
		}
	}

	onMove(e) {
		if (!this.pointers.has(e.pointerId) || !this.gesture) return;
		this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		const g = this.gesture;

		if (g.type === "pinch" && this.pointers.size === 2) {
			const [a, b] = [...this.pointers.values()];
			const dist = Math.hypot(a.x - b.x, a.y - b.y);
			this.scale = Math.min(MAX_SCALE, Math.max(1, (g.scale * dist) / g.dist));
			if (this.scale === 1) {
				this.x = 0;
				this.y = 0;
			}
			this.moved = true;
			this.apply();
			return;
		}

		const dx = e.clientX - g.startX;
		const dy = e.clientY - g.startY;
		if (Math.hypot(dx, dy) > 6) this.moved = true;

		if (g.type === "pan") {
			this.x = g.x + dx;
			this.y = g.y + dy;
			this.apply();
		} else if (g.type === "swipe") {
			this.y = dy;
			this.apply();
			this.scrim.style.opacity = String(
				Math.max(0.2, 1 - Math.abs(dy) / window.innerHeight),
			);
		}
	}

	onUp(e) {
		const wasTap = !this.moved;
		this.pointers.delete(e.pointerId);
		const g = this.gesture;
		if (this.pointers.size > 0) {
			// ピンチの途中で1本離したら、残りの指で動かせるようにする
			const [p] = [...this.pointers.values()];
			this.gesture = {
				type: this.scale > 1 ? "pan" : "swipe",
				startX: p.x,
				startY: p.y,
				x: this.x,
				y: this.y,
			};
			return;
		}
		this.gesture = null;

		if (g?.type === "swipe" && this.moved) {
			// 上へは短めのスワイプでも閉じる
			if (this.y < -80 || this.y > 140) {
				this.close(Math.sign(this.y));
				return;
			}
			this.y = 0;
			this.photo.animate(
				[{ transform: this.photo.style.transform }, { transform: "none" }],
				{ duration: 220, easing: EASE },
			);
			this.scrim.style.opacity = "";
			this.apply();
			return;
		}

		// 写真の外を押したら閉じる
		if (wasTap && e.target !== this.photo) this.close();
	}

	onWheel(e) {
		e.preventDefault();
		const next = this.scale * Math.exp(-e.deltaY * 0.01);
		this.zoomAt(Math.min(MAX_SCALE, Math.max(1, next)), e.clientX, e.clientY);
	}

	toggleZoom(e) {
		this.zoomAt(this.scale > 1 ? 1 : 2.5, e.clientX, e.clientY);
	}

	// 画面の (cx, cy) の位置を動かさずに拡大率を変える
	zoomAt(scale, cx, cy) {
		const rect = this.stage.getBoundingClientRect();
		const ox = cx - (rect.left + rect.width / 2);
		const oy = cy - (rect.top + rect.height / 2);
		const ratio = scale / this.scale;
		this.x = ox - (ox - this.x) * ratio;
		this.y = oy - (oy - this.y) * ratio;
		this.scale = scale;
		if (scale === 1) {
			this.x = 0;
			this.y = 0;
		}
		this.apply();
	}
}

function viewer() {
	let el = document.querySelector("photo-viewer");
	if (!el) {
		el = document.createElement("photo-viewer");
		document.body.append(el);
	}
	return el;
}

const stackSheet = sheet(`
:host {
	display: block;
}

.stack {
	position: relative;
	aspect-ratio: 20 / 9;
	margin: 24px 16px 0;
	cursor: grab;
	touch-action: none;
	user-select: none;
}

.stack:active {
	cursor: grabbing;
}

::slotted(img) {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border: 6px solid #fff;
	border-radius: 10px;
	object-fit: cover;
	box-shadow: 0 8px 24px rgb(0 0 0 / 0.18);
	transform: translate(var(--x, 0), var(--y, 0)) rotate(var(--r, 0deg));
	transition:
		transform 0.4s ${EASE},
		opacity 0.35s;
	-webkit-user-drag: none;
}

/* 指やマウスに付いて動かしている間と、いちばん下へ戻す瞬間はアニメーションしない */
::slotted(img.is-dragging) {
	transition: none;
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

.stack:focus-visible {
	outline: 2px solid var(--accent);
	outline-offset: 8px;
	border-radius: 12px;
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
			<div class="stack" role="button" tabindex="0" aria-label="いちばん上の写真を大きく表示する。左右の矢印キーで次の写真"><slot></slot></div>
			<div class="bar">
				<p class="caption" aria-live="polite"></p>
				<span class="count"></span>
			</div>
		`;
		const stack = root.querySelector(".stack");
		stack.addEventListener("pointerdown", (e) => this.onDown(e));
		stack.addEventListener("pointermove", (e) => this.onMove(e));
		stack.addEventListener("pointerup", (e) => this.onUp(e));
		stack.addEventListener("pointercancel", (e) => this.onUp(e));
		stack.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				this.open();
			} else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
				e.preventDefault();
				this.next(e.key === "ArrowRight" ? 1 : -1, 0);
			}
		});
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
			img.draggable = false;
		});
		const top = this.photos[0];
		const root = this.shadowRoot;
		root.querySelector(".caption").textContent = top?.dataset.caption ?? "";
		root.querySelector(".count").textContent =
			`${(this.turned % total) + 1} / ${total}`;
	}

	open() {
		const top = this.photos[0];
		const v = viewer();
		// 拡大表示を閉じた直後のクリックは無視する
		if (!top || performance.now() - (v.closedAt ?? 0) < 400) return;
		v.open(top, top.dataset.caption);
	}

	onDown(e) {
		if (e.button !== 0 || this.leaving) return;
		const top = this.photos[0];
		e.currentTarget.setPointerCapture(e.pointerId);
		this.drag = {
			x: e.clientX,
			y: e.clientY,
			t: performance.now(),
			moved: false,
		};
		top.classList.add("is-dragging");
	}

	onMove(e) {
		const d = this.drag;
		if (!d) return;
		const dx = e.clientX - d.x;
		const dy = e.clientY - d.y;
		if (Math.hypot(dx, dy) > 6) d.moved = true;
		this.photos[0].style.transform = `translate(calc(var(--x) + ${dx}px), calc(var(--y) + ${dy}px)) rotate(calc(var(--r) + ${dx * 0.05}deg))`;
	}

	onUp(e) {
		const d = this.drag;
		if (!d) return;
		this.drag = null;
		const top = this.photos[0];
		top.classList.remove("is-dragging");
		const dx = e.clientX - d.x;
		const dy = e.clientY - d.y;
		const dist = Math.hypot(dx, dy);
		const speed = dist / Math.max(1, performance.now() - d.t);

		if (!d.moved) {
			top.style.transform = "";
			this.open();
		} else if (dist > 80 || speed > 0.5) {
			// シュッと払ったら、その向きへ飛ばして次の1枚にする
			this.next(dx, dy);
		} else {
			top.style.transform = "";
		}
	}

	next(dx, dy) {
		const top = this.photos[0];
		if (!top || this.leaving) return;
		this.leaving = true;
		const len = Math.hypot(dx, dy) || 1;
		// 飛ばす距離は写真の大きさに合わせる。画面の幅で飛ばすと、下へ払ったときにページが縦に伸びる
		const { width, height } = top.getBoundingClientRect();
		top.style.transform = `translate(${(dx / len) * width * 1.2}px, ${(dy / len) * height * 1.5}px) rotate(${(dx / len) * 30}deg)`;
		top.style.opacity = "0";
		setTimeout(() => {
			// いちばん下へ移すときは、飛んでいった位置から戻ってこないように一度アニメーションを止める
			top.classList.add("is-dragging");
			top.style.transform = "";
			this.photos.push(this.photos.shift());
			this.turned++;
			this.layout();
			top.getBoundingClientRect();
			top.classList.remove("is-dragging");
			top.style.opacity = "";
			this.leaving = false;
		}, 380);
	}
}

customElements.define("photo-viewer", PhotoViewer);
customElements.define("photo-stack", PhotoStack);
