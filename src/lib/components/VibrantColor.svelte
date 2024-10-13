<script>
  import {
    getPaletteFromImage,
    getVibrantColorFromImage
  } from '$lib/util/vibrant';
  import { onMount } from 'svelte';

  let getRandomNumber = (num) => {
    return Math.floor(1000 + Math.random() * (num - 1000));
  };

  let getNewParams = (random) => {
    const urlParams = new URLSearchParams({
      fetchUrl: picsumUrl(random)
    });
    return urlParams;
  };

  let picsumUrl = (seed) => {
    return `https://picsum.photos/seed/${seed}/1200/900/`;
  };

  let imageUrl = `api/fetch-image?${getNewParams(getRandomNumber(10000))}`;

  let palette = {};
  let vibrantColor = null;

  let loadNewImage = async () => {
    let newImageUrl = `api/fetch-image?${getNewParams(getRandomNumber(10000))}`;
    palette = await getPaletteFromImage(newImageUrl);
    imageUrl = newImageUrl;
  };

  onMount(async () => {
    palette = await getPaletteFromImage(imageUrl);
    // console.log(Object.values(palette));
    vibrantColor = await getVibrantColorFromImage(imageUrl);
    console.log('vibrantColor: ', vibrantColor);
  });
</script>

{#if palette && Object.values(palette)[5]}
  <div
    class="flex h-screen w-full flex-col items-center gap-2 font-sofiasans font-extrabold"
    style={`background-color: ${Object.values(palette)[5].hex};`}
  >
    <h1
      class="pt-8 text-4xl"
      style={`color: ${Object.values(palette)[1].hex};`}
    >
      Vibrant Color
    </h1>

    <img
      src={imageUrl}
      class="rounded-me w-3/4 rounded-md border-8 shadow-md shadow-black/35"
      style={`border-color: ${Object.values(palette)[0].hex};`}
      alt="vibrant color photograph"
    />

    {#if palette}
      <div class="mt-4 w-1/2 font-normal">
        <ul>
          {#each Object.keys(palette) as key}
            <li
              class="mb-1.5 rounded-md border p-0.5 pl-2 shadow-sm shadow-black/35 {key.includes(
                'Light'
              )
                ? 'border-gray-800/75 text-gray-800'
                : 'border-gray-500/75 text-gray-200'}"
              style="background-color: {palette[key].hex};"
            >
              {key}: {palette[key].hex}
            </li>
          {/each}
        </ul>
      </div>
      <button class="btn btn-sm mt-4 h-2 pb-2 pt-2" on:click={loadNewImage}
        >Load new image</button
      >
    {/if}
  </div>
{:else}
  <p class="font-sofiasans text-xl font-light text-gray-400">
    Loading vibrant color...
  </p>
{/if}
