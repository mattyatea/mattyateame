<script lang="ts">
import ProfileCard from "./lib/ProfileCard.svelte";
import SkillStack from "./lib/SkillStack.svelte";
import Timeline from "./lib/Timeline.svelte";
import Footer from "./lib/Footer.svelte";
import Layout from "./lib/Layout.svelte";
import { profile, stacks, timelineEntries } from "./data/profile";
</script>

<Layout>
  <main>
    <div class="flex flex-col lg:w-9/12 w-full mx-auto space-y-4">
      <ProfileCard {profile} />
      <SkillStack {stacks} />
      <Timeline entries={timelineEntries} />
      <Footer copyrightText="Copyright © 2025 mattyatea All rights reserved." />
    </div>
  </main>
</Layout>