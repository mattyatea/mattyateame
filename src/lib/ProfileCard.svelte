<script lang="ts">
  import type { Profile } from '../types';
  
  export let profile: Profile;
</script>

<div class="bg-gray-300 dark:bg-slate-500 p-4 rounded-2xl">
  <div class="flex gap-x-4 flex-col sm:flex-row gap-y-4 sm:gap-x-8 sm:gap-y-0 items-center">
    <img 
      alt={profile.avatarAlt} 
      src={profile.avatarUrl} 
      class="rounded-2xl w-48 h-48"
    >
    <div class="flex flex-col items-left dark:text-gray-200">
      <span>名前：{profile.name}</span>
      <span>生年月日：{profile.birthDate}</span>
    </div>
  </div>
</div>