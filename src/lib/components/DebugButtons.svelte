<script>
  import { showYoutubeTransition } from '$lib/stores/store.js';
  import { fade } from 'svelte/transition';

  $: uppercase = $showYoutubeTransition.toString().toUpperCase();
  // You can add any necessary logic here
</script>

<div class="absolute bottom-[16.67vh] w-full px-4 sm:px-6 md:px-8">
  <div class="grid grid-cols-2 gap-4">
    <!-- <button -->
    <!--   class="button-style flex flex-col items-center justify-center" -->
    <!--   on:click={() => { -->
    <!--     showYoutubeTransition.update((value) => !value); -->
    <!--   }} -->
    <!-- > -->
    <!--   <span class="text-6xl text-white/50" -->
    <!--     >{$showYoutubeTransition.toUppercas()}</span -->
    <!--   > -->
    <!--   <span class="text-center">showYoutubeTransition</span> -->
    <!-- </button> -->
    <button
      class="button-style relative flex items-center justify-center"
      on:click={() => {
        showYoutubeTransition.update((value) => !value);
      }}
    >
      <span
        class="absolute inset-0 flex items-center justify-center text-5xl text-white/25"
      >
        {#if $showYoutubeTransition}
          <p in:fade>TRUE</p>
        {:else}
          <p in:fade>FALSE</p>
        {/if}
      </span>
      <span class="relative z-10 flex items-center justify-center"
        >showYoutubeTransition</span
      >
    </button>
    <button class="button-style"> Button 2 </button>
    <button class="button-style"> Button 3 </button>
    <button class="button-style"> Button 4 </button>
  </div>
</div>

<style>
  .button-style {
    @apply z-[1000000] select-none rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 p-4 px-3 text-xs font-semibold leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] drop-shadow-lg hover:bg-gradient-to-b hover:from-zinc-800 hover:to-zinc-700 active:text-zinc-400 md:text-base;
  }
</style>
