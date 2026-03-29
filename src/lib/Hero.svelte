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
    {
      label: 'GitHub',
      href: 'https://github.com/mattyatea',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    },
    {
      label: 'mattyaski.co',
      href: 'https://mattyaski.co/@mattyatea',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    },
    {
      label: 'PrisMisskey',
      href: 'https://prismisskey.space/@mattyatea',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    },
    {
      label: 'Blog',
      href: 'https://nanasi-apps.xyz',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    },
  ];
</script>

<section class="relative flex flex-col items-center justify-center min-h-[92vh] text-center px-6 pt-12 pb-20 fade-in">
  <!-- Avatar -->
  <div class="relative mb-8">
    <div
      class="absolute inset-0 rounded-full scale-[1.5] blur-3xl pointer-events-none"
      style="background: radial-gradient(circle, rgba(var(--color-accent-1-rgb),0.32), rgba(var(--color-accent-2-rgb),0.18) 60%, transparent);"
    ></div>
    <img
      src={profile.avatarUrl}
      alt={profile.avatarAlt}
      class="relative z-10 w-32 h-32 rounded-full object-cover"
      style="box-shadow: 0 0 0 2px rgba(255,255,255,0.1), 0 0 50px rgba(var(--color-accent-1-rgb),0.22);"
    >
    <div
      class="absolute -bottom-1 -right-1 z-20 w-7 h-7 rounded-full border-2 border-[#060612] flex items-center justify-center"
      style="background: #10b981;"
      title="稼働中"
    >
      <span class="block w-2 h-2 rounded-full bg-white animate-pulse"></span>
    </div>
  </div>

  <!-- Name & title -->
  <div class="fade-in-up" style="animation-delay: 0.15s;">
    <p class="section-label mb-3">Portfolio</p>
    <h1 class="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
      <span class="glow-text">{profile.name}</span>
    </h1>
    <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-slate-400 text-[15px] mb-2">
      <span>エンジニア</span>
      <span class="text-slate-700">·</span>
      <span>{age}歳</span>
      <span class="text-slate-700">·</span>
      <span>Misskey-dev メンバー</span>
    </div>
    <p class="text-sm text-slate-500">TypeScript / Node.js / Linux / Fediverse / OSS</p>
  </div>

  <!-- Links -->
  <div class="flex flex-wrap justify-center gap-3 mt-8 fade-in-up" style="animation-delay: 0.3s;">
    {#each links as link}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-slate-300 hover:text-white transition-all duration-200"
        style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);"
        onmouseenter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(var(--color-accent-1-rgb),0.45)';
          (e.currentTarget as HTMLElement).style.background = 'rgba(var(--color-accent-1-rgb),0.08)';
        }}
        onmouseleave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)';
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
        }}
      >
        {@html link.svg}
        {link.label}
      </a>
    {/each}
  </div>

  <!-- Scroll hint -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-700 fade-in" style="animation-delay: 0.9s;">
    <span class="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-bounce">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  </div>
</section>
