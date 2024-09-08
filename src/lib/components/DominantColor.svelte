<script>
  import { videoId } from '$lib/stores/store.js';

  let imageUrl;

  // let imageId = '12345'; // Replace with the actual ID
  $: imageUrl = `/api/fetch-image?id=${$videoId}`;
</script>

<img class="w-12" src={imageUrl} alt="Fetched Photograph" />
