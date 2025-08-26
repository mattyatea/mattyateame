import type { Stack, TimelineEntry, Profile } from '../types';

export const profile: Profile = {
  name: 'まっちゃてぃー。',
  birthDate: '2008/07/03',
  avatarUrl: 'https://mattyaski.co/avatar/@mattyatea',
  avatarAlt: 'まっちゃてぃー。のアイコン アニメ調の女の子の画像'
};

export const stacks: Stack[] = [
  { name: 'HTML', star: 4 },
  { name: 'Javascript', star: 4 },
  { name: 'Vue.js', star: 4 },
  { name: 'Nuxt.js', star: 4 },
  { name: 'Svelte', star: 1 },
  { name: 'SvelteKit', star: 1 },
  { name: 'Node.js', star: 5 },
  { name: 'PHP', star: 1 },
  { name: 'PostgreSQL', star: 3 },
  { name: 'Redis', star: 3 },
  { name: 'Linux', star: 5 },
  { name: 'Kubernetes', star: 1 },
  { name: 'Cloudflare', star: 3 }
];

export const timelineEntries: TimelineEntry[] = [
  {
    title: 'nanasi-apps.xyz',
    date: '2021/11/06 ~ 現在',
    description: '<p class="text-base text-gray-800 dark:text-gray-200">私自身が知見を得たことを発信していくためのブログです。</p>'
  },
  {
    title: 'mkey.nanasi-apps.xyz',
    date: '2022/05/06 ~ 2022/07/24',
    description: `
      <p class="text-base text-gray-800 dark:text-gray-200">
        サーバーに興味があったので、当時自分の中で流行っていた Misskey のサーバーを立てました。
        <br>
        この経験で、S3互換ファイルサーバーや、Linuxへの理解など、ここには書ききれないほどの知見を得ることができました。
      </p>`
  },
  {
    title: 'mattyaski.co',
    date: '2022/12/24 ~ 現在'
  },
  {
    title: 'PrisMisskey.space',
    date: '2023/09/24 ~ 現在'
  },
  {
    title: 'Misskey-dev Member',
    date: '2023/10/19 ~ 現在'
  },
  {
    title: 'S高等学校 - 入学',
    date: '2024/04/01 ~ 現在'
  },
  {
    title: '株式会社9ineverse - 執行役員',
    date: '2024/08/01 ~ 2025/08/01'
  },
  {
    title: '株式会社****** - アルバイト',
    date: '2025/01/05 ~ 現在',
    description: `
      <p class="text-base text-gray-800 dark:text-gray-200">
        Vue.jsや、Java、Next.js等を用いた開発を行っています。
      </p>`
  }
];