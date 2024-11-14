<!-- Main Route +page.svelte -->
<script>
  import {
    Background,
    CircleImage,
    ControlsNew,
    DebugButtons,
    DebugCode,
    HelpScreen,
    InputBoxFinal,
    InputBoxRework,
    Intro,
    Mask,
    PlayerControlsTest,
    SettingsButton,
    UrlButton,
    YoutubeNewer
  } from '$lib';
  import {
    debugModeEnabled,
    hideMainElements,
    isAnimationDone,
    isControlsOpen,
    isPlayerControlsReady,
    isUrlOpen,
    isVideoPaused,
    isVideoPlaying,
    showCircleAnimation,
    showYoutubeTransition,
    videoId
  } from '$lib/stores/store.js';
  import { tailwindSize } from '$lib/util/tailwindSize.js';
  import { onMount } from 'svelte';
  import { clickOutside } from 'svelte-use-click-outside';
  import { fade } from 'svelte/transition';

  let skipToIntro = true;
  let player;
  let fillFunction, switchGradFunction, helpHandleClick;

  onMount(async () => {
    if ($debugModeEnabled) {
      tailwindSize();
    }
    //   isUrlOpen.set(true);
    if (skipToIntro) {
      // TO SKIP INTRO
      // isAnimationDone = true
      // hideMainElements = false
      isAnimationDone.set(true);
      hideMainElements.set(false);
      //   isUrlOpen.set(true)
    }
  });

  // Reactive statement to load a new video when $videoId changes
  $: if ($videoId && player && typeof player.loadVideoById === 'function') {
    player.loadVideoById($videoId);
  }

  $: if ($isVideoPlaying) {
    player.playVideo();
  }
  $: if ($isVideoPaused) {
    player.pauseVideo();
  }

  // NEW CLICK-OUTSIDE
  function clickOutsideHandler() {
    if (!$isUrlOpen) {
      // $isUrlOpen = false;
      isUrlOpen.update((value) => !value);
    }
  }
</script>

<svelte:head>
  <script src="//cdn.jsdelivr.net/npm/eruda"></script>
  <script>
    eruda.init();
  </script>
</svelte:head>

<div class="relative h-screen w-full">
  <div class="absolute inset-0 z-[600] h-screen w-full">
    <DebugCode />
  </div>
  <div class="absolute inset-0 h-screen w-full">
    <!-- background color -->
    <Background bind:this={switchGradFunction} />
    <!-- end background color -->
  </div>
  <div class="absolute inset-0 h-screen w-full">
    <!-- comment back on -->
    {#if $debugModeEnabled}
      <DebugButtons
        on:click={fillFunction.fill}
        on:click={switchGradFunction.switchGradient}
        on:click={helpHandleClick.handleClick}
      />
    {/if}
    <!-- end comment back on -->
  </div>
</div>

<div
  class="absolute flex h-screen w-full items-center justify-center landscape:hidden {$isAnimationDone
    ? 'displayNone'
    : ''}"
>
  <Intro />
</div>

<div
  class="relative min-h-screen min-w-full touch-none border-0
  landscape:hidden {$hideMainElements ? 'hidden' : ''}"
>
  <!-- <div -->
  <!--   class="relative top-20 z-[7500] h-20 w-20 border-blue-500 bg-pink-500" -->
  <!-- ></div> -->

  <div
    class="{!$isUrlOpen ? 'endPos' : 'startPos'} absolute z-[450] min-w-full"
    use:clickOutside={clickOutsideHandler}
  >
    <InputBoxFinal bind:this={fillFunction} />
  </div>

  <!-- ControlsNew  -->
  <div
    class="top-0 w-full"
    class:initialPosition={!$isControlsOpen}
    class:endPosition={$isControlsOpen}
  >
    <ControlsNew />
  </div>
  <!-- ControlsNew END -->

  {#if $showYoutubeTransition}
    <div class="absolute right-0 top-0 z-[-5] w-screen">
      <Mask>
        <YoutubeNewer bind:player />

        <!-- <PlayerControlsTest /> -->
      </Mask>
    </div>
  {/if}

  <nav
    class="absolute top-0 z-[500] flex h-12 w-full items-center justify-between rounded-sm bg-[linear-gradient(180deg,#ffe636_0%,#ffd430_5%,#ffc12b_10%,#ffb72c_25%,#ffa51a_40%,#f6a200_60%,#f59c00_75%,#f39500_90%,#f28d00_95%,#f78d00_100%)] opacity-100 shadow-lg"
  >
    <!-- <div class="absolute left-[30px] top-[350px] z-[2000] text-4xl"></div> -->
    <UrlButton
      class="button ml-4 flex-none rounded-md bg-slate-300 p-1 text-slate-700 shadow-md hover:bg-slate-400 hover:text-slate-800"
      on:click={() => {
        isUrlOpen.update((value) => !value);
      }}
    />
    <div
      class="text-md flex-none text-center font-sofiasans font-bold leading-4 text-white shadow-slate-600 text-shadow-sm"
    >
      Beatstar<br />Practicer
    </div>

    <SettingsButton
      class="button mr-4 flex-none rounded-md bg-slate-300 p-1 text-slate-700 shadow-md hover:bg-slate-400 hover:text-slate-800"
    />
  </nav>

  <!-- comment back on -->
  {#if $isPlayerControlsReady}
    <div class="z-[50] translate-y-1/2" transition:fade>
      <PlayerControlsTest />
    </div>
  {/if}
  <!-- end comment back on -->
</div>

<!-- this needs to be redone so its not blocking the rest of the interactivity -->
<!-- comment back on -->
<div
  class="absolute right-0 top-0 z-[400] h-full w-screen border-2 border-green-500"
>
  {#if $showCircleAnimation}
    <CircleImage />
  {/if}

  <HelpScreen bind:this={helpHandleClick} />
</div>

<!-- end comment back on -->

<style>
  .initialPosition {
    transform: translateY(-230px);
    /*	transition: all 500ms ease-in; */
    transition: all 600ms cubic-bezier(0.6, 0.04, 0.98, 0.335); /* easeInCirc */
  }
  .endPosition {
    transform: translateY(45px);
    /*		transition: all 500ms cubic-bezier(0.25, 1, 0.5, 1); */
    transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1); /* easeOutCirc */
    @apply top-11 z-[10];
  }

  .startPos {
    transform: translateY(-166px);
    transition: transform 0.6s cubic-bezier(0.5, 0, 0.75, 0);
  }
  .endPos {
    transform: translateY(47px);
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .displayNone {
    display: none;
  }
  * {
    outline: 1px solid red;
    outline-offset: -1px;
  }
</style>
