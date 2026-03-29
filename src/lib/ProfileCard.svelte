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

  const links = [
    { label: 'GitHub', href: 'https://github.com/mattyatea', icon: 'github' },
    { label: 'Misskey', href: 'https://mattyaski.co/@mattyatea', icon: 'fediverse' },
  ];
</script>

<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
  <div class="relative">
    <div class="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 blur-md opacity-60 scale-110"></div>
    <img
      alt={profile.avatarAlt}
      src={profile.avatarUrl}
      class="relative w-28 h-28 rounded-full object-cover ring-2 ring-white/20"
    >
  </div>

  <div>
    <h1 class="text-2xl font-bold tracking-tight">{profile.name}</h1>
    <p class="text-sm text-gray-400 mt-1">エンジニア · {age}歳</p>
  </div>

  <p class="text-sm text-gray-300 leading-relaxed">
    Web開発・インフラ・OSSコントリビューターとして活動中。<br>
    Misskey-dev メンバー。
  </p>

  <div class="w-full border-t border-white/10 pt-4 flex flex-col gap-2">
    {#each links as link}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg py-2 px-4 transition-colors"
      >
        {link.label}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 opacity-60" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
        </svg>
      </a>
    {/each}
  </div>

  <div class="w-full text-left text-sm text-gray-400 space-y-1">
    <div class="flex justify-between">
      <span>生年月日</span>
      <span class="text-gray-200">{profile.birthDate}</span>
    </div>
  </div>
</div>
