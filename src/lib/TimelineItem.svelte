<script lang="ts">
  export let title: string;
  export let date: string;
  export let description: string = "";
  export let type: 'work' | 'oss' | 'edu' | 'personal' = 'personal';

  const isActive = date.includes('現在');

  const typeColors: Record<string, string> = {
    work: '#06b6d4',
    oss: '#f43f5e',
    edu: '#84cc16',
    personal: '#a855f7',
  };

  const color = typeColors[type];
</script>

<li class="relative pl-8 pb-8 last:pb-0">
  <!-- Dot -->
  <div
    class="absolute left-0 top-[7px] w-2.5 h-2.5 rounded-full -translate-x-[5px]"
    style="background: {color}; box-shadow: 0 0 8px {color}80;"
  ></div>

  <div>
    <div class="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5">
      <h3 class="font-semibold text-slate-100 text-[15px] leading-snug">{title}</h3>
      {#if isActive}
        <span
          class="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full"
          style="background: rgba(52,211,153,0.12); color: #34d399; border: 1px solid rgba(52,211,153,0.25);"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse block"></span>
          NOW
        </span>
      {/if}
    </div>
    <time class="block text-xs text-slate-500 font-mono mb-2">{date}</time>
    {#if description}
      <div class="text-sm text-slate-400 leading-relaxed">
        {@html description}
      </div>
    {/if}
  </div>
</li>
