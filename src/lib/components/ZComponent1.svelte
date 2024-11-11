<script>
  import { onMount } from 'svelte';

  let fillBox = false;
  let font, fontBlack, one;

  onMount(() => {
    font.style.fontWeight = 900;
    fontBlack.style.fontWeight = 100;
    one.style.scale = 1;
  });

  function handleMouseDown() {
    fillBox = true;
    font.style.fontWeight = 100;
    fontBlack.style.fontWeight = 900;
    one.style.scale = 5;
  }

  function handleMouseUp() {
    fillBox = false;
    font.style.fontWeight = 900;
    fontBlack.style.fontWeight = 100;
    one.style.scale = 1;
  }
</script>

<div
  class="relative h-screen w-full border-2 border-dotted border-yellow-500 p-2"
>
  <div
    class="{fillBox
      ? 'bg-pink-300'
      : ''} absolute top-0 flex h-1/4 items-center justify-center border-2 border-dotted border-pink-800"
    style="aspect-ratio: 1 / 1;"
  >
    <p class="text-2xl font-bold transition-all" bind:this={one}>1</p>
  </div>

  <button
    class="test button btn absolute left-12 top-16 z-50 bg-orange-500 text-orange-900 active:bg-orange-600"
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:touchstart|preventDefault={handleMouseDown}
    on:touchend={handleMouseUp}
    on:mouseleave={handleMouseUp}>Click 1</button
  >

  <div class="absolute right-2 top-4 font-sofiasans font-thin">
    <p
      class="origin-left transform py-2 text-left text-3xl leading-8 text-orange-500 transition-all"
      bind:this={fontBlack}
    >
      Layer 1 test text...
    </p>
    <p
      class="test origin-right transform py-2 text-left text-lg leading-8 text-amber-400 transition-all"
      bind:this={font}
    >
      Shouldn't be selectable...
    </p>
  </div>
</div>

<style>
  .test {
    -webkit-user-select: none;
    user-select: none;
    outline: none;
    -webkit-touch-callout: none;
    -webkit-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  }
</style>
