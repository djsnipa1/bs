<!-- src/components/Mask.svelte -->
<script>
  import { circleTransition } from '$lib/transitions/CircleTransition.js';
  import {
    showYoutubeTransition,
    videoId,
    isPlayerReady
  } from '$lib/stores/store.js';

  let status = 'waiting...';
  let thumbnailUrl;
  export let circleVisible = false;
  let range = 100;
  let circle;
</script>

<!--

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    
  </div>
{/if}
-->
<div class="fixed inset-0 z-10 flex items-center justify-center">
  <span class="text-xl text-black">{status}</span>
</div>

<!--<div class="container h-screen w-full z-5">-->
<!--<div class="inset-0 bg-transparent clip-path-circle"></div> -->

<!--
<img src={thumbnailUrl} bind:this={thumbnail} alt="YouTube Video Thumbnail" />
-->

<!--{#if showYoutubeTransition} -->
<div
  class="clip top-0 h-screen w-screen bg-orange-500"
  style="--clip-range: circle({range * 0.1 + 100}% at center)"
  in:circleTransition={{ duration: 3000, delay: 1000 }}
  out:circleTransition={{ duration: 300, delay: 0 }}
  bind:this={circle}
  on:introstart={() => (status = 'intro started')}
  on:outrostart={() => (status = 'outro started')}
  on:introend={() => (status = 'intro ended')}
  on:outroend={() => (status = 'outro ended')}
>
  <slot />
</div>

<!-- {/if} -->
<!--</div>-->

<style>
  .clip {
    clip-path: var(--clip-range);
  }

  .circle-mask {
    clip-path: circle(30%);
  }
</style>
