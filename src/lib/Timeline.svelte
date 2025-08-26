<script lang="ts">
  import type { TimelineEntry } from '../types';
  import TimelineItem from './TimelineItem.svelte';

  export let entries: TimelineEntry[];
</script>

<div class="flex flex-col w-full bg-gray-300 dark:bg-slate-500 p-8 rounded-2xl">
  <ol class="relative border-s border-gray-200">
    {#each entries as entry}
      <TimelineItem
        title={entry.title}
        date={entry.date}
        description={entry.description || ''}
      />
    {/each}
  </ol>
</div>