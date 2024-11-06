<script>
  import { BlankButton, FineTuning, Slider } from '$lib';
  import { cssPosition, isControlsOpen } from '$lib/stores/store.js';

  let isVisible = false;
</script>

<div class="container relative flex items-center justify-center">
  <div
    class="glass left-0 top-0 z-[1500] h-[230px] w-[375px] rounded-xl bg-slate-600/20 shadow-xl"
  >
    <!--	class:visible={$isControlsOpen} class:notVisible={!$isControlsOpen} -->

    <!-- <button
			class="bg-white-500/50 z-100 absolute right-2 top-2 h-8 w-8 border-2 border-blue-800 text-red-500"
			on:click={() => {
				isControlsOpen.set(false);
			}}>X</button
		> -->
    <div class="absolute right-5 top-2 h-4 w-4">
      <button
        aria-label="button"
        class="glass-button button rounded-md text-slate-700 shadow-md transition hover:scale-110 hover:text-slate-800 active:scale-90"
        on:click={() => {
          isControlsOpen.set(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
          /></svg
        >
      </button>
    </div>

    <h1
      class="mt-2 text-center font-sofiasans text-xl font-bold text-slate-800"
    >
      Controls
    </h1>
    <div class="flex flex-col items-center justify-center font-sofiasans">
      <p class="mix-blend-difference">Video Position</p>
    </div>

    <Slider />

    <FineTuning />
  </div>
</div>

<!--<button class="btn" on:click={() => (isVisible = !isVisible)}>Toggle Visibility</button>-->

<!-- <div class:visibleDel={isVisible} class:notVisibleDel={!isVisible}>
  This div will move.
</div> -->

<style>
  .pos {
    top: 10px;
    right: 5px;
  }
  .initialPosition {
    transform: translateY(-180px);
  }
  .visible {
    transform: translateX(0px);
    @apply transition-all;
  }
  .notVisible {
    /* transform: translateY(-290px); */
    @apply -translate-x-[290px] transition-all;
  }
  .visibleDel {
    transform: translateX(-20px);
    @apply absolute top-0 h-10 w-10 bg-blue-400 transition-all;
  }
  .notVisibleDel {
    transform: translateX(0px);
    @apply absolute top-0 h-10 w-10 bg-blue-400 transition-all;
  }

  .glass-button {
    /* display: inline-block; */
    border: 0;
    text-decoration: none;
    /* border-radius: 15px; */
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    color: rgba(255, 255, 255, 0.8);
    /* font-size: 14px; */
    /* letter-spacing: 2px; */
    cursor: pointer;
    /* text-transform: uppercase; */
  }

  .glass-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
