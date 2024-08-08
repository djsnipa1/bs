<!-- src/components/CircleImage.svelte -->
<script>
  import { ImageFetch } from '$lib';
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
  /*
  let vibrantColors, vibrantRGBA;
  $: vibrantColors = $page.data?.vibrantColors || {};
  $: vibrantRGBA = $page.data?.vibrantRGBA || '';
*/
  onMount(() => {
    thumbnailUrl = `https://img.youtube.com/vi/${$videoId}/hqdefault.jpg`;
    //  thumbnailUrl = `https://img.youtube.com/vi/hNRWpWEd_q4/hqdefault.jpg`;

    let anim = () => {
      anime
        .timeline({ loop: true, autoPlay: true })
        .add({
          targets: thumbnail,
          //rotateY: '2160deg',
          rotateY: 360 * 10,
          duration: 3000,
          translateZ: 0, // Keeps the circle in place while pop it rotates
          loop: true, // Makes the animation loop infinitely
          easing: 'easeInQuad' // Ensures the animation has a constant speed
        })
        .add({
          targets: thumbnail,
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

  let cssVarStyles = `--custom-gradient: background: radial-gradient(circle, ${color} 0%, rgba(6,213,252,0.9694189602446484) 100%);`;
</script>

<!-- I tried to use the ImageFetch component but don't need it now since I'm not extracing colors -->
<!--
<ImageFetch />
-->

<!--
  This section is from when I tried to extract dominant colors and I read them from the $page data. The /api/colors route. 
-->
<!--
<div
  class="custom-grad absolute left-1/2 top-1/2 h-20 w-20 text-sm"
  style={cssVarStyles}
>
  {$page.data.vibrantColors.vibrant}
</div>
-->
<div class="grid min-h-screen place-items-center">
  <img
    src={$newYtUrl}
    bind:this={thumbnail}
    alt="YouTube Video Thumbnail"
    class="circle-mask size-30 aspect-video object-cover"
  />
</div>

<!--<div class="inset-0 bg-transparent clip-path-circle"></div> -->

<img
  src={thumbnailUrl}
  bind:this={thumbnail}
  alt="YouTube Video Thumbnail"
  class="circle-mask size-20"
/>

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
