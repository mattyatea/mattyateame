<script lang="ts">
  import type { TimelineEntry } from '../types';
  import TimelineItem from './TimelineItem.svelte';

  export let entries: TimelineEntry[];

  const sorted = [...entries].reverse();
</script>

<section>
  <p class="section-label mb-4">Timeline</p>
  <div class="card p-8">
    <h2 class="text-2xl font-bold mb-8">経歴</h2>

    <ol class="relative border-l" style="border-color: rgba(255,255,255,0.07); margin-left: 4px;">
      {#each sorted as entry}
        <TimelineItem
          title={entry.title}
          date={entry.date}
          description={entry.description || ''}
          type={entry.type || 'personal'}
        />
      {/each}
    </ol>
  </div>
</section>
