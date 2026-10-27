# mattyatea.me

まっちゃてぃー。のポートフォリオサイトです。
フレームワークもビルドも使わず、`site/` の HTML・CSS・JS をそのまま Cloudflare Workers の Static Assets で配信しています。

## ファイル

- `site/index.html`: ページの内容。プロフィールや経歴の文章はここを直接編集します。
- `site/styles.css`: 見た目。色やフォントは先頭の `:root` にまとめています。
- `site/main.js`: 年齢と年の自動計算と、運営しているサーバーの数字の読み込み（NodeInfo）。
- `site/timeline.js`: 年表の Web Components（`<life-timeline>`、年齢の `<life-age>`、出来事の `<life-event>`）。
- `site/photos.js`: 写真の Web Components（押すと拡大する `<photo-zoom>` と、重ねてめくる `<photo-stack>`）。
- `site/photos/`: 区切りに使っている写真（自分で撮影）。

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
