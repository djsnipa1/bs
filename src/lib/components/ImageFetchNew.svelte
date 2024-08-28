  <script>
    import { videoId } from '$lib/stores/store.js';

    // Ensure videoId is reactive
    $: thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    let testVideoId = 'r0j2-UnL8U4';
 // $: testThumbnailUrl = `https://img.youtube.com/vi/${testVideoId}/hqdefault.jpg`;
    let testThumbnailUrl = "https://picsum.photos/200/200";
    
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
  </script>

  {#await preload(testThumbnailUrl)}
    Image is loading!
  {:then base64}
    <img id="image" src="{base64}" alt="Alright Buddy!" />
    <code>{base64}</code>
  {/await}

<style>
  img, #image {
    filter: sepia(99%) brightness(61%) hue-rotate(230deg);
    -webkit-filter: sepia(99%) brightness(61%) hue-rotate(230deg);
    -moz-filter: sepia(99%) brightness(61%) hue-rotate(230deg);
  }
</style>