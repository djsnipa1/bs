<script>
  import { PasteButton } from '$lib';
  import {
    debugModeEnabled,
    isUrlOpen,
    menuOpen,
    showCircleAnimation,
    showYoutubeTransition,
    videoId
  } from '$lib/stores/store.js';
  import getVideoId from 'get-video-id';

  // import { createEventDispatcher } from 'svelte';

  // const dispatch = createEventDispatcher();

  let fillElement;

  $: currentBind = '';
  let inputBox;

  function getYouTubeID(url) {
    const { id } = getVideoId(url); //=> 'dQw4w9WgXcQ'
    return id;
  }

  //debugModeEnabled.set(false)

  /*
  // Test the function with some sample URLs
  console.log(getYouTubeID('https://www.youtube.com/watch?v=qeMFqkcPYcg')); // qeMFqkcPYcg
  console.log(getYouTubeID('https://youtu.be/qeMFqkcPYcg')); // qeMFqkcPYcg
  console.log(getYouTubeID('https://www.youtube.com/embed/qeMFqkcPYcg')); // qeMFqkcPYcg
  console.log(getYouTubeID('https://www.youtube.com/v/qeMFqkcPYcg')); // qeMFqkcPYcg
  console.log(getYouTubeID('https://www.youtube.com/watch?v=invalid')); // ""
  console.log(getYouTubeID('https://youtu.be/m_xoN8KlP3w'));
*/
  let inputValue = '';
  let ytValue = '';
  // This function will be called every time the input value changes
  function handleInput(event) {
    inputValue = event.target.value;
    //  console.log(inputValue); // Log the current value of the input
    ytValue = getYouTubeID(inputValue);
    if (typeof ytValue !== 'string' || ytValue === '') {
      console.log('Could not get youtube video id');
      // return ''
    } else {
      //      console.log('The function returned a truthy value:', ytValue);
      $videoId = ytValue;
      isUrlOpen.update((value) => !value);
      //isUrlOpen.set(true)
      inputBox.value = '';
      showCircleAnimation.set(true);
    }
  }
  export const fill = () => {
    inputValue = 'https://youtu.be/3gXLdl-aj_w';
    handleInput({ target: { value: inputValue } });
    if ($isUrlOpen) {
      isUrlOpen.set(false);
    }
  };
</script>

<div class="glass relative flex h-16 items-center justify-center">
  <!--  <PasteButton
    class="button mx-4 flex-1 rounded-md bg-slate-300 p-1 text-slate-700 shadow-md hover:bg-slate-400 hover:text-slate-800"
  />
  -->

  <input
    type="text"
    placeholder="https://youtu.be/m_xoN8KlP3w"
    on:input={handleInput}
    bind:this={inputBox}
    bind:value={inputValue}
    class="input input-sm input-bordered w-full max-w-xs md:input-md md:max-w-md lg:max-w-lg xl:max-w-xl"
  />
</div>

{#if $debugModeEnabled}
  <button
    class="group absolute right-1/4 top-4 h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] drop-shadow-lg hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]"
    on:click={fill}>fill temp URL</button
  >
{/if}
