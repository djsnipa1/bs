<script>
  import { PasteButton } from '$lib';
  import {
    isUrlOpen,
    videoId,
    menuOpen,
    showYoutubeTransition
  } from '$lib/stores/store.js';
  import getVideoId from 'get-video-id';

  $: currentBind = '';
  let inputBox;

  function getYouTubeID(url) {
    const { id } = getVideoId(url); //=> 'dQw4w9WgXcQ'

    return id;
  }

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
      showYoutubeTransition.set(true);
      inputBox.value = '';
    }
  }

  function fill() {
    inputBox.value = 'https://youtu.be/m_xoN8KlP3w';
  }
</script>

<div class="glass flex h-16 items-center justify-center">
  <!--  <PasteButton
    class="button mx-4 flex-1 rounded-md bg-slate-300 p-1 text-slate-700 shadow-md hover:bg-slate-400 hover:text-slate-800"
  />
  -->

  <input
    type="text"
    placeholder="https://youtu.be/m_xoN8KlP3w"
    on:input={handleInput}
    bind:this={inputBox}
    class="input input-sm input-bordered w-full max-w-xs md:input-md md:max-w-md lg:max-w-lg xl:max-w-xl"
  />
</div>

<button class="btn" on:click={fill}>fill</button>
