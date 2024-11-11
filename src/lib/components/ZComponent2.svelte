<script>
  import { onMount } from 'svelte';

  let fillBox = false;
  let font, fontBlack, two;

  onMount(() => {
    font.style.fontWeight = 900;
    fontBlack.style.fontWeight = 100;
    two.style.scale = 1;
  });

  function handleMouseDown() {
    fillBox = true;
    font.style.fontWeight = 100;
    fontBlack.style.fontWeight = 900;
    two.style.scale = 5;
  }

  function handleMouseUp() {
    fillBox = false;
    font.style.fontWeight = 900;
    fontBlack.style.fontWeight = 100;
    two.style.scale = 1;
  }
</script>

<div
  class="relative h-screen w-full border-2 border-dotted border-green-600 p-4 font-black"
>
  <div
    class="{fillBox
      ? 'bg-cyan-300'
      : ''} absolute right-2 top-1/2 flex h-1/4 -translate-y-1/2 transform items-center justify-center border-2 border-dashed border-blue-500"
    style="aspect-ratio: 1 / 1;"
  >
    <p class="text-2xl font-bold transition-all" bind:this={two}>2</p>
  </div>

  <div class="group">
    <button
      class="test button btn absolute left-16 top-40 z-50 size-20 translate-x-1 bg-amber-500 text-orange-900 hover:scale-105 active:bg-orange-600"
      on:mousedown={handleMouseDown}
      on:mouseup={handleMouseUp}
      on:touchstart|preventDefault={handleMouseDown}
      on:touchend={handleMouseUp}
      on:mouseleave={handleMouseUp}>Click 2</button
    >

    <div class="absolute left-2 top-1/2 font-sofiasans">
      <p
        class="origin-left transform py-2 text-left text-3xl leading-8 text-orange-500 transition-all"
        bind:this={fontBlack}
      >
        Layer 2 test text...
      </p>
      <p
        class="test origin-right transform py-2 text-left text-lg leading-8 text-amber-400 transition-all"
        bind:this={font}
      >
        Shouldn't be selectable...
      </p>
    </div>
  </div>
</div>

<!-- style={playIt ? 'font-weight: 800;' : 'font-weight: 200;'} -->

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
