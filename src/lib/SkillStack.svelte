<script lang="ts">
  import type { Stack } from '../types';

  export let stacks: Stack[];

  const levelLabels: Record<number, string> = {
    5: 'Expert',
    4: 'Advanced',
    3: 'Intermediate',
    2: 'Basic',
    1: 'Learning',
  };

  // グループ化
  const grouped = [5, 4, 3, 2, 1].map(level => ({
    level,
    label: levelLabels[level],
    items: stacks.filter(s => s.star === level),
  })).filter(g => g.items.length > 0);
</script>

<section>
  <p class="section-label mb-4">Skills</p>
  <div class="card p-8 space-y-6">
    <h2 class="text-2xl font-bold">技術スタック</h2>

    <div class="space-y-5">
      {#each grouped as group}
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-semibold tracking-wide text-slate-500 uppercase">{group.label}</span>
            <div class="flex-1 h-px" style="background: rgba(255,255,255,0.06);"></div>
          </div>
          <div class="flex flex-wrap gap-2">
            {#each group.items as stack}
              <span class="skill-tag" data-level={group.level}>
                {stack.name}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
