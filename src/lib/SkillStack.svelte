<script lang="ts">
  import type { Stack } from '../types';
  import { getStarRating } from '../utils/rating';

  export let stacks: Stack[];
</script>

<div class="flex flex-col w-full bg-gray-300 dark:bg-slate-500 p-8 rounded-2xl">
  <h1 class="text-3xl">技術スタック</h1>
  
  <div class="my-2">
    <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl">
      <span class="text-yellow-500">{getStarRating(5)}</span> 
      <br>他者にも教えることができます ✅
    </h1>
    <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl">
      <span class="text-yellow-500">{getStarRating(4)}</span> 
      <br>大規模プロジェクトで活躍できます ✅
    </h1>
    <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl">
      <span class="text-yellow-500">{getStarRating(3)}</span> 
      <br>小〜中規模のプロジェクトでなら活躍できます ✅
    </h1>
    <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl">
      <span class="text-yellow-500">{getStarRating(2)}</span> 
      <br>基本的なことは理解している ✅
    </h1>
    <h1 class="text-base dark:text-gray-200 mb-3 sm:text-xl">
      <span class="text-yellow-500">{getStarRating(1)}</span> 
      <br>チュートリアル ✅
    </h1>
  </div>
  
  {#each stacks as stack}
    <div class="flex justify-between items-center text-base dark:text-gray-200">
      <span>{stack.name}</span>
      <span class="text-yellow-500">{getStarRating(stack.star)}</span>
    </div>
  {/each}
</div>