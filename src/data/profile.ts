import type { Stack, TimelineEntry, Profile, Project } from '../types';

export const profile: Profile = {
  name: 'まっちゃてぃー。',
  birthDate: '2008/07/03',
  avatarUrl: 'https://mattyaski.co/avatar/@mattyatea',
  avatarAlt: 'まっちゃてぃー。のアイコン アニメ調の女の子の画像'
};

export const stacks: Stack[] = [
  // Expert (5)
  { name: 'Node.js', star: 5 },
  { name: 'Linux', star: 5 },
  // Advanced (4)
  { name: 'TypeScript', star: 4 },
  { name: 'JavaScript', star: 4 },
  { name: 'Vue.js', star: 4 },
  { name: 'Nuxt.js', star: 4 },
  { name: 'HTML/CSS', star: 4 },
  { name: 'Git', star: 4 },
  // Intermediate (3)
  { name: 'Java', star: 3 },
  { name: 'PostgreSQL', star: 3 },
  { name: 'Redis', star: 3 },
  { name: 'Nginx', star: 3 },
  { name: 'Cloudflare Workers', star: 3 },
  { name: 'Hono', star: 3 },
  { name: 'NestJS', star: 3 },
  { name: 'React / Remix', star: 3 },
  // Basic (2)
  { name: 'Docker', star: 2 },
  { name: 'Azure', star: 2 },
  { name: 'AlloyDB', star: 2 },
  { name: 'Cloudflare D1/R2/KV', star: 2 },
  // Learning (1)
  { name: 'Kubernetes', star: 1 },
  { name: 'Svelte', star: 1 },
  { name: 'PHP', star: 1 },
];

export const projects: Project[] = [
  {
    name: 'Type4ny',
    description: '自作の Misskey フォーク。ゲーミングモードなど独自機能を実装し、Misskey-host.cloud の全サーバーで採用。現在はアーカイブ済み。',
    tags: ['TypeScript', 'Vue.js', 'Misskey', 'OSS'],
    url: 'https://github.com/Type4ny-Project/Type4ny',
    status: 'ended',
  },
  {
    name: 'PrisMisskey.space',
    description: '自作フォーク Type4ny を基盤とした Fediverse SNS サーバー。フォロワー652名・投稿9,100件超。「Misskeyの最先端がここにある」をキャッチコピーに運営中。',
    tags: ['Type4ny', 'Misskey', 'Fediverse', 'インフラ'],
    url: 'https://prismisskey.space',
    status: 'active',
  },
  {
    name: 'mattyaski.co',
    description: '自身が立ち上げた Misskey インスタンス「まっちゃすきー。」。DBの破損・ファイルサーバー消失などのインシデントを乗り越え、PostgreSQL チューニング・Nginx 設定の知見を積んだ。',
    tags: ['Misskey', 'PostgreSQL', 'Linux', 'Nginx'],
    url: 'https://mattyaski.co',
    status: 'active',
  },
  {
    name: 'ActivityPub-Relay',
    description: 'Hono + Cloudflare Workers 製の ActivityPub リレーサーバー。HTTP 署名認証・WebFinger/NodeInfo 対応・管理ダッシュボード付き。Vue 3 + Cloudflare D1 構成のモノレポ。',
    tags: ['TypeScript', 'Hono', 'Cloudflare Workers', 'ActivityPub', 'Vue 3'],
    url: 'https://github.com/mattyatea/ActivityPub-Relay',
    status: 'active',
  },
  {
    name: 'Misskey-host.cloud',
    description: 'Misskey サーバーの構築・更新・保守を代行するホスティングサービス。毎時バックアップ・xxxx.misskey.one 形式の URL を提供。複数インスタンスを運用中。',
    tags: ['Misskey', 'ホスティング', 'Linux', 'インフラ'],
    url: 'https://misskey-host.cloud',
    status: 'active',
  },
  {
    name: 'Raspberry Pi サーバー運用',
    description: 'Raspberry Pi 4B 1台から開始した自宅サーバー。Misskey を立て同時接続60人を突破。WordPress・Cloudflare Tunnel・照明 IoT（シェルスクリプト + PHP）なども展開。',
    tags: ['Raspberry Pi', 'Linux', 'Cloudflare', 'PHP', 'Shell'],
    status: 'active',
  },
];

export const timelineEntries: TimelineEntry[] = [
  {
    title: 'プログラミング開始',
    date: '小学生の頃',
    description: 'コーディングに興味を持ち、PHP などで Web アプリケーションの開発を開始。',
    type: 'personal',
  },
  {
    title: '自宅サーバー運用開始 / nanasi-apps.xyz',
    date: '2021年11月 〜 現在',
    description: 'Raspberry Pi 4B 1台から自宅サーバー運用をスタート。WordPress 公開・Cloudflare Tunnel・照明 IoT など多数のプロジェクトを展開。Misskey サーバーを立て同時接続60人を達成。同時に技術ブログ nanasi-apps.xyz も開設。',
    type: 'personal',
  },
  {
    title: 'mattyaski.co — SNS サーバー開設',
    date: '2022年12月 〜 現在',
    description: '「まっちゃすきー。」として Misskey インスタンスを開設・運用。DB 破損・ファイルサーバー消失などのインシデントを乗り越え、インフラ運用の知見を深める。',
    type: 'oss',
  },
  {
    title: 'PrisMisskey.space 開設 / Type4ny 開発開始',
    date: '2023年9月 〜 現在',
    description: '自作 Misskey フォーク「Type4ny」を開発し、PrisMisskey.space として運営開始。ゲーミングモードなど独自機能を実装。Misskey-host.cloud の全サーバーに採用。',
    type: 'oss',
  },
  {
    title: 'Misskey-dev — コントリビューター参加',
    date: '2023年10月 〜 現在',
    description: 'OSSの SNS ソフトウェア Misskey の開発に正式参加。PWA ブランクページ問題（Issue #16951）の修正 PR がマージされるなど、継続的に貢献中。',
    type: 'oss',
  },
  {
    title: 'Misskey.io — 開発者',
    date: '2023年頃 〜 現在',
    description: 'Misskey.io の開発に参加し、機能改善や不具合修正を継続的に担当。',
    type: 'oss',
  },
  {
    title: 'S高等学校 — 入学',
    date: '2024年4月 〜 現在（2027年3月卒業予定）',
    type: 'edu',
  },
  {
    title: '株式会社9ineverse — Fedi-host 事業部（業務委託）',
    date: '2024年7月 〜 2025年8月',
    description: 'Fediverse（分散型 SNS）関連サービスのホスティング事業部にて、Web アプリケーション開発や決済などのサービス開発、Azure・Kubernetes を活用したサーバーインフラの構築・運用を担当。',
    type: 'work',
  },
  {
    title: 'IT系企業 — エンジニア（アルバイト）',
    date: '2025年1月 〜 現在',
    description: 'フロントエンド・バックエンドエンジニアとして従事。Vue.js・Java・Next.js 等を用いた開発を行っている。',
    type: 'work',
  },
];
