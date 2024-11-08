<script>
  let fillBox = false;

  function handleMouseDown() {
    fillBox = true;
  }

  function handleMouseUp() {
    fillBox = false;
  }
</script>

<div
  class="relative h-screen w-full border-2 border-dotted border-green-600 p-4"
>
  <div
    class="{fillBox
      ? 'bg-cyan-300'
      : ''} absolute right-8 top-32 flex size-32 items-center justify-center border-2 border-pink-800"
  >
    <p class="text-2xl font-bold">2</p>
  </div>

  <button
    class="test button btn absolute left-48 top-40 bg-orange-500 text-orange-900 active:bg-orange-600 z-50"
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:touchstart|preventDefault={handleMouseDown}
    on:touchend={handleMouseUp}
    on:mouseleave={handleMouseUp}>CLICK</button
  >

  <div class="absolute left-8 top-36 font-sofiasans font-thin">
    <p class="py-2 text-3xl leading-8 text-orange-500">Layer 1 test text...</p>
    <p class="test py-2 text-xl leading-8 text-amber-400">
      Shouldn't be selectable...
    </p>
  </div>
</div>

<style>
  .test {
    -webkit-user-select: none;
    user-select: none;
  }
</style>
