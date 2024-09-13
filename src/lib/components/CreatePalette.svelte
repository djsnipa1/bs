<script>
  // import ColorThief from "https://cdn.skypack.dev/colorthief";
  import { browser } from '$app/environment';
  import ColorThief from 'color-thief-ts';
  import { converter, differenceEuclidean, formatHex, nearest } from 'culori';
  import { onMount } from 'svelte';

  console.clear();

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

  async function loadImg(url) {
    const img = document.createElement('img');

    img.src = url;
    img.crossOrigin = `anonymous`;

    await img.decode();

    return img;
  }

  async function generatePalette() {
    let colors = [];
    let chosenImg;

    const queries = [
      'red',
      'green',
      'blue',
      'yellow',
      'orange',
      'magenta',
      'pink',
      'purple',
      'turqoise',
      'grey',
      'black',
      'white',
      'indigo',
      'violet',
      'emerald',
      'flower',
      'vibrant',
      'gold',
      'silver',
      'jewels',
      'rainbow',
      'forest',
      'ocean',
      'coral',
      'galaxy',
      'tree',
      'leaf',
      'fish',
      'frog',
      'animal',
      'wildlife',
      'color',
      'paint',
      'paint',
      'abstract',
      'colorful',
      'nature',
      'volcano',
      'sun',
      'ruby',
      'saphire',
      'emerald',
      ''
    ];

    while (colors.length < 4) {
      const url = `https://picsum.photos/200/300?${
        queries[Math.floor(Math.random() * queries.length - 1)]
      }`;
      chosenImg = await loadImg(url);

      colors = await colorThief.getPalette(chosenImg, 3).map((c) =>
        toLCH({
          r: c[0] / 255,
          g: c[1] / 255,
          b: c[2] / 255,
          mode: 'rgb'
        })
      );
    }

    const palettes = discoverPalettes(colors);
    document.body.innerHTML = `<div class="content"></div>`;
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
        },
        ''
      );
    }

    setTimeout(() => {
      generatePalette();
    }, 1000);
  }

  if (browser) {
    onMount(() => {
      generatePalette();
    });
  }
</script>

<div></div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: grid;
    min-height: 100vh;
    color: #1d1934;
    place-items: center;
    font-family: system-ui;
    padding: 2rem;
  }

  .palette-colors {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .palette-colors div {
    flex: 1;
    height: 3rem;
    border-radius: 0.375rem;
  }

  .palette-colors p {
    margin-right: 1rem;
    text-transform: capitalize;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
    filter: brightness(0.75);
  }

  .content {
    width: 100%;
    display: grid;
    grid-gap: 1rem;
    max-width: 36rem;
    padding: 2rem;
    background: #fff;
    background: hsla(0, 100%, 100%, 0.75);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    backdrop-filter: blur(16px) saturate(180%);
    box-shadow: 0px 4px 16px 0px hsla(0, 0%, 0%, 0.125);
    border-radius: 1rem;
    border: 1px solid hsla(0, 0%, 100%, 0.9);
  }
</style>
