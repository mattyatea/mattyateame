<div class="noise-bg min-h-screen relative overflow-x-hidden" style="background: #060612;">
  <!-- Gradient orbs -->
  <div class="gradient-orb w-[600px] h-[600px] top-[-200px] left-[-200px]" style="background: radial-gradient(circle, var(--color-accent-1), transparent); opacity: 0.14;"></div>
  <div class="gradient-orb w-[500px] h-[500px] top-[40%] right-[-150px]" style="background: radial-gradient(circle, var(--color-accent-2), transparent); opacity: 0.1;"></div>
  <div class="gradient-orb w-[400px] h-[400px] bottom-[10%] left-[20%]" style="background: radial-gradient(circle, var(--color-accent-3), transparent); opacity: 0.09;"></div>

  <div class="relative z-10">
    <slot />
  </div>
</div>
