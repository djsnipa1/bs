<script>
  import {
    isPlayerReady,
    // isUrlOpen,
    isVideoPaused,
    isVideoPlaying,
    // menuOpen,
    playerStore
    // videoId
  } from '$lib/stores/store.js';
  import anime from 'animejs';
  import { onMount } from 'svelte';

  let displayPlayBtn = false;
  let playButtonHover = false;

  let circle1,
    circle2,
    circle3,
    mainCircle,
    circleTest,
    circleMask,
    playButton,
    powerButton,
    fbButton,
    ffButton,
    revButton,
    fwdButton,
    backButton,
    stopButton,
    playButtonSvg;

  // let classes = [
  //   'hover:scale-[120%]',
  //   'hover:transition-all',
  //   'hover:duration-300'
  // ];

  const buttonDuration = 300;
  const buttonScale = [0, 1];
  const buttonOffset = -150;
  const buttonOpacity = {
    value: [0, 1],
    duration: 1
  };

  const buttonAnim = (targets, opts) => ({
    targets,
    scale: buttonScale,
    opacity: buttonOpacity,
    duration: buttonDuration,
    endDelay: buttonOffset,
    ...opts
  });

  const circlesScaling = (targets, opts) => ({
    targets,
    opacity: [
      { value: 1, duration: 1 },
      { value: 1, duration: 250 },
      { value: 0, duration: 700 }
    ],
    scale: { value: 2.5, duration: 1000 },
    ...opts
  });

  function pressPowerInit() {
    anime
      .timeline({
        easing: 'easeOutExpo',
        autoplay: true,
        loop: false,
        begin: function () {
          console.log('begin');
        },
        complete: function () {
          console.log('complete');
          //playButtonHover = true;
          //playButton.classList.add(...classes);
          displayPlayBtn = true;
        }
      })
      .add(
        {
          targets: circleTest,
          scale: [{ value: [0, 1], duration: 700 }]
        },
        2
      )
      .add(
        {
          targets: powerButton,
          scale: [
            { value: [1, 1.75], duration: 150, easing: 'easeOutQuad' },
            { value: [1.75, 0], duration: 300, easing: 'easeOutExpo' }
          ],
          complete: () => {
            displayPlayBtn = true;
          }
        },
        1
      )

      .add(
        {
          targets: playButton,
          scale: [0, 1],
          duration: 400,
          easing: 'easeOutBack'
        },
        1 //changed from 400
      )

      .add(circlesScaling(circle1, { borderWidth: '10px' }), '-=600')
      .add(circlesScaling(circle2), '-=600')
      .add(circlesScaling(circle3), '-=800')
      .add(buttonAnim(fbButton), '-=600')
      .add(buttonAnim(ffButton), '-=500')
      .add(buttonAnim(revButton), '-=400')
      .add(buttonAnim(fwdButton), '-=300')
      .add(buttonAnim(backButton), '-=200')
      .add(buttonAnim(stopButton), '-=100');
  }

  // SkipButton
  let player;

  playerStore.subscribe((value) => {
    player = value;
  });

  function skipForward10Seconds() {
    if (player) {
      var currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10);
    }
  }

  function skipBackward10Seconds() {
    if (player) {
      var currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10);
    }
  }

  /*
  function setFwdPlayBackRate() {
    if (player) {
      player.setPlaybackRate(1.5);
    }
  }
 */

  function setFwdPlayBackRate() {
    if (player) {
      console.log(player.getPlaybackRate());
      var pbr = player.getPlaybackRate();

      if (pbr === 0.5) {
        player.setPlaybackRate(1);
      } else if (pbr === 1) {
        player.setPlaybackRate(1.25);
      } else if (pbr === 1.25) {
        player.setPlaybackRate(1.5);
      } else if (pbr === 1.5) {
        player.setPlaybackRate(2);
      }
    }
  }

  function setBackPlayBackRate() {
    if (player) {
      console.log(player.getPlaybackRate());
      //player.setPlaybackRate(1);
      var pbr = player.getPlaybackRate();

      if (pbr === 2) {
        player.setPlaybackRate(1.5);
      } else if (pbr === 1.5) {
        player.setPlaybackRate(1.25);
      } else if (pbr === 1.25) {
        player.setPlaybackRate(1);
      } else if (pbr === 1) {
        player.setPlaybackRate(0.5);
      }
    }
  }

  function restartVideo() {
    if (player) {
      player.seekTo(0);
      player.playVideo();
    }
  }

  function stopVideo() {
    if (player) {
      player.stopVideo();
    }
  }
  function shrinkIntro() {
    /*
    anime.timeline({
      easing: 'easeOutExpo',
      autoplay: false,
      loop: true,
    })
      .add({
        targets: mainCircle,
        scale: [
          { value: [1, 0], duration: 1},
          { value: [0, 1], duration: 400}]
      })
    .add({
      targets: powerButton,
      scale: [1, 0.5]
    })
    */
  }
  /*
  function newAnim() {
    anime.timeline({
  easing: 'easeOutExpo',
  autoplay: true,
  loop: true,
})
  .add({
    targets: mainCircle,
    scale: [0, 1],
    duration: 700,
    transformOrigin: 'center center'
  })

    .add(circlesScaling(circle1, { borderWidth: '10px' }), '-=500')
    .add(circlesScaling(circle2), '-=800')
    .add(circlesScaling(circle3), '-=1000')
  }
*/

  onMount(shrinkIntro);

  const scaleCircle = (targets, opts) => ({
    targets,
    scale: 4,
    ...opts
  });
  const opacityCircle = (targets, opts) => ({
    targets,
    opacity: 1,
    ...opts
  });
  const killOpacity = (targets, opts) => ({
    targets,
    opacity: 0,
    duration: 1000,
    ...opts
  });
  const visible = (targets, opts) => ({
    targets,
    opacity: [0, 1],
    duration: 1,
    ...opts
  });

  let isComplete = 0;
  //   function setup() {
  //     anime
  //       .timeline({
  //         easing: 'easeOutExpo',
  //         autoplay: true,
  //         loop: true,
  //         loopBegin: function (anim) {
  //           console.log('loopBegin');
  //         },
  //         loopComplete: function (anim) {
  //           isComplete++;
  //           console.log(isComplete);
  //         }
  //       })
  //       .add({
  //         targets: mainCircle,
  //         scale: [0, 1],
  //         duration: 700,
  //         transformOrigin: 'center center'
  //       })
  //       .add(visible(circle1), '-=500')
  //       .add(scaleCircle(circle1, { duration: 1000 }), '-=500')
  //       .add(opacityCircle(circle1, { duration: 700 }), 1000)
  //       .add(killOpacity(circle1), '-=900')
  //       .add(visible(circle2), 900)
  //       .add(scaleCircle(circle2, { duration: 1200 }), 900)
  //       .add(opacityCircle(circle2, { duration: 700 }), 1000)
  //       .add(killOpacity(circle2), '-=900')
  //       .add(visible(circle3), 1000)
  //       .add(scaleCircle(circle3, { scale: 3, duration: 1200 }), 1000)
  //       .add(opacityCircle(circle3, { duration: 700 }), 1200)
  //       .add(killOpacity(circle3), '-=400');
  //     /*    .add(
  //         {
  //           targets: div3,
  //           scale: 8,
  //           borderWidth: 5,
  //           duration: 4000,
  //           opacity: 100
  //         },
  //         0
  //       );
  // */
  //   }
  // setup.finished.then(() => {
  //   console.log('setup finished');
  //   buttonAnimation()
  // })
</script>

<!-- Original Div Content 
<div class="relative mx-auto grid h-[150px] top-[50%] w-[150px] grid-cols-7 grid-rows-3 items-center justify-items-center gap-4 rounded-full border border-black">
   

  
    <div class="absolute inset-0 z-10 opacity-50 border bg-green-500" id="hiddenDiv1"></div>
    <div class="absolute inset-0 z-20 opacity-50 bg-blue-500/50" id="hiddenDiv2"></div>

</div>
-->
<div class={$isPlayerReady ? 'opacity-100' : 'opacity-0'}>
  <div
    class="relative mx-auto grid h-[150px] w-[150px] grid-cols-7 grid-rows-3 items-center justify-items-center gap-4 rounded-full bg-opacity-0"
    bind:this={mainCircle}
  >
    <div
      class="glass absolute h-[150px] w-[150px] scale-0 rounded-full border-8 border-red-500 p-4 text-white opacity-100"
      bind:this={circleTest}
    ></div>
    <div
      class="absolute h-[150px] w-[150px] rounded-full border-4 border-white p-4 text-white opacity-0"
      bind:this={circle1}
    ></div>
    <div
      class="absolute h-[150px] w-[150px] rounded-full border-4 border-white p-4 text-white opacity-0"
      bind:this={circle2}
    ></div>
    <div
      class="absolute h-[150px] w-[150px] rounded-full border-4 border-white p-4 text-white opacity-0"
      bind:this={circle3}
    ></div>
    <div
      class="absolute h-[150px] w-[150px] rounded-full border-4 border-white p-4 text-white opacity-0"
      bind:this={circleMask}
    ></div>

    <button
      class="buttonClass group pointer-events-auto col-span-2 col-start-2"
      bind:this={fbButton}
      on:click={skipBackward10Seconds}
    >
      <span class="spanClass">FB</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="svgClass"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M2.75 2.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 0-1.5H4.343C5.4 6.602 6.77 5.465 8.472 4.938a9.7 9.7 0 0 1 6.266.165c2.03.755 3.91 2.285 4.854 4.008a.75.75 0 0 0 1.316-.721c-1.143-2.083-3.33-3.831-5.647-4.693a11.2 11.2 0 0 0-7.233-.192C6.15 4.087 4.653 5.262 3.5 6.65v-3.4a.75.75 0 0 0-.75-.75m6.203 8.528a.75.75 0 0 1 .547.722v8.5a.75.75 0 0 1-1.5 0v-6.417c-.382.369-.84.746-1.364 1.06a.75.75 0 1 1-.772-1.286c.676-.405 1.24-.965 1.643-1.44a8 8 0 0 0 .597-.798l.006-.009v-.001a.75.75 0 0 1 .843-.331m4.246 1.601c.554-.991 1.483-1.629 2.803-1.629s2.25.638 2.803 1.629c.522.933.697 2.147.697 3.371s-.175 2.438-.697 3.371c-.554.991-1.483 1.629-2.803 1.629s-2.25-.638-2.803-1.629c-.522-.933-.697-2.147-.697-3.371s.175-2.438.697-3.371m1.31.732c-.339.604-.507 1.516-.507 2.639s.168 2.035.506 2.64c.306.546.751.86 1.494.86s1.188-.314 1.494-.86c.338-.605.506-1.517.506-2.64s-.168-2.035-.506-2.64c-.306-.546-.751-.86-1.494-.86s-1.188.314-1.494.86"
        />
      </svg>
    </button>
    <button
      class="buttonClass group pointer-events-auto col-span-2 col-start-5"
      bind:this={ffButton}
      on:click={skipForward10Seconds}
    >
      <span class="spanClass">FF</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="svgClass"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21.25 2.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h3.907C18.6 6.602 17.23 5.465 15.528 4.938a9.7 9.7 0 0 0-6.266.165c-2.03.755-3.91 2.285-4.854 4.008a.75.75 0 1 1-1.315-.721c1.142-2.083 3.33-3.831 5.646-4.693a11.2 11.2 0 0 1 7.233-.192c1.878.582 3.374 1.757 4.528 3.144V3.25a.75.75 0 0 1 .75-.75M16.002 11c-1.32 0-2.25.638-2.803 1.629c-.522.933-.697 2.147-.697 3.371s.175 2.438.697 3.371c.553.991 1.483 1.629 2.803 1.629s2.25-.638 2.803-1.629c.521-.933.697-2.147.697-3.371s-.175-2.438-.697-3.371C18.251 11.638 17.322 11 16.002 11m-2 5c0-1.123.168-2.035.506-2.64c.306-.546.751-.86 1.494-.86s1.188.314 1.494.86c.337.605.506 1.517.506 2.64s-.169 2.035-.506 2.64c-.306.546-.751.86-1.494.86s-1.188-.314-1.494-.86c-.338-.605-.506-1.517-.506-2.64M9.5 11.75a.75.75 0 0 0-1.39-.391v.001l-.006.009a3 3 0 0 1-.141.21a8 8 0 0 1-.457.589c-.402.474-.966 1.034-1.642 1.439a.75.75 0 1 0 .772 1.286A7.7 7.7 0 0 0 8 13.833v6.417a.75.75 0 0 0 1.5 0z"
        />
      </svg>
    </button>
    <button
      class="buttonClass group pointer-events-auto col-span-2 row-start-2"
      bind:this={revButton}
      on:click={setBackPlayBackRate}
    >
      <span class="spanClass">REV</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="svgClass mr-1"
        viewBox="0 0 24 24"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
          />
          <path
            fill="currentColor"
            d="M19.788 5.627c.777-.359 1.68.204 1.783 1.114l.027.25l.062.653l.065.845l.044.751l.026.554l.02.593l.016.631l.008.667v.683l-.008.647l-.023.907l-.022.56l-.04.767l-.062.88l-.062.705l-.054.517c-.1.866-.943 1.372-1.714 1.018l-.608-.29l-.315-.157l-.545-.28l-.408-.218l-.442-.242l-.474-.267l-.503-.292l-.532-.318l-.558-.344l-.69-.439l-.635-.42l-.58-.397l-.525-.37l-.24-.174l-.04.86l-.049.755l-.067.835l-.062.62l-.013.12c-.1.866-.943 1.372-1.714 1.018l-.608-.29l-.315-.157l-.545-.28l-.408-.218l-.442-.242l-.722-.41l-.518-.305a47.459 47.459 0 0 1-.27-.162l-.557-.344l-.58-.368l-.275-.179l-.523-.348l-.485-.331l-.446-.314l-.594-.43l-.344-.258l-.562-.435l-.308-.247c-.67-.546-.686-1.592-.042-2.117l.432-.345l.607-.465l.367-.271l.407-.294l.684-.479l.503-.34l.54-.353l.575-.366l.573-.353l.277-.166l.533-.313l.503-.286l.47-.26l.436-.234l.757-.39l.589-.287l.225-.105c.777-.359 1.68.204 1.783 1.114l.045.427l.051.558l.052.68l.048.797l.028.592l.492-.353c.173-.123.356-.25.547-.38l.599-.403a46.8 46.8 0 0 1 .992-.638l.573-.353l.277-.166l.533-.313l.503-.286l.47-.26l.436-.234l.757-.39l.589-.287z"
          />
        </g>
      </svg>
    </button>
    <!-- {#if $isVideoPlaying === null} -->
    {#if !displayPlayBtn}
      <button
        class="buttonClass group pointer-events-auto col-span-3 col-start-3 row-start-2 !h-14 !w-14 !opacity-100"
        on:click={() => {
          pressPowerInit();
        }}
        bind:this={powerButton}
      >
        <span class="spanClass">POWER</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="svgClass !h-10 !w-10 !opacity-100"
          viewBox="0 0 36 36"
          ><path
            fill="currentColor"
            d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m.06 17.68a1.28 1.28 0 0 1-1.29-1.28V8.65a1.29 1.29 0 0 1 2.58 0v9.75a1.28 1.28 0 0 1-1.29 1.28M18 27.79a9.88 9.88 0 0 1-5.83-17.94a1.4 1.4 0 0 1 1.94.31a1.37 1.37 0 0 1-.31 1.92a7.18 7.18 0 1 0 11.43 5.8a7.07 7.07 0 0 0-3-5.76A1.37 1.37 0 0 1 22 10.2a1.4 1.4 0 0 1 1.94-.29A9.88 9.88 0 0 1 18 27.79"
            class="clr-i-solid clr-i-solid-path-1"
          /><path fill="none" d="M0 0h36v36H0z" /></svg
        >
      </button>
    {:else if displayPlayBtn}
      {#if !$isVideoPlaying}
        <button
          class="buttonClass group pointer-events-auto col-span-3 col-start-3 row-start-2 !h-14 !w-14 !opacity-100"
          on:click={() => {
            isVideoPlaying.set(true);
            //   if ($isVideoPlaying === null) {
            //    isVideoPlaying.set(true)
            //  }
          }}
          bind:this={playButton}
        >
          <span class="spanClass">PLAY</span>
          <svg
            bind:this={playButtonSvg}
            class="{playButtonHover
              ? 'playButtonSvg'
              : 'playButtonSvgNoHover'} !h-10 !w-10 !opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="none" fill-rule="evenodd">
              <path
                d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 00-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
              />
              <path
                fill="currentColor"
                d="M5.669 4.76a1.469 1.469 0 0 1 2.04-1.177c1.062.454 3.442 1.533 6.462 3.276c3.021 1.744 5.146 3.267 6.069 3.958c.788.591.79 1.763.001 2.356c-.914.687-3.013 2.19-6.07 3.956c-3.06 1.766-5.412 2.832-6.464 3.28c-.906.387-1.92-.2-2.038-1.177c-.138-1.142-.396-3.735-.396-7.237c0-3.5.257-6.092.396-7.235"
              />
            </g>
          </svg>
        </button>
      {:else if $isVideoPlaying}
        <button
          class="buttonClass group pointer-events-auto col-span-3 col-start-3 row-start-2 !h-14 !w-14 !opacity-100"
          on:click={() => {
            isVideoPaused.set(true);
          }}
        >
          <span class="spanClass !h-12 !w-12">PAUSE</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svgClass"
            viewBox="0 0 24 24"
            ><g fill="none"
              ><path
                d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
              /><path
                fill="currentColor"
                d="M9 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
              /></g
            ></svg
          >
        </button>
      {/if}
    {/if}

    <button
      <button
      class="buttonClass group pointer-events-auto col-span-2 col-start-6 row-start-2"
      bind:this={fwdButton}
      on:click={setFwdPlayBackRate}
    >
      <span class="spanClass">FWD</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="svgClass ml-1"
        viewBox="0 0 24 24"
        ><g fill="none" fill-rule="evenodd"
          ><path
            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
          /><path
            fill="currentColor"
            d="m13.212 5.627l.356.168l.458.224l.553.283l.417.22l.693.38l.503.287l.533.313l.56.34c.096.058.192.118.29.179l.575.366l.54.353l.503.34l.466.324l.625.449l.367.27l.607.466l.432.345c.644.525.627 1.57-.043 2.117l-.307.247l-.562.435l-.73.54l-.426.302l-.465.323l-.505.34a47.21 47.21 0 0 1-.266.176l-.56.362l-.295.185l-.558.344l-.532.318l-.503.292l-.474.267l-.442.242l-.599.317l-.354.181l-.712.348l-.21.099c-.772.354-1.616-.152-1.715-1.018l-.075-.74l-.068-.834l-.032-.492l-.03-.54l-.026-.583l-.496.355l-.269.189l-.58.396l-.636.42l-.689.44l-.558.343l-.787.467l-.722.41l-.442.242l-.599.317l-.354.181l-.712.348l-.21.099c-.772.354-1.616-.152-1.715-1.018l-.054-.517l-.062-.705l-.061-.88l-.04-.768l-.023-.56l-.023-.906l-.008-.647v-.683l.008-.667l.015-.631l.034-.875l.042-.783l.064-.891l.048-.546l.044-.433l.013-.118c.103-.91 1.006-1.473 1.783-1.114l.356.168l.458.224l.553.283l.417.22l.454.247l.487.274l.255.146l.533.313l.56.34a46.884 46.884 0 0 1 1.588 1.021l.574.392l.52.368l.24.173l.027-.592l.03-.544l.052-.72l.068-.772l.045-.427c.103-.91 1.006-1.473 1.783-1.114"
          /></g
        ></svg
      >
    </button>
    <button
      class="buttonClass group pointer-events-auto col-span-2 col-start-2 row-start-3"
      bind:this={backButton}
      on:click={restartVideo}
    >
      <span class="spanClass">BACK</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="svgClass"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M7 6a1 1 0 0 1 2 0v4l6.4-4.8A1 1 0 0 1 17 6v12a1 1 0 0 1-1.6.8L9 14v4a1 1 0 1 1-2 0z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
    <button
      class="buttonClass group pointer-events-auto col-span-2 col-start-5 row-start-3"
      bind:this={stopButton}
      on:click={stopVideo}
    >
      <span class="spanClass">STOP</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="svgClass"
        viewBox="0 0 24 24"
        ><g fill="none" fill-rule="evenodd"
          ><path
            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
          /><path
            fill="currentColor"
            d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
          /></g
        ></svg
      >
    </button>
  </div>
</div>

<style>
  .buttonClass {
    @apply glass-button relative flex h-10 w-10 transform-gpu flex-col items-center justify-center rounded-full border border-white/40 p-2 text-slate-700 opacity-0 shadow-sm transition transition-all duration-300 hover:scale-[120%] hover:text-slate-800 hover:transition-all hover:duration-300;
  }

  .spanClass {
    @apply absolute z-10 w-full transform-gpu text-center font-sofiasans text-base font-normal text-slate-100 opacity-0 transition-all duration-300 group-hover:scale-[65%] group-hover:opacity-100 group-hover:transition-all group-hover:duration-300;
  }

  .svgClass {
    @apply absolute z-0 h-6 w-6 text-white/50 opacity-100 transition-all hover:text-[oklch(86%_0.367_92)] group-hover:scale-110 group-hover:text-amber-400 group-active:scale-100 group-active:text-amber-400;
  }

  /* .playButtonHover { */
  /*   @apply glass-button relative flex h-10 w-10 transform-gpu flex-col items-center justify-center rounded-full border border-white/40 p-2 text-slate-700 opacity-0 shadow-sm transition transition-all duration-300 hover:scale-[120%] hover:text-slate-800 hover:transition-all hover:duration-300; */
  /* } */

  /* .playButtonNoHover { */
  /*   @apply glass-button relative flex h-10 w-10 transform-gpu flex-col items-center justify-center rounded-full border border-white/40 p-2 text-slate-700 opacity-0 shadow-sm; */
  /* } */

  .playButtonSvg {
    @apply absolute z-0 h-6 w-6 text-white/50 opacity-100 transition-all hover:text-[oklch(86%_0.367_92)] group-hover:scale-110 group-hover:text-amber-400 group-active:scale-100 group-active:text-amber-400;
  }

  .playButtonSvgNoHover {
    @apply absolute z-0 h-6 w-6 text-white/50 opacity-100;
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

  .glass-button {
    /* display: inline-block; */
    /* border: 0; */
    text-decoration: none;
    /* border-radius: 15px; */
    /*background-color: rgba(255, 255, 255, 0.1);*/
    /*border: 1px solid rgba(255, 255, 255, 0.1); */
    backdrop-filter: blur(30px);
    color: rgba(255, 255, 255, 0.8);
    /* font-size: 14px; */
    /* letter-spacing: 2px; */
    cursor: pointer;
    /*
* Created with https://www.css-gradient.com
* Gradient link: https://www.css-gradient.com/?c1=a9a9a9&c2=515151&gt=r&gd=dtt

background: rgba(169, 169, 169, 1.0); */
    background: radial-gradient(
      at center top,
      rgba(169, 169, 169, 0.4),
      rgba(81, 81, 81, 0.4)
    );
    /* text-transform: uppercase; */
  }
  /*
  .glass-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  */
</style>
