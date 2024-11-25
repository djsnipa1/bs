<!-- src/components/Mask.svelte -->
<script>
  import { isPlayerControlsReady } from '$lib/stores/store.js';
  import { circleTransition } from '$lib/transitions/CircleTransition.js';

  let circle;
  let status = 'waiting...';
  export let circleVisible = false;
  let range = 100;

  function playOnIntroEnd() {
    status = 'intro ended';
    isPlayerControlsReady.set(true);
  }
</script>

<div class="fixed inset-0 z-10 flex items-center justify-center">
  <span class="text-xl text-black">{status}</span>
</div>

<div
  class="clip pointer-events-auto top-0 h-screen w-screen bg-orange-500"
  style="--clip-range: circle({range * 0.1 + 100}% at center)"
  in:circleTransition={{ duration: 3000, delay: 1000 }}
  out:circleTransition={{ duration: 300, delay: 0 }}
  bind:this={circle}
  on:introstart={() => (status = 'intro started')}
  on:outrostart={() => (status = 'outro started')}
  on:introend={() => playOnIntroEnd()}
  on:outroend={() => (status = 'outro ended')}
>
  <slot />
</div>

<style>
  .clip {
    clip-path: var(--clip-range);
  }
</style>
