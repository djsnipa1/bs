<script>
  import { onMount } from 'svelte';
  import {
    cssPosition,
    isVideoPlaying,
    isVideoPaused,
    playerStore,
    isPlayerReady,
    videoId,
    isVideoLoaded
  } from '$lib/stores/store.js';

  export let player;
  export let initialVideoId = '9B1SQX9a_hU';

  const ytPlayerId = 'youtube-player';

  $: if ($videoId !== '9B1SQX9a_hU') {
    initialVideoId = $videoId;
  }

  onMount(() => {
    function load() {
      player = new YT.Player(ytPlayerId, {
        height: '100%',
        width: '100%',
        videoId: initialVideoId,
        playerVars: {
          autoplay: 0,
          fs: 0,
          enablejsapi: 1,
          iv_load_policy: 3,
          playsinline: 1,
          disablekb: 1,
          controls: 0,
          rel: 0
        },
        events: {
          onStateChange: onPlayerStateChange,
          onReady: onPlayerReady
        }
      });
    }

    if (window.YT) {
      load();
    } else {
      window.onYouTubeIframeAPIReady = load;
    }

    function onPlayerReady(event) {
      playerStore.set(player);
      isPlayerReady.set(true);
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.CUED) {
        console.log('Video is loaded');
        isVideoLoaded.set(true);
      } else if (event.data == YT.PlayerState.PAUSED) {
        console.log('The video is paused.');
        isVideoPaused.set(true);
        isVideoPlaying.set(false);
      } else if (event.data == YT.PlayerState.PLAYING) {
        console.log('The video is playing.');
        isVideoPlaying.set(true);
        isVideoPaused.set(false);
      }
    }
  });
</script>

<svelte:head>
  <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<div class="video-background container flex items-center justify-center">
  <div class="video-foreground" style="--translate: {$cssPosition}%;">
    <div class="iframe" id={ytPlayerId} />
  </div>
</div>

<style>
  /* :root { 
    --translate: 33%;
  } */
  .new-wrapper {
    position: absolute;
    /* object-fit: cover;
    object-position: 60% 50%; */
    transform: translateX(-50%);
  }
  * {
    box-sizing: border-box;
  }
  .video-background {
    background: #000;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -99;
  }
  .video-foreground {
    transform: translateX(var(--translate));
  }
  .video-foreground,
  .video-background .iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* pointer-events: none; */
    object-fit: cover;
    /* Adjust object-position based on which part of the video you want to show */
    object-position: 60% 50%;
  }
  @media (min-aspect-ratio: 16/9) {
    .video-foreground {
      height: 300%;
      top: -100%;
    }
  }
  @media (max-aspect-ratio: 16/9) {
    .video-foreground {
      width: 300%;
      left: -100%;
    }
  }
  @media all and (max-width: 600px) {
    .vid-info {
      width: 50%;
      padding: 0.5rem;
    }
    .vid-info h1 {
      margin-bottom: 0.2rem;
    }
  }
</style>
