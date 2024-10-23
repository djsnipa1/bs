<script>
  import {
    showYoutubeTransition,
    triggerStore,
    vibrantColorStore
  } from '$lib/stores/store.js';
  import { fade } from 'svelte/transition';

  function handleClick() {
    triggerStore.set(true);
  }

  $: currentHexColors = $vibrantColorStore;
  let hexColors = null;
  $: hexColor = currentHexColors.hexColor ?? '#3f3f46';
  $: hexColorLighter = currentHexColors.hexColorLighter ?? '#3f3f46';
  $: hexColorDarker = currentHexColors.hexColorDarker ?? '#27272a';
  // $: hexColor = currentHexColors.hexColor === '#000000' ? '#3f3f46' : currentHexColors.hexColor;

  $: console.log(
    `%chexColor: ${hexColor}`,
    `background-color: ${hexColor}; font-weight: bold; color:white;`
  );

  $: console.log(
    `%ccurrentHexColors.hexColor: ${currentHexColors.hexColor}`,
    `background-color: ${currentHexColors.hexColor}; font-weight: bold; color:white;`
  );

  $: cssVars = {
    hexColor,
    hexColorDarker,
    hexColorLighter,
    'shadow-color': 'color-mix(in srgb, var(--hexColor) 75%, black)',
    'highlight-color': 'color-mix(in srgb, var(--hexColor) 75%, white)'
  };

  $: objectToCssVars = (object) => {
    let cssVars = Object.entries(object)
      .map(([key, value]) => `--${key}:${value}`)
      .join(';');
    return cssVars;
  };

  $: finalCssVars = objectToCssVars(cssVars);

  $: if (currentHexColors) {
    hexColors = Object.entries(currentHexColors)
      .map(([key, value]) => `--${key}:${value}`)
      .join(';');

    let newHexColor = currentHexColors.hexColor;
    console.log('newHexColor: ', newHexColor);
    console.log('hexColors: ', hexColors);
  }

  // $: console.log('finalCssVars: ', JSON.stringify(finalCssVars));
  // You can add any necessary logic here
</script>

<div
  style={finalCssVars}
  class="fixed bottom-4 z-[1000000] w-full px-4 sm:px-6 md:px-8"
>
  <div class="grid grid-cols-2 gap-4">
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
    <button class="button-style" on:click>Fill with URL</button>
    <button
      class="background-gradient bg-gradient-to-b from-[color:--hexColor] via-[color:--hexColor] to-[color:--hexColorDarker] shadow-[inset_-1px_-1px_0_0_rgba(0,0,0,0.75),inset_0_0_0_1px_var(--shadow-color),inset_1px_1px_0_0.5px_var(--highlight-color)]"
      on:click
      >Switch Gradient
    </button>
    <button class="button-style" on:click={handleClick}>Button 4</button>
  </div>
</div>

<style>
  /* * { */
  /*   --hexColor: #3f3f46; */
  /*   --hexColorDarker: #27272a; */
  /*   --hexColorLighter: #3f3f46; */
  /*   --shadow-color: color-mix(in srgb, var(--hexColor) 75%, black); */
  /*   --highlight-color: color-mix(in srgb, var(--hexColor) 75%, white); */
  /* } */

  /* @apply z-[1000000] select-none rounded-lg bg-gradient-to-b from-zinc-700 via-zinc-700 to-zinc-800 p-4 px-3 text-xs font-semibold leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] drop-shadow-lg  active:text-zinc-400 md:text-base; */
  .button-style {
    @apply z-[1000000] select-none rounded-lg bg-gradient-to-b from-zinc-700 via-zinc-700 to-zinc-800 p-4 px-3 text-xs font-semibold leading-8 text-zinc-50 shadow-[inset_-1px_-1px_0_0_rgba(0,0,0,0.75),inset_0_0_0_1px_rgb(9_9_11),inset_1px_1px_0_0.5px_#71717a] drop-shadow-lg active:text-zinc-400 md:text-base;
    /* @apply z-[1000000] select-none rounded-lg bg-gradient-to-b from-zinc-700 via-zinc-700 to-zinc-800 p-4 px-3 text-xs font-semibold leading-8 text-zinc-50  drop-shadow-lg  active:text-zinc-400 md:text-base; */
    /* box-shadow: */
    /*   inset -1px -1px 0 0px var(--hexColor), */
    /*   inset 0 0 0 1px var(--shadow-color), */
    /*   inset 1px 1px 0 0.5px var(--highlight-color); */
  }
  /* .button-style { */
  /*   @apply z-[1000000] select-none rounded-lg bg-gradient-to-b from-zinc-700 via-zinc-700 to-zinc-800 p-4 px-3 text-xs font-semibold leading-8 text-zinc-50  drop-shadow-lg  active:text-zinc-400 md:text-base; */
  /*   box-shadow: */
  /*     inset -1px -1px 0 0px rgba(0, 0, 0, 0.75), */
  /*     inset 0 0 0 1px var(--shadow-color), */
  /*     inset 1px 1px 0 0.5px var(--highlight-color); */
  /* } */

  .background-gradient {
    @apply z-[1000000] select-none rounded-lg p-4 px-3 text-xs font-semibold leading-8 text-zinc-50 drop-shadow-lg active:text-zinc-400 md:text-base;
    background-image: linear-gradient(
      to bottom,
      var(--hexColorLighter) 0%,
      var(--hexColor) 50%,
      var(--hexColorDarker) 100%
    );
    transition:
      --hexColorLighter 0.5s,
      --hexColor 1s,
      --hexColorDarker 1.5s;
  }

  @property --hexColor {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --hexColorLighter {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --hexColorDarker {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
</style>
