<script>
  import {
    isUrlOpen,
    showCircleAnimation,
    videoId
  } from '$lib/stores/store.js';
  import getVideoId from 'get-video-id';

  // import { clickOutside } from 'svelte-use-click-outside';

  let inputBox;

  function getYouTubeID(url) {
    const { id } = getVideoId(url); //=> 'dQw4w9WgXcQ'
    return id;
  }

  let inputValue = '';
  let ytValue = '';

  // function clickOutsideHandler() {
  //   if (!$isUrlOpen) {
  //     isUrlOpen.update((value) => !value);
  //   }
  // }

  // This function will be called every time the input value changes
  function handleInput(event) {
    inputValue = event.target.value;
    ytValue = getYouTubeID(inputValue);
    if (typeof ytValue !== 'string' || ytValue === '') {
      console.log('Could not get youtube video id');
      // return ''
    } else {
      $videoId = ytValue;
      isUrlOpen.update((value) => !value);
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

<div
  class="{!$isUrlOpen
    ? 'endPos'
    : 'startPos'} glass relative flex h-16 w-full min-w-full items-center justify-center"
>
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

<style>
  .startPos {
    transform: translateY(-166px);
    transition: transform 0.6s cubic-bezier(0.5, 0, 0.75, 0);
  }
  .endPos {
    transform: translateY(47px);
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }
</style>
