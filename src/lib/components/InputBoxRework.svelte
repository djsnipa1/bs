<script>
  import {
    isControlsOpen,
    isUrlOpen,
    showCircleAnimation,
    videoId
  } from '$lib/stores/store.js';
  import getVideoId from 'get-video-id';
  import { onMount } from 'svelte';

  // import { clickOutside } from 'svelte-use-click-outside';

  // import { clickOutside } from 'svelte-use-click-outside';

  let inputBox;
  let inputValue = '';
  let ytValue = '';

  function getYouTubeID(url) {
    const { id } = getVideoId(url); //=> 'dQw4w9WgXcQ'
    return id;
  }

  // function clickOutsideHandler() {
  //   if (!$isUrlOpen) {
  //     // $isUrlOpen = false;
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

  function transitionInputBox() {
    if (!$isUrlOpen) {
      // $isUrlOpen = false;
      isUrlOpen.update((value) => !value);
    }
  }

  onMount(() => {
    setTimeout(transitionInputBox, 1500);
  });
</script>

<!-- use:clickOutside={clickOutsideHandler} -->

<div
  class="{$isUrlOpen ? 'endPos' : 'startPos'} glass {$isControlsOpen
    ? 'pointer-events-none'
    : 'pointer-events-auto'} relative flex h-16 w-full min-w-full items-center justify-center"
>
  <input
    type="text"
    placeholder="https://youtu.be/m_xoN8KlP3w"
    on:input={handleInput}
    bind:this={inputBox}
    bind:value={inputValue}
    class="input input-sm input-bordered w-full max-w-xs md:input-md md:max-w-md lg:max-w-lg xl:max-w-xl"
  />
</div>

<!-- </div> -->

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
