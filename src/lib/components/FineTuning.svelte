<script>
  import { fade } from "svelte/transition";
  import { NeuromorphicText, BlankButton } from "$lib";
  let hovered = false;
  let isActive = false;
  
  function toggleActive() {
    isActive = !isActive;
  }
</script>

<div
  class="h-30 grid grid-cols-2 grid-rows-3 w-2/3 gap-0 mx-auto justify-between font-sofiasans text-sm place-items-center h-30 mt-1">
  <div class="h-8">
    <NeuromorphicText textColor={'text-slate-400'}>28</NeuromorphicText>
  </div>
  <div class="h-8">
    <NeuromorphicText textColor={'text-slate-400'}>11</NeuromorphicText>
  </div>
  <div
    class="flex justify-center w-1/2 mx-auto mt-0">
    <BlankButton>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M14.808 9.248a.75.75 0 0 0-1.06-.055l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h3.546a.75.75 0 0 0 0-1.5h-3.546l1.048-.943a.75.75 0 0 0 .055-1.059M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25zM8.998 5.5v13H19.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25z" />
      </svg>
    </BlankButton>
  </div>
  <div class="flex justify-center w-1/2 mx-auto">
    <BlankButton>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M14.193 14.751a.75.75 0 0 0 1.059.056l2.5-2.25a.75.75 0 0 0 0-1.114l-2.5-2.25a.75.75 0 0 0-1.004 1.115l1.048.942H11.75a.75.75 0 1 0 0 1.5h3.546l-1.048.942a.75.75 0 0 0-.055 1.06M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25zM9 5.5v13h10.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25z" />
    </svg>
    </BlankButton>
  </div>
  <div class="text-slate-300"><p>Nudge Left</p></div>
  <div class="text-slate-300"><p>Nudge Right</p></div>
</div>

<style>
  * {
    @apply font-sofiasans box-border border-yellow-500;
  }
  
    div {
      @apply border border-yellow-500;
    }
  
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
