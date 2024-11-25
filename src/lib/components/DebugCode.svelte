<script>
  import { debugModeEnabled } from '$lib/stores/store.js';
  import { swipe } from 'svelte-gestures';

  let direction;
  // let target;
  // let pointerType;

  const CODE = 'top,top,bottom,bottom,left,right,left,right';

  let codeRef = [];

  function handler(event) {
    direction = event.detail.direction;
    // target = event.detail.target;
    // pointerType = event.detail.pointerType;

    codeRef = [...codeRef, direction.toLowerCase()].slice(
      codeRef.length > 9 ? codeRef.length - 9 : 0
    );

    if (codeRef.join(',') === CODE) {
      console.log('Code Entered!');
      debugModeEnabled.set(true);
    }
  }
</script>

<!-- <div class="flex h-screen w-screen items-center justify-center bg-gray-100"> -->
<!-- </div> -->

<div
  use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
  on:swipe={handler}
  class="inset-0 flex h-screen w-full items-center justify-center"
>
  <!-- <div class="max-w-3/4 aspect-square w-3/4 rounded-lg bg-blue-500 shadow-lg"> -->
  direction: {direction}
  <!-- </div> -->
  <!-- {#if codeEntered} -->
  <!--   <p class="mx-auto text-center font-kiona text-2xl">Code Entered!</p> -->
  <!-- {/if} -->
</div>
