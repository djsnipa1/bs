<script>
  import { gradientColors, newYtUrl, videoId } from '$lib/stores/store.js';
  import { getPalette } from '$lib/util/getColors.js';

  import DominantColor from './DominantColor.svelte';

  // let url = `https://img.youtube.com/vi/pgtF0Zdcpbo/hqdefault.jpg`;
  // let url = 'https://picsum.photos/300/200';
  $: url = `api/fetch-image?id=${$videoId}`;

  let palette = [];
  let dominantColor = [];
  let allColors = {};

  async function fetchPalette() {
    try {
      const result = await getPalette(url);
      palette = result.palette;
      dominantColor = result.dominantColor;

      allColors = { dominantColor: dominantColor, ...palette };

      gradientColors.set(allColors);

      console.log('allColors: ', allColors);
      console.log('Palette:', palette);
      console.log('Dominant Color:', dominantColor);
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
</div>

<style>
  :root {
    --shadow-color: 286deg 36% 60%;
    --shadow-elevation-low: 0.6px 0.7px 0.8px hsl(var(--shadow-color) / 0.48),
      0.9px 1px 1.2px -2px hsl(var(--shadow-color) / 0.35),
      2.4px 2.6px 3.1px -4.1px hsl(var(--shadow-color) / 0.23);
    --shadow-elevation-medium: 0.6px 0.7px 0.8px hsl(var(--shadow-color) / 0.5),
      1.4px 1.5px 1.8px -1.4px hsl(var(--shadow-color) / 0.4),
      4.3px 4.8px 5.7px -2.7px hsl(var(--shadow-color) / 0.31),
      11.9px 13.1px 15.7px -4.1px hsl(var(--shadow-color) / 0.21);
    --shadow-elevation-high: 0.6px 0.7px 0.8px hsl(var(--shadow-color) / 0.53),
      1.9px 2.1px 2.5px -0.7px hsl(var(--shadow-color) / 0.47),
      4.3px 4.7px 5.6px -1.4px hsl(var(--shadow-color) / 0.41),
      9.2px 10.2px 12.2px -2px hsl(var(--shadow-color) / 0.35),
      18.3px 20.1px 24.1px -2.7px hsl(var(--shadow-color) / 0.29),
      33px 36.3px 43.4px -3.4px hsl(var(--shadow-color) / 0.24),
      54.8px 60.2px 72px -4.1px hsl(var(--shadow-color) / 0.18);
  }

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
