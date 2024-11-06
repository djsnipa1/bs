<script>
  import { BlankButton, NeuromorphicText } from '$lib';
  import { cssPosition, nudgeLeft, nudgeRight } from '$lib/stores/store.js';

  let hovered = false;
  let isActive = false;

  function toggleActive() {
    isActive = !isActive;
  }
</script>

<div
  class="h-30 h-30 mx-auto mt-1 grid w-2/3 grid-cols-2 grid-rows-3 place-items-center justify-between gap-0 font-sofiasans text-sm"
>
  <div class="h-8">
    <NeuromorphicText textColor={'text-slate-800 mix-blend-difference'}>
      {#if $cssPosition < 0}
        {$cssPosition / 3}
      {:else if $cssPosition >= 0}
        0
      {/if}
    </NeuromorphicText>
  </div>
  <div class="h-8">
    <NeuromorphicText textColor={'text-slate-800 mix-blend-difference'}>
      {#if $cssPosition > 0}
        {$cssPosition / 3}
      {:else if $cssPosition <= 0}
        0
      {/if}
    </NeuromorphicText>
  </div>
  <div class="mx-auto mt-0 flex w-1/2 justify-center pt-1">
    <BlankButton on:click={nudgeLeft}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 fill-slate-800 mix-blend-difference"
        viewBox="0 0 24 24"
      >
        <path
          d="M14.808 9.248a.75.75 0 0 0-1.06-.055l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h3.546a.75.75 0 0 0 0-1.5h-3.546l1.048-.943a.75.75 0 0 0 .055-1.059M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25zM8.998 5.5v13H19.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25z"
        />
      </svg>
    </BlankButton>
  </div>
  <div class="mx-auto flex w-1/2 justify-center pt-1">
    <BlankButton on:click={nudgeRight}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 fill-slate-800 mix-blend-difference"
        viewBox="0 0 24 24"
      >
        <path
          d="M14.193 14.751a.75.75 0 0 0 1.059.056l2.5-2.25a.75.75 0 0 0 0-1.114l-2.5-2.25a.75.75 0 0 0-1.004 1.115l1.048.942H11.75a.75.75 0 1 0 0 1.5h3.546l-1.048.942a.75.75 0 0 0-.055 1.06M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25zM9 5.5v13h10.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25z"
        />
      </svg>
    </BlankButton>
  </div>
  <div>
    <p class="text-base text-slate-800 mix-blend-difference">Nudge Left</p>
  </div>
  <div>
    <p class="text-base text-slate-800 mix-blend-difference">Nudge Right</p>
  </div>
</div>

<style>
  /*
   .neomorph {
  	box-shadow:  inset -1px -1px 3px rgba(0, 0, 0, 0.40),
          inset 1px 1px 3px rgba(255, 255, 255, 0.10);
  }
  .neomorph:hover {
  	box-shadow:  inset -1px -1px 3px rgba(255, 255, 255, 0.10),
          inset 1px 1px 3px rgba(0, 0, 0, 0.40);
  }

    .inactive {
      box-shadow:  inset -1px -1px 3px rgba(0, 0, 0, 0.40),
          inset 1px 1px 3px rgba(255, 255, 255, 0.10);
          
  }
    .active {
      box-shadow:  inset -1px -1px 3px rgba(255, 255, 255, 0.10),
          inset 1px 1px 3px rgba(0, 0, 0, 0.40);
          
  }

*/
</style>
