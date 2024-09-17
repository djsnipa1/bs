<script>
  import { videoId } from '$lib/stores/store';
  import { getPalette } from '$lib/util/getColors.js';
  import ColorThief from 'color-thief-ts';
  import { converter, differenceEuclidean, formatHex, nearest } from 'culori';
  import { onMount } from 'svelte';

  const colorThief = new ColorThief();
  const toLCH = converter('lch');

  function adjustHue(val) {
    if (val < 0) val += Math.ceil(-val / 360) * 360;

    return val % 360;
  }

  function createScientificPalettes(baseColor) {
    const targetHueSteps = {
      analogous: [0, 30, 60],
      triadic: [0, 120, 240],
      tetradic: [0, 90, 180, 270],
      complementary: [0, 180],
      splitComplementary: [0, 150, 210]
    };

    const palettes = {};

    for (const type of Object.keys(targetHueSteps)) {
      palettes[type] = targetHueSteps[type].map((step) => ({
        mode: 'lch',
        l: baseColor.l,
        c: baseColor.c,
        h: adjustHue(baseColor.h + step)
      }));
    }

    return palettes;
  }

  function isColorEqual(c1, c2) {
    return c1.h === c2.h && c1.l === c2.l && c1.c === c2.c;
  }

  function discoverPalettes(colors) {
    const palettes = {};

    for (const color of colors) {
      const targetPalettes = createScientificPalettes(color);

      for (const paletteType of Object.keys(targetPalettes)) {
        const palette = [];
        let variance = 0;

        for (const targetColor of targetPalettes[paletteType]) {
          const availableColors = colors.filter(
            (color1) => !palette.some((color2) => isColorEqual(color1, color2))
          );

          const match = nearest(
            availableColors,
            differenceEuclidean('lch')
          )(targetColor)[0];

          variance += differenceEuclidean('lch')(targetColor, match);

          palette.push(match);
        }

        if (
          !palettes[paletteType] ||
          variance < palettes[paletteType].variance
        ) {
          palettes[paletteType] = {
            colors: palette,
            variance
          };
        }
      }
    }

    return palettes;
  }

  let img;

  async function loadImg(url) {
    // const img = document.createElement('img');

    img.src = url;
    img.crossOrigin = `anonymous`;

    await img.decode();

    return img;
  }

  async function generatePalette() {
    let colors = [];
    let chosenImg;

    while (colors.length < 4) {
      const url = `https://picsum.photos/200/300?${
        queries[Math.floor(Math.random() * queries.length - 1)]
      }`;
      chosenImg = await loadImg(url);

      colors = await colorThief.getPalette(chosenImg).map((c) =>
        toLCH({
          r: c[0] / 255,
          g: c[1] / 255,
          b: c[2] / 255,
          mode: 'rgb'
        })
      );
    }

    const palettes = discoverPalettes(colors);
    // document.body.innerHTML = `<div class="content"></div>`;
    document.body.appendChild(chosenImg);

    for (const type of Object.keys(palettes)) {
      const paletteWrapper = document.createElement('div');
      paletteWrapper.classList.add('palette-colors');
      document.querySelector('.content').appendChild(paletteWrapper);

      paletteWrapper.innerHTML = `<p>${type}</p>`;

      paletteWrapper.innerHTML += palettes[type].colors.reduce(
        (html, color) => {
          html += `<div style="background: ${formatHex(color)};"></div>`;

          return html;
        }
      );
    }

    setTimeout(() => {
      generatePalette();
    }, 1000);
  }

  onMount(() => {
    generatePalette();
  });
  // import ColorThief from 'color-thief-ts';
  // import { converter, differenceEuclidean, nearest } from 'culori';

  $: url = `api/fetch-image?id=${$videoId}`;

  let palette = [];
  let dominantColor = [];
  let allColors = {};

  // let url = 'https://picsum.photos/800/1200';

  async function fetchPalette() {
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
</script>

<div class="content"></div>

<img bind:this={img} class="w-12" src={url} alt="Test Photograph" />
<button class="button btn" on:click={fetchPalette}>Fetch Palette</button>

<div>
  {#if palette}
    <ul>
      {#each palette as color, i}
        <li>
          <div class="box" style={`background-color: ${color};`}></div>
          {color}
        </li>
      {/each}
    </ul>
  {/if}
  {#if dominantColor}
    <div>
      <h3>Dominant Color</h3>
      <div class="box" style={`background-color: ${dominantColor};`}></div>
      {dominantColor}
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
