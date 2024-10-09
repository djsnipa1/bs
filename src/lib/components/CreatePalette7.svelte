<script>
  import { dominantColorStore, paletteColorStore } from '$lib/stores/store';
  import { tailwindColors } from '$lib/tailwindColors.js';
  import { getPalette } from '$lib/util/getColors.js';
  import ColorThief from 'color-thief-ts';
  import {
    average,
    converter,
    differenceEuclidean,
    formatHex,
    nearest,
    oklch,
    parse,
    wcagLuminance
  } from 'culori';
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';

  let paletteFetched = false;
  let buttonVisible = true;

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

  // async function generatePalette() {
  //   let colors = [];
  //   let chosenImg;
  //
  //   while (colors.length < 4) {
  //     const url = `https://picsum.photos/200/300?${
  //       queries[Math.floor(Math.random() * queries.length - 1)]
  //     }`;
  //     chosenImg = await loadImg(url);
  //
  //     colors = await colorThief.getPalette(chosenImg).map((c) =>
  //       toLCH({
  //         r: c[0] / 255,
  //         g: c[1] / 255,
  //         b: c[2] / 255,
  //         mode: 'rgb'
  //       })
  //     );
  //   }

  // const palettes = discoverPalettes(colors);
  // document.body.innerHTML = `<div class="content"></div>`;
  // document.body.appendChild(chosenImg);

  // for (const type of Object.keys(palettes)) {
  //   const paletteWrapper = document.createElement('div');
  //   paletteWrapper.classList.add('palette-colors');
  //   document.querySelector('.content').appendChild(paletteWrapper);
  //
  //   paletteWrapper.innerHTML = `<p>${type}</p>`;
  //
  //   paletteWrapper.innerHTML += palettes[type].colors.reduce(
  //     (html, color) => {
  //       html += `<div style="background: ${formatHex(color)};"></div>`;
  //
  //       return html;
  //     }
  //   );
  // }

  // setTimeout(() => {
  // generatePalette();
  // }, 1000);
  // }

  let img;
  let picsumUrl = (seed) => {
    return `https://picsum.photos/seed/${seed}/1200/900/`;
  };

  let getRandomNumber = (num) => {
    return Math.floor(1000 + Math.random() * (num - 1000));
  };

  // let newUrl = picsumUrl(getRandomNumber(10000));

  let getNewParams = (random) => {
    const urlParams = new URLSearchParams({
      fetchUrl: picsumUrl(random)
    });
    return urlParams;
  };

  // let url = `api/fetch-image?${urlParams}`;
  let url = `api/fetch-image?${getNewParams(getRandomNumber(10000))}`;

  let palette,
    paletteColors = [];
  let dominantColor = [];
  // let allColors = {};
  let averageColorHex,
    averageColor = '';
  let middleLighterOklchCss = '';
  let mostChromaticColor = null;
  let oklchColors = [];
  $: colors = ['#FF5733', '#33FF57', '#3357FF'];

  async function fetchPalette() {
    const newUrlParams = new URLSearchParams({
      fetchUrl: picsumUrl(getRandomNumber(10000))
    });

    let newParams = getNewParams(getRandomNumber(10000));

    let newUrl = `api/fetch-image?${newParams}`;
    url = newUrl;

    try {
      const result = await getPalette(url);
      palette = result.palette;
      colors = result.palette;
      dominantColor = result.dominantColor;
      dominantColorStore.set(dominantColor);
      paletteColorStore.set(palette);

      // allColors = { dominantColor: dominantColor, ...palette };

      // console.log('allColors: ', allColors);
      // console.log('Palette:', palette);
      // console.log('Dominant Color:', dominantColor);
      sortColors(palette);
      lightOrDark(dominantColor);
      // getMostChromatic($paletteColorStore);
      paletteFetched = true;
      console.log(oklchColors);
    } catch (error) {
      console.error('Error fetching palette:', error);
    }
  }

  let imageUrl =
    'https://i.scdn.co/image/1a3ca29c2f93fa50f72df85b1a94f62383dbc5cd';
  let color = null;

  async function fetchImage() {
    try {
      let newParams = getNewParams(getRandomNumber(10000));

      let newUrl = `api/fetch-image?${newParams}`;
      url = newUrl;

      const response = await fetch(url);
      // const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], {
        type: response.headers.get('content-type')
      });
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        const colorThief = new ColorThief();
        color = colorThief.getColor(img);
        console.log(`rgb(${color})`);
        console.log(`color : ${color}`);

        // Use this after you're done with the image and no longer need it
        // URL.revokeObjectURL(img.src);
      };
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  onMount(() => {
    fetchImage();
  });
</script>

<img src={url} />
<br />

<div>
  {#if color}
    <p>Dominant Color: {color}</p>
    <div class="size-10" style={`background-color: ${color};`}></div>
  {/if}
</div>

<style>
  img {
    width: 300px;
    height: auto;
  }
  div {
    /* border: hotpink 1px dotted; */
    color: var(--text-color);
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
  .background-gradient {
    background-image: radial-gradient(
      circle,
      hsl(192deg 76% 50%) 0%,
      hsl(203deg 100% 43%) 33%,
      hsl(213deg 80% 40%) 67%,
      hsl(215deg 80% 29%) 100%
    );
  }
  :root {
    --text-color: #222222; /* Default color */
  }
  :global(body) {
    color: var(--text-color);
  }
  .countdown {
    transition: all 0.2s ease-in-out;
  }

  .dark {
    color: black;
  }

  .light {
    color: white;
  }
</style>
