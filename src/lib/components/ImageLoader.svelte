<!-- ImageLoader.svelte -->
<script>
  import { imageUrlStore } from '$lib/stores/store.js';

  export let src;
  export let alt = '';

  let loadedImage = null;
  let error = null;

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  }

  $: if (src) {
    loadImage(src)
      .then((img) => {
        loadedImage = img.src;
        imageUrlStore.set(img.src); // Set the loaded image URL in the store
        error = null;
      })
      .catch((err) => {
        error = err;
        loadedImage = null;
      });
  }
</script>

{#if loadedImage}
  <img src={loadedImage} {alt} />
{:else if error}
  <p>Error loading image: {error.message}</p>
{:else}
  <p>Loading image...</p>
{/if}
