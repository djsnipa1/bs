<!-- src/components/CircleImage.svelte -->
<script>
  import { circleTransition } from '$lib/transitions/CircleTransition.js';
  import {
    showYoutubeTransition,
    videoId,
    newYtUrl
  } from '$lib/stores/store.js';
  import anime from 'animejs';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let thumbnailUrl;
  export let circleVisible = false;
  let range = 100;
  let circle, thumbnail;

  export let data;
  let color = $page.data.color;

  let vibrantColors, vibrantRGBA;
  $: vibrantColors = $page.data?.vibrantColors || {};
  $: vibrantRGBA = $page.data?.vibrantRGBA || '';

  onMount(() => {
    //videoId = 'YOUR_VIDEO_ID'; // Replace with your video ID
    thumbnailUrl = `https://img.youtube.com/vi/${$videoId}/hqdefault.jpg`;
    //  thumbnailUrl = `https://img.youtube.com/vi/hNRWpWEd_q4/hqdefault.jpg`;

    let anim = () => {
      anime
        .timeline({ loop: true })
        .add({
          targets: thumbnail,
          //rotateY: '2160deg',
          rotateY: 360 * 10,
          duration: 3000,
          translateZ: 0, // Keeps the circle in place while it rotates
          loop: true, // Makes the animation loop infinitely
          easing: 'easeInQuad' // Ensures the animation has a constant speed
        })
        .add({
          duration: 1000,
          offset: '-=3500',
          loop: true,
          //direction: 'alternate',
          update: function (anim) {
            thumbnail.style.filter =
              'blur(' + (10 * anim.progress) / 100 + 'px)';
          }
        });
    };
    anim();
  });

  /* 
  onMount(() => {
		console.log(image.clientHeight)
	let anim = () => {
	anime.timeline({ loop: true })
  .add({
    targets: "img",
    duration: 1200,
    height: 50,
    width: 225,
    elasticity: 200,
    borderRadius: 25,
     delay: 1000
  })
  .add({
    targets: "div",
    duration: 1800,
    height: 200,
    width: 200,
    borderRadius: 100,
    elasticity: 300
  })
		.add({
			targets: "img",
			width: 300,
			height: image.clientHeight,
			aspectRatio: "16/9",
			duration: 2000,
			elasticity: 600
		})
  .add({
    targets: "section",
    scale: 2,
		elasticity: 400,
    easing: "easeOutSine",
    duration: 700
  })
  .add({
    targets: "section",
    scale: 1,
		elasticity: 400,
    easing: "easeInSine",
    duration: 350
	})
  .add({
    targets: "div",
    height: 100,
    width: 100,
		elasticity: 50,
    borderRadius: "50%"
  })
		.add({
			targets: ["div", "img", "section"],
			rotateY: '1080deg',
			duration: 2000,
			easing: "easeOutQuint",
		delay: anime.stagger(400)
		})
	};
  anim();
	});
	*/

  //	$: cssVarStyles = `--note-color:${noteColor};--note-bg-color:${noteBgColor}`;

  let cssVarStyles = `--custom-gradient: background: radial-gradient(circle, ${color} 0%, rgba(6,213,252,0.9694189602446484) 100%);`;
</script>

<!--

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    
  </div>
{/if}
-->

{$newYtUrl}

<div
  class="custom-grad absolute left-1/2 top-1/2 h-20 w-20 text-sm"
  style={cssVarStyles}
></div>

<div
  style="background-color: {vibrantRGBA}; padding: 10px; margin-bottom: 10px;"
>
  {vibrantRGBA}
</div>
<!-- Iterate over the entries of the colors object -->
{#each Object.entries(vibrantColors) as [colorName, hexCode]}
  <div style="background-color: {hexCode}; padding: 10px; margin-bottom: 10px;">
    {colorName}: {hexCode}
  </div>
{/each}

<img
  src={$newYtUrl}
  bind:this={thumbnail}
  alt="YouTube Video Thumbnail"
  class="circle-mask absolute left-1/2 top-1/2 aspect-video h-1/4 -translate-x-1/2 -translate-y-1/2 object-cover object-cover"
/>

<!--<div class="inset-0 bg-transparent clip-path-circle"></div> -->

<!--
<img src={thumbnailUrl} bind:this={thumbnail} alt="YouTube Video Thumbnail" />
-->

<style>
  .custom-grad {
    background-image: var(--custom-gradient);
  }
  .custom-bg {
    background: var(--custom-color);
  }
  .clip {
    clip-path: var(--clip-range);
  }

  .circle-mask {
    clip-path: circle(30%);
  }
  /*
.blur-shape {
 mask-image: radial-gradient(black 50%, rgba(0, 0, 0, 0.5) 50%));
}
.mask2 {
  mask-image: radial-gradient(circle, black 50%, rgba(0, 0, 0, 0.5) 50%);
}
*/
  .mask3 {
    mask-image: radial-gradient(circle, black, transparent);
  }
</style>
