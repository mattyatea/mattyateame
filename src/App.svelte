<script lang="ts">
import Layout from "./lib/Layout.svelte";
import Hero from "./lib/Hero.svelte";
import About from "./lib/About.svelte";
import SkillStack from "./lib/SkillStack.svelte";
import Projects from "./lib/Projects.svelte";
import Timeline from "./lib/Timeline.svelte";
import Footer from "./lib/Footer.svelte";
import { profile, stacks, timelineEntries, projects } from "./data/profile";
</script>

<Layout>
  <Hero {profile} />
  <div class="max-w-4xl mx-auto px-6 pb-24 space-y-20">
    <About {profile} />
    <Projects {projects} />
    <SkillStack {stacks} />
    <Timeline entries={timelineEntries} />
  </div>
  <Footer />
</Layout>
