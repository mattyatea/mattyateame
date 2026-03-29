<script lang="ts">
  import type { Profile } from '../types';

  export let profile: Profile;

  function calcAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  const age = calcAge(profile.birthDate);

  const stats = [
    { label: '年齢', value: `${age}歳` },
    { label: '実務経験', value: '1年+' },
    { label: 'OSSプロジェクト', value: 'Misskey-dev' },
    { label: '運営サーバー数', value: '6+' },
  ];

  const badges = [
    { label: 'Misskey-dev メンバー', color: 'var(--color-accent-2)' },
    { label: 'Misskey.io 開発者', color: 'var(--color-accent-1)' },
    { label: 'S高等学校 在学中', color: '#34d399' },
    { label: 'Fediverse', color: '#f59e0b' },
  ];
</script>

<section>
  <p class="section-label mb-4">About</p>
  <div class="card p-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">こんにちは！</h2>
        <p class="text-slate-400 leading-relaxed text-[15px]">
          小学生の頃からプログラミングを始め、Raspberry Pi 1台での自宅サーバー運用から Fediverse コミュニティの立ち上げ、OSSへのコントリビューションまで幅広く活動しています。
        </p>
        <p class="text-slate-400 leading-relaxed text-[15px]">
          Misskey の独自フォーク「Type4ny」を開発し、複数のサーバーを運営。現在は Misskey-dev・Misskey.io の開発メンバーとして OSS 開発に携わっています。
        </p>
        <p class="text-slate-400 leading-relaxed text-[15px]">
          S高等学校に在学中。得意な技術は Node.js・Linux・TypeScript です。
        </p>

        <div class="flex flex-wrap gap-2 pt-1">
          {#each badges as badge}
            <span
              class="text-xs font-medium px-3 py-1 rounded-full"
              style="color: {badge.color}; background: {badge.color}18; border: 1px solid {badge.color}35;"
            >
              {badge.label}
            </span>
          {/each}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        {#each stats as stat}
          <div class="rounded-xl p-4" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);">
            <p class="text-xs text-slate-500 mb-1 font-medium">{stat.label}</p>
            <p class="text-base font-semibold text-slate-200">{stat.value}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
