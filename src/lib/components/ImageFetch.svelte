<script>
  import { onMount } from 'svelte';
  import { videoId } from '$lib/stores/store.js';

  let imageUrl;

  onMount(async () => {
    imageUrl = `https://img.youtube.com/vi/${$videoId}/hqdefault.jpg`;
  });
</script>

<div class="flex h-1/2 w-full items-center justify-center pt-20">
  <img src={imageUrl} class="aspect-video size-20" alt="Fetched Image" />
</div>
