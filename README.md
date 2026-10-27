# mattyatea.me

まっちゃてぃー。のポートフォリオサイトです。
フレームワークもビルドも使わず、`site/` の HTML・CSS・JS をそのまま Cloudflare Workers の Static Assets で配信しています。

## ファイル

- `site/index.html`: ページの内容。プロフィールや経歴の文章はここを直接編集します。
- `site/styles.css`: 見た目。色やフォントは先頭の `:root` にまとめています。
- `site/main.js`: 年齢と年の自動計算と、年表の見せ方の切り替え。
- `site/timeline.js`: 年表の Web Components（`<life-timeline>` と `<life-event>`）。`variant="list"` は読み物の形、`variant="rail"` は図の形です。

## 開発

Node.js と pnpm のバージョンは `mise.toml` で固定しています。

```sh
pnpm install
pnpm dev
```

## 確認とデプロイ

```sh
pnpm lint
pnpm deploy
```
