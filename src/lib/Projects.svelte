<script lang="ts">
  import type { Project } from '../types';

  export let projects: Project[];
</script>

<section>
  <p class="section-label mb-4">Projects</p>
  <div>
    <h2 class="text-2xl font-bold mb-6">プロジェクト</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each projects as project}
        <div
          class="card p-6 flex flex-col gap-3"
          style={project.status === 'ended' ? 'opacity: 0.65;' : ''}
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              {#if project.status === 'active'}
                <span class="relative flex h-2 w-2 mt-1 shrink-0">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style="background: #34d399;"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2" style="background: #34d399;"></span>
                </span>
              {:else}
                <span class="w-2 h-2 mt-1 shrink-0 rounded-full bg-slate-600"></span>
              {/if}
              <h3 class="font-semibold text-slate-100 text-[15px] leading-snug truncate">{project.name}</h3>
              {#if project.status === 'ended'}
                <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0" style="background: rgba(148,163,184,0.12); color: #64748b; border: 1px solid rgba(148,163,184,0.2);">
                  Archived
                </span>
              {/if}
            </div>
            {#if project.url}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class="shrink-0 text-slate-600 hover:text-violet-400 transition-colors"
                aria-label="リンクを開く"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            {/if}
          </div>

          <p class="text-sm text-slate-400 leading-relaxed flex-1">{project.description}</p>

          <div class="flex flex-wrap gap-1.5 pt-1">
            {#each project.tags as tag}
                <span
                  class="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style="background: rgba(var(--color-accent-1-rgb),0.08); color: var(--color-accent-1-soft); border: 1px solid rgba(var(--color-accent-1-rgb),0.18);"
                >
                {tag}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
