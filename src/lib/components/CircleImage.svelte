<script>
  import anime from 'animejs';
  import { onMount } from 'svelte';
  import {
    showYoutubeTransition,
    videoId,
    newYtUrl,
    globalVars
  } from '$lib/stores/store.js';

  let thumbnailUrl, tl;
  let loopAnimation = false;

  onMount(() => {
    thumbnailUrl = `https://img.youtube.com/vi/${$videoId}/hqdefault.jpg`;

    // parent div to attach the following elements to
    const parentDiv = document.querySelector('#parentDiv');

    // Create 5 circle divs
    // Probably won't use this many though
    for (let i = 1; i <= 5; i++) {
      const circleDiv = document.createElement('div');
      circleDiv.className =
        'absolute rounded-full object-cover aspect-square h-[125px] border border-white opacity-0';
      circleDiv.id = `circle${i}`;

      parentDiv.appendChild(circleDiv);
    }

    const gradientCircle = document.createElement('div');

    gradientCircle.className =
      'absolute rounded-full object-cover aspect-square h-[100px] radial-gradient opacity-0';
    gradientCircle.id = `gradientCircle`;
    parentDiv.appendChild(gradientCircle);

    // a custom easing function
    function easeInCirc(x) {
      return 1 - Math.sqrt(1 - Math.pow(x, 2));
    }

    if ($globalVars.showCircleAnimationControls) {
      // Get the scrubber elements
      const scrubber = document.getElementById('scrubber');
      const playBtn = document.getElementById('playBtn');
      const pauseBtn = document.getElementById('pauseBtn');
      const restartBtn = document.getElementById('restartBtn');
    }

    const circlesScaling = (targets, opts) => ({
      targets,
      opacity: [
        { value: [0, 1], duration: 100 },
        { value: 1, duration: 700 },
        { value: [1, 0], duration: 200 }
      ],
      scale: {
        value: [0.5, 6],
        delay: -150
      },
      easing: 'easeOutQuad',
      duration: 1000,
      ...opts
    });

    tl = anime.timeline({
      loop: loopAnimation,
      autoplay: true,
      easing: 'easeInExpo',
      // Update the scrubber position when the timeline plays
      update: function (anim) {
        const progress = anim.progress / 100;
        if ($globalVars.showCircleAnimationControls) {
          scrubber.value = tl.progress.toFixed(0);
        }
      }
    });

    let whiteHotAnim = anime.timeline({
      loop: false,
      autoplay: false,
      easing: 'easeInExpo'
    });

    let whiteBlurAnim = anime.timeline({
      loop: false,
      autoplay: false,
      easing: 'easeInExpo'
    });

    let fadeAway = anime.timeline({
      loop: false,
      autoplay: false,
      easing: 'easeInExpo'
    });

    fadeAway.add({
      targets: '#thumbnail',
      scale: [1, 0.4],
      opacity: [1, 0],
      duration: 600
    });

    tl.add({
      targets: '#thumbnail',
      duration: 600,
      scaleY: {
        value: ['40%', '100%']
      },
      scaleX: {
        value: ['90%', '100%']
      },
      //  rotateZ: 20,
      translateY: ['250px', '0px'],
      opacity: {
        value: [0, 1],
        duration: 1
      },
      easing: 'easeOutQuad'
    });

    tl.add({
      targets: '#thumbnail',
      rotateY: [0, 30],
      rotateZ: 0,
      duration: 400,
      easing: 'easeInOutQuad'
    });
    tl.add({
      targets: '#thumbnail',
      rotateY: [30, -360 * 5],
      rotateZ: 0,
      scale: [
        {
          value: 1,
          duration: 450
        },
        {
          value: [1, 0.7],
          duration: 1000
        },
        {
          value: 1,
          duration: 150
        }
      ],
      scaleX: [
        { value: [1, 1], duration: 1350, easing: 'linear' },
        { value: 0.3, duration: 100, easing: 'linear' },
        { value: [0.3, 1], duration: 50, easing: 'linear' }
      ],
      scaleY: [
        { value: [1, 1], duration: 1450, easing: 'linear' },
        { value: 1.3, duration: 100, easing: 'linear' },
        { value: [1.3, 1], duration: 50, easing: 'linear' }
      ],
      duration: 1600,
      easing: 'easeInQuad',
      loop: false,
      update: function (anim) {
        const progress = anim.progress / 100; // Normalize progress to range from 0 to 1
        let blurValue = 0;

        if (progress >= 0.25) {
          const adjustedProgress = (progress - 0.25) / 0.75; // Adjust progress to range from 0 to 1 between 25% and 100%
          blurValue = easeInCirc(adjustedProgress) * 5; // Adjust the intensity as needed
          if (progress === 1) {
            blurValue = 0;
          }
        }
        // console.log(blurValue);
        thumbnail.style.filter = `blur(${blurValue}px)`;
      },
      complete: function () {
        whiteHotAnim.play();
        whiteBlurAnim.play();
      }
    });

    tl.add(
      {
        targets: '#blurOnlyDiv',
        opacity: [
          { value: [0, 0], duration: 600 },
          { value: [0, 0.5], duration: 100 },
          { value: [0.5, 0.5], duration: 800 },
          { value: [0.5, 0], duration: 100 }
        ],
        scale: [
          {
            value: 1,
            duration: 450
          },
          {
            value: [1, 0.7],
            duration: 1000
          },
          {
            value: 1,
            duration: 150
          }
        ],
        scaleX: [
          { value: [1, 1], duration: 1350, easing: 'linear' },
          { value: 0.3, duration: 100, easing: 'linear' },
          { value: [0.3, 1], duration: 50, easing: 'linear' }
        ],
        scaleY: [
          { value: [1, 1], duration: 1450, easing: 'linear' },
          -{ value: 1.3, duration: 100, easing: 'linear' },
          { value: [1.3, 1], duration: 50, easing: 'linear' }
        ],
        duration: 1600,
        easing: 'easeInQuad',
        loop: false
      },
      '-=1599'
    );

    tl.add({
      targets: '#circle1',
      opacity: [
        { value: [0, 1], duration: 1 },
        { value: 1 },
        { value: [1, 0], duration: 1000 }
      ],
      borderColor: 'rgb(200, 160, 255)',
      scale: {
        value: [0, 4],
        delay: -150
      },
      borderWidth: 4,
      easing: 'easeOutQuad',
      duration: 1050,
      complete: function () {
        fadeAway.play();
      }
    });

    whiteHotAnim.add({
      targets: '#whiteHot',
      opacity: [
        { value: [0, 0.7], duration: 50 },
        { value: [0.7, 0.7], duration: 100 },
        { value: [0.7, 0], duration: 150 }
      ],
      scale: {
        value: [3, 3.5],
        delay: -150
      },
      easing: 'easeOutQuad',
      duration: 300
    });

    whiteBlurAnim.add({
      targets: '#whiteBlur',
      opacity: [
        { value: [0, 0.8], duration: 50 },
        { value: [0.8, 0.8], duration: 50 },
        { value: [0.8, 0], duration: 100 }
      ],
      scale: {
        value: [3, 2],
        delay: -150
      },
      easing: 'easeOutQuad',
      duration: 200
      //  begin: function() { whiteBlurAnim.pause()}
    });

    tl.add(circlesScaling('#circle4'), '-=1100');

    // testing a for loop with dynamic divs
    /*
    for (let i = 2; i <= 5; i++) {
      tl.add(circlesScaling(`#circle${i}`))
    }
   */
    tl.add(
      circlesScaling('#reverseGradient', {
        duration: 1000,
        opacity: [0, 0.5, 0],
        scale: {
          value: [0.5, 4]
          //delay: -150
        }
      }),
      '-=2200'
    );
    tl.add(
      circlesScaling('#gradientCircle', {
        duration: 1000
      }),
      '-=2050'
    );
    tl.add(
      circlesScaling('#circle2', {
        duration: 1000,
        complete: function () {
          showYoutubeTransition.set(true);
        }
      }),
      '-=1550'
    );
    tl.add(circlesScaling('#circle3'), '-=1250');

    /* 
    for (let i = 1; i <= 5; i++) {
      tl.add(circlesScaling(`#circle${i}`))
    }
    */

    if ($globalVars.showCircleAnimationControls) {
      // Update the timeline progress when the scrubber value changes
      scrubber.addEventListener('input', function () {
        tl.seek(tl.duration * (scrubber.value / 100));
      });

      // Play button
      playBtn.addEventListener('click', function () {
        tl.play();
      });

      // Pause button
      pauseBtn.addEventListener('click', function () {
        tl.pause();
      });

      // Restart button
      restartBtn.addEventListener('click', function () {
        tl.restart();
      });
    }

    function startAnimations() {
      console.log('startAnimations');
      //setTimeout(animmm, 5)
      tl.play();
    }

    //setTimeout(startAnimations, 3000)
    startAnimations();
  });
</script>

<div
  id="parentDiv"
  class="relative flex h-64 w-full items-center justify-center border border-gray-200"
>
  <div
    class="absolute z-[5] aspect-square h-[125px] scale-[3] rounded-full object-cover opacity-0"
    id="whiteHot"
  ></div>
  <div
    class="absolute z-[20] aspect-square h-[125px] scale-[5] rounded-full object-cover opacity-0"
    id="whiteBlur"
  ></div>

  <div
    class="absolute z-[15] aspect-square h-[125px] scale-[3] rounded-full object-cover opacity-0"
    id="reverseGradient"
  ></div>

  <div
    class="absolute z-[3] size-[125px] overflow-hidden rounded-full border-2 border-white opacity-0"
    style="--backgroundImage: url({thumbnailUrl})"
    id="blurOnlyDiv"
  >
    <!--
    <img
      src={thumbnailUrl}
      alt="youtube_thumbnail"
      class="h-full w-full scale-[1.35] transform object-cover opacity-100"
    />
    -->
  </div>

  <div
    class="absolute z-[1] size-[125px] overflow-hidden rounded-full border-2 border-white"
    style="--backgroundImage: url({thumbnailUrl})"
    id="thumbnail"
  >
    <!--
    <img
      src={thumbnailUrl}
      alt="youtube_thumbnail"
      class="h-full w-full relative z-[2] scale-[1.35] transform object-cover opacity-100"
    />
    -->
  </div>
</div>

{#if $globalVars.showCircleAnimationControls}
  <div class="container border-2 border-teal-500">
    <input
      type="range"
      id="scrubber"
      min="0"
      max="100"
      value="0"
      class="styled-slider w-full"
    />

    <div
      id="controls"
      class="mx-auto flex w-3/4 items-center justify-center space-x-4"
    >
      <div class="flex-1">
        <button
          id="playBtn"
          class="group relative inline-block w-full overflow-hidden rounded bg-purple-50 px-5 py-2.5 font-medium text-purple-600"
        >
          <span
            class="absolute left-0 top-0 mb-0 flex h-0 w-full translate-y-0 transform bg-purple-600 opacity-90 transition-all duration-200 ease-out group-hover:h-full"
          ></span>
          <span class="relative group-hover:text-white">Play</span>
        </button>
      </div>

      <div class="flex-1">
        <button
          id="pauseBtn"
          class="group relative inline-block w-full overflow-hidden rounded bg-purple-50 px-5 py-2.5 font-medium text-purple-600"
        >
          <span
            class="absolute left-0 top-0 mb-0 flex h-0 w-full translate-y-0 transform bg-purple-600 opacity-90 transition-all duration-200 ease-out group-hover:h-full"
          ></span>
          <span class="relative group-hover:text-white">Pause</span>
        </button>
      </div>

      <div class="flex-1">
        <button
          id="restartBtn"
          class="group relative inline-block w-full overflow-hidden rounded bg-purple-50 px-5 py-2.5 font-medium text-purple-600"
        >
          <span
            class="absolute left-0 top-0 mb-0 flex h-0 w-full translate-y-0 transform bg-purple-600 opacity-90 transition-all duration-200 ease-out group-hover:h-full"
          ></span>
          <span class="relative group-hover:text-white">Restart</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  bodyDiv {
    font-size: 15pt;
    background: rgb(63, 204, 251);
    background: radial-gradient(
      circle,
      rgba(63, 204, 251, 1) 0%,
      rgba(70, 90, 252, 1) 100%
    );
  }

  #clipMask {
    clip-path: inset(1px);
  }
  canvas {
    width: 100%;
    height: 100%;
  }
  #parentDiv {
    position: relative;
    width: 100%;
    height: 60vh;
  }
  #canvas-basic {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .circle-mask {
    clip-path: circle(30%);
  }

  /* mask-image: radial-gradient(circle at center, black 0% 30%, transparent calc(50% - 5px), transparent 100%);
  */

  #thumbnail {
    filter: blur(0);
    transform-origin: 50% 50%;
    transform-box: border-box;
    object-fit: cover;
    box-shadow: inset 0 0px 1px 1px rgba(0, 0, 0, 0.5);
    background-image: var(--backgroundImage);
    background-size: 200%;
    background-position: center;
    /*transition: filter 1s;*/
  }

  .radial-gradient {
    background: radial-gradient(circle, transparent 40%, 70%, white);
  }

  #blurOnlyDiv {
    filter: blur(3px);
  }

  #whiteHot {
    background: radial-gradient(
      circle,
      white 20%,
      transparent 60%,
      transparent
    );
  }

  #whiteBlur {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.75) 30%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 70%,
      transparent
    );
    background-blend-mode: color-dodge;
  }

  #reverseGradient {
    /* background: #31C77300; 
background: radial-gradient(circle at center center, #31C77300 0%, #00000000 50%, #1F429B 68%, #1F429B 100%); */
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 19%,
      rgba(255, 255, 255, 1) 34%,
      rgba(255, 255, 255, 1) 66%,
      rgba(255, 255, 255, 0) 73%,
      rgba(255, 255, 255, 0) 100%
    );
    background-blend-mode: color-dodge;
  }

  #reverseGradient2 {
    border: red 2px solid;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 19%,
      rgba(255, 255, 255, 1) 34%,
      rgba(255, 255, 255, 1) 66%,
      rgba(255, 255, 255, 0) 73%,
      rgba(255, 255, 255, 0) 100%
    );
    background-blend-mode: color-dodge;
  }
  .cropped-transform {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 55%;
    transform: scale(0.5) translate(0, 5%);
  }

  #box {
    width: 50px;
    height: 50px;
    background-color: #3498db;
  }

  #scrubber {
    width: 100%;
    margin-top: 20px;
  }

  #controls {
    margin-top: 20px;
  }

  /*generated with Input range slider CSS style generator (version 20211225)
https://toughengineer.github.io/demo/slider-styler*/
  input[type='range'].styled-slider {
    height: 35.2px;
    -webkit-appearance: none;
  }

  /*progress support*/
  input[type='range'].styled-slider.slider-progress {
    --range: calc(var(--max) - var(--min));
    --ratio: calc((var(--value) - var(--min)) / var(--range));
    --sx: calc(0.5 * 48px + var(--ratio) * (100% - 48px));
  }

  input[type='range'].styled-slider:focus {
    outline: none;
  }

  /*webkit*/
  input[type='range'].styled-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 48px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(to right, #dcf800, #ff1bc1d4);
    border: 2px solid #d3d3d3;
    box-shadow: 0 0 2px black;
    margin-top: calc(max((1em - 1px - 1px) * 0.5, 0px) - max(32px * 0.5, 2px));
  }

  input[type='range'].styled-slider::-webkit-slider-runnable-track {
    height: 1em;
    border: 1px solid #b2b2b2;
    border-radius: 8px;
    background: #efefef;
    box-shadow: none;
  }

  input[type='range'].styled-slider:hover::-webkit-slider-runnable-track {
    border-color: #9a9a9a;
  }

  input[type='range'].styled-slider:active::-webkit-slider-runnable-track {
    border-color: #c1c1c1;
  }

  input[type='range'].styled-slider.slider-progress::-webkit-slider-runnable-track {
    background:
      linear-gradient(to right, #d4ff00, #f4bf0f) 0 / var(--sx) 100% no-repeat,
      #efefef;
  }

  /*mozilla*/
  input[type='range'].styled-slider::-moz-range-thumb {
    width: max(calc(48px - 2px - 2px), 0px);
    height: max(calc(32px - 2px - 2px), 0px);
    border-radius: 8px;
    background: linear-gradient(to right, #dcf800, #ff1bc1d4);
    border: 2px solid #d3d3d3;
    box-shadow: 0 0 2px black;
  }

  input[type='range'].styled-slider::-moz-range-track {
    height: max(calc(1em - 1px - 1px), 0px);
    border: 1px solid #b2b2b2;
    border-radius: 8px;
    background: #efefef;
    box-shadow: none;
  }

  input[type='range'].styled-slider:hover::-moz-range-track {
    border-color: #9a9a9a;
  }

  input[type='range'].styled-slider:active::-moz-range-track {
    border-color: #c1c1c1;
  }

  input[type='range'].styled-slider.slider-progress::-moz-range-track {
    background:
      linear-gradient(to right, #d4ff00, #f4bf0f) 0 / var(--sx) 100% no-repeat,
      #efefef;
  }

  /*ms*/
  input[type='range'].styled-slider::-ms-fill-upper {
    background: transparent;
    border-color: transparent;
  }

  input[type='range'].styled-slider::-ms-fill-lower {
    background: transparent;
    border-color: transparent;
  }

  input[type='range'].styled-slider::-ms-thumb {
    width: 48px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(to right, #dcf800, #ff1bc1d4);
    border: 2px solid #d3d3d3;
    box-shadow: 0 0 2px black;
    margin-top: 0;
    box-sizing: border-box;
  }

  input[type='range'].styled-slider::-ms-track {
    height: 1em;
    border-radius: 8px;
    background: #efefef;
    border: 1px solid #b2b2b2;
    box-shadow: none;
    box-sizing: border-box;
  }

  input[type='range'].styled-slider:hover::-ms-track {
    border-color: #9a9a9a;
  }

  input[type='range'].styled-slider:active::-ms-track {
    border-color: #c1c1c1;
  }

  input[type='range'].styled-slider.slider-progress::-ms-fill-lower {
    height: max(calc(1em - 1px - 1px), 0px);
    border-radius: 8px 0 0 8px;
    margin: -1px 0 -1px -1px;
    background: linear-gradient(to right, #d4ff00, #f4bf0f);
    border: 1px solid #b2b2b2;
    border-right-width: 0;
  }
</style>
