<script>
  import ImageLoader from '$lib/components/ImageLoader.svelte';
  import { videoId } from '$lib/stores/store.js';
  import getVideoId from 'get-video-id';

  // Ensure videoId is reactive
  $: thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  function getYouTubeID(url) {
    const { id } = getVideoId(url); //=> 'dQw4w9WgXcQ'
    return id;
  }

  let randomVidId = 'https://youtube.com/watch?v=pgtF0Zdcpbo';

  let testVideoId = getYouTubeID(randomVidId);

  let testThumbnailUrl = `https://img.youtube.com/vi/${testVideoId}/hqdefault.jpg`;
  // let testThumbnailUrl = 'https://picsum.photos/200/200';
  console.log(testThumbnailUrl);

  let image = null;
  $: image;

  const preload = async (src) => {
    const resp = await fetch(src);
    const blob = await resp.blob();

    return new Promise(function (resolve, reject) {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject('Error: ', error);
    });
  };

  let imageUrl = 'https://example.com/image.jpg';
  let loadedImage = null;

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  }

  loadImage(testThumbnailUrl)
    .then((img) => {
      console.log('Image loaded:', img);
      loadedImage = img.src; // Set the loaded image source
    })
    .catch((error) => {
      console.error('Error loading image:', error);
    });
</script>

<!-- {#if loadedImage} -->
<!--   <img src={loadedImage} alt="Loaded Image" /> -->
<!-- {:else} -->
<!--   <p>Loading image...</p> -->
<!-- {/if} -->

<ImageLoader src={testThumbnailUrl} alt="Example Image" />

<!---->
<!-- {#await preload(testThumbnailUrl)} -->
<!--   Image is loading! -->
<!-- {:then base64} -->
<!--   <img id="image" src={base64} alt="Alright Buddy!" /> -->
<!--   <code>{base64}</code> -->
<!-- {/await} -->
<!---->
<style>
  img,
  #image {
    filter: sepia(99%) brightness(61%) hue-rotate(230deg);
    -webkit-filter: sepia(99%) brightness(61%) hue-rotate(230deg);
    -moz-filter: sepia(99%) brightness(61%) hue-rotate(230deg);
  }
</style>
