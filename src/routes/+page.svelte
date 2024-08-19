<!-- Main Route +page.svelte -->
<script lang="ts">
  import {
    YoutubeNewer,
    InputBoxFinal,
    ControlsNew,
    SettingsButton,
    UrlButton,
    PlayerControlsTest,
    Intro,
    Mask,
    CircleImage,
    HelpScreen
  } from '$lib';
  import { videoId } from '$lib/stores/store.js';
  import { copy } from 'svelte-copy';
  import {
    cssPosition,
    isControlsOpen,
    isUrlOpen,
    menuOpen,
    isVideoPlaying,
    isVideoPaused,
    hideMainElements,
    isAnimationDone,
    showYoutubeTransition,
    isPlayerReady,
    showCircleAnimation,
    debugModeEnabled
  } from '$lib/stores/store.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { tailwindSize } from '$lib/util/tailwindSize.js';

  export let data;

  $: color = data.color;

  let skipToIntro = true;
  let player;

  //let showBackground = true;

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

  const toggle = () => {
    console.log('changing video id');
    player.loadVideoById('dQw4w9WgXcQ');
    // 	player.loadVideoById($videoId);
  };

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

  export let min = -33;
  export let max = 33;
  export let step = 3;
  export let value = 0;

  let style = '';

  $: style = `width: ${value}vw; height: ${value}px;`;

  function clickOutside(element: HTMLElememt) {
    function handleClick(event: MouseEvent) {
      const targetEl = event.target as HTMLElement;

      if (element && !element.contains(targetEl)) {
        const clickOutsideEvent = new CustomEvent('outside');
        element.dispatchEvent(clickOutsideEvent);
      }
    }

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  $: console.log(`isUrlOpen: ${$isUrlOpen}`);
</script>

<!-- background color -->
<div class="background-gradient absolute z-[-10] min-h-screen min-w-full"></div>
<!-- end background color -->

<div
  class="absolute z-[10000] flex h-screen w-full items-center justify-center landscape:hidden {$isAnimationDone
    ? 'displayNone'
    : ''}"
>
  <Intro />
</div>

<div
  class="min-h-screen min-w-full touch-none border-0
  landscape:hidden {$hideMainElements ? 'hidden' : ''}"
>
  <div
    class="relative top-20 z-[7500] h-20 w-20 border-blue-500 bg-pink-500"
  ></div>

  <div
    class="{!$isUrlOpen
      ? 'endPos'
      : 'startPos'} absolute z-[2] z-[696969] min-w-full"
    on:outside={() => {
      if (!$isUrlOpen) {
        // $isUrlOpen = false;
        isUrlOpen.update((value) => !value);
      }
    }}
    use:clickOutside
  >
    <InputBoxFinal />
  </div>

  <!-- changed z-index of this button to get it to work with CircleImage and HelpScreen present -->
  <button
    class="button btn btn-xs absolute z-[10000] items-center justify-center"
    on:click={() => {
      //if (!$showYoutubeTransition) {
      // $isUrlOpen = false;
      showYoutubeTransition.update((value) => !value);
      //}
    }}>showYoutubeTransition: {$showYoutubeTransition}</button
  >

  {#if $showYoutubeTransition}
    <div class="absolute right-0 top-0 z-[-5] w-screen">
      <Mask>
        <div
          class="top-0 w-full"
          class:initialPosition={!$isControlsOpen}
          class:endPosition={$isControlsOpen}
        >
          <ControlsNew />
        </div>

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

  <!--
  <div
    class="absolute top-0 z-[10] w-full"
    class:initialPosition={!$isControlsOpen}
    class:endPosition={$isControlsOpen}
  >
    <ControlsNew />
  </div>
-->
  <div class="z-[50] translate-y-16">
    <PlayerControlsTest />
  </div>
</div>

<div
  class="absolute right-0 top-0 z-[15] h-full w-screen border-2 border-green-500"
>
  {#if $showCircleAnimation}
    <CircleImage />
  {/if}

  <HelpScreen />
</div>

<!--
<div
  class="relative flex min-h-screen min-w-full touch-none items-center justify-center border-0 portrait:hidden"
>
  <p
    class="flex items-center justify-center text-center font-kiona text-3xl text-white"
  >
    Beatstar Practicer can only<br />be viewed in portrait mode
  </p>
</div>
-->
<style>
  .initialPosition {
    transform: translateY(-230px);
    /*	transition: all 500ms ease-in; */
    transition: all 600ms cubic-bezier(0.6, 0.04, 0.98, 0.335); /* easeInCirc */
  }
  .endPosition {
    /* transform: translateY(60px); */
    /*		transition: all 500ms cubic-bezier(0.25, 1, 0.5, 1); */
    transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1); /* easeOutCirc */
    @apply top-11 z-[10];
  }
  .shadow-sharp {
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.25),
      0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15),
      0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);
  }
  .shadow-diffuse {
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.08),
      0 2px 2px rgba(0, 0, 0, 0.12),
      0 4px 4px rgba(0, 0, 0, 0.16),
      0 8px 8px rgba(0, 0, 0, 0.2);
  }
  .startPos {
    transform: translateY(-166px);
    transition: transform 0.6s cubic-bezier(0.5, 0, 0.75, 0);
  }
  .endPos {
    transform: translateY(-34px);
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .displayNone {
    display: none;
  }
  .gradient {
    background-image: linear-gradient(
      109.6deg,
      rgba(62, 161, 219, 1) 11.2%,
      rgba(93, 52, 236, 1) 100.2%
    );
  }

  .background-gradient {
    background-image: radial-gradient(
      circle,
      hsl(192deg 76% 50%) 0%,
      hsl(203deg 100% 43%) 33%,
      hsl(213deg 80% 40%) 67%,
      hsl(215deg 80% 29%) 100%
    );
  }

  .gradient-animation {
    background: radial-gradient(
        100% 100% at var(--g5-1-x-position) var(--g5-1-y-position),
        rgba(62, 161, 219, 1) -52%,
        transparent
      ),
      radial-gradient(
        100% 100% at var(--g5-2-x-position) var(--g5-2-y-position),
        rgba(93, 52, 236, 1) 0%,
        transparent
      ),
      radial-gradient(
        100% 100% at var(--g5-3-x-position) var(--g5-3-y-position),
        rgba(62, 161, 219, 1) 0%,
        transparent
      ),
      #ffffff;
    animation-name: g-5;
    animation-iteration-count: infinite;
    animation-duration: 16s;
    transition-timing-function: ease-in-out;
  }
  @property --g5-1-x-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 1.0937500000000024%;
  }
  @property --g5-1-y-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }
  @property --g5-2-x-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 15.312500000000002%;
  }
  @property --g5-2-y-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 85.46875%;
  }
  @property --g5-3-x-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 97.1875%;
  }
  @property --g5-3-y-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 48.515625%;
  }
  :root {
    --g5-1-x-position: 1.0937500000000024%;
    --g5-1-y-position: 0%;
    --g5-2-x-position: 15.312500000000002%;
    --g5-2-y-position: 85.46875%;
    --g5-3-x-position: 97.1875%;
    --g5-3-y-position: 48.515625%;
  }
  @keyframes g-5 {
    50% {
      --g5-1-x-position: 99.0234375%;
      --g5-1-y-position: 99.0234375%;
      --g5-2-x-position: 84.1796875%;
      --g5-2-y-position: 13.671875%;
      --g5-3-x-position: 2.8906249999999996%;
      --g5-3-y-position: 46.1328125%;
    }
  }

  * {
    outline: 1px solid red;
    outline-offset: -1px;
  }
</style>
