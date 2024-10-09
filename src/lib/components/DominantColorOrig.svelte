<script>
  import { videoId } from '$lib/stores/store.js';
  import { getPalette } from '$lib/util/getColors.js';
  import { getVividColors } from '$lib/util/getVivid.js';

  // let url = `https://img.youtube.com/vi/pgtF0Zdcpbo/hqdefault.jpg`;
  // let url = 'https://picsum.photos/300/200';
  $: url = `api/fetch-image?id=${$videoId}`;

  let palette = [];
  let dominantColor = [];
  let allColors = {};
  let vibrantColor = null;

  async function fetchPalette() {
    await fetchVividPalette();
    try {
      const result = await getPalette(url);
      palette = result.palette;
      dominantColor = result.dominantColor;

      allColors = { dominantColor: dominantColor, ...palette };

      console.log('allColors: ', allColors);
      console.log('Palette:', palette);
      console.log('Dominant Color:', dominantColor);
    } catch (error) {
      console.error('Error fetching palette:', error);
    }
  }

  async function fetchVividPalette() {
    try {
      const result = await getVividColors(url);
      const vibrant = result;
      // const vibrantColors = result.vibrantColors;
      // const vibrantRGBA = result.vibrantRGBA;

      // allColors = { dominantColor: dominantColor, ...palette };

      console.log('vibrant hex: ', vibrant);
      // console.log('vibrantColors:', vibrantColors);
      // console.log('vibrantRGBA:', vibrantRGBA);
      vibrantColor = vibrant;
      return vibrant;
    } catch (error) {
      console.error('Error fetching palette:', error);
    }
  }
</script>

<img class="w-12" src={url} alt="Test Photograph" />
<button class="button btn" on:click={fetchPalette}>Fetch Palette</button>

<div>
  {#if palette.length > 0}
    <ul>
      {#each palette as color, i}
        <li>
          <div class="box" style={`background-color: ${color};`}></div>
          {color}
        </li>
      {/each}
    </ul>
  {/if}
  {#if dominantColor.length > 0}
    <div>
      <h3>Dominant Color</h3>
      <div class="box" style={`background-color: ${dominantColor};`}></div>
      {dominantColor}
    </div>
  {/if}
  {#if vibrantColor}
    <div>
      <h3>Vibrant</h3>
      <div class="box" style={`background-color: ${vibrantColor};`}></div>
      {vibrantColor}
    </div>
  {/if}
</div>

<style>
  .box {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px #222222 solid;
    box-shadow: var(--shadow-elevation-medium);
    display: inline-block;
    margin-right: 5px;
  }
</style>
