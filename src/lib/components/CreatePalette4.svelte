<script>
  import { dominantColorStore } from '$lib/stores/store';
  import { tailwindColors } from '$lib/tailwindColors.js';
  import { getPalette } from '$lib/util/getColors.js';
  import ColorThief from 'color-thief-ts';
  import {
    average,
    converter,
    differenceEuclidean,
    formatHex,
    nearest,
    parse,
    wcagLuminance
  } from 'culori';
  import { onMount } from 'svelte';

  let paletteFetched = false;

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

  const youtubeIds = [
    'UYtz2rzh-ks',
    'b_xYP3nqFRk',
    '3Xa-nIimbMw',
    'hljNbYdMjls',
    'MQy2lB4R0mo',
    '39Azo7jKuNk',
    'oSeDHJE2aSM',
    'f9wVLFEXH4o',
    'PJnTP0xGi8c',
    '9lOkeUF_nQs',
    'Xncaz-gR-LA',
    'fUaw78LQgL4',
    'Ribd8YzVTJM'
  ];

  const randomId = youtubeIds[Math.floor(Math.random() * youtubeIds.length)];
  // $: url = `api/fetch-image?id=${$videoId}`;
  // $: url = `api/fetch-image?id=${randomId}`;

  let picsumUrl = 'https://picsum.photos/1200/900';
  let imageUrl = encodeURIComponent(picsumUrl);

  const params = new URLSearchParams({
    // fetchUrl: imageUrl
    fetchUrl: picsumUrl
  });

  let url = `api/fetch-image?${params}`;

  let palette = [];
  let dominantColor = [];
  let allColors = {};
  let averageColorHex,
    averageColor = '';
  let cssOklchColor,
    middleOklchCss = '';

  // let url = 'https://picsum.photos/800/1200';

  async function fetchPalette() {
    try {
      const result = await getPalette(url);
      palette = result.palette;
      dominantColor = result.dominantColor;
      dominantColorStore.set(dominantColor);

      allColors = { dominantColor: dominantColor, ...palette };

      console.log('allColors: ', allColors);
      console.log('Palette:', palette);
      console.log('Dominant Color:', dominantColor);
      sortColors(palette);
      lightOrDark(dominantColor);
      paletteFetched = true;
    } catch (error) {
      console.error('Error fetching palette:', error);
    }
  }

  let sortedColors;
  let lightestColor, middleColor, darkestColor;
  let tailwindColor;
  let colorInfo;
  let hexColor;
  let dominantOklchCss;
  let isTextDark = true;
  let textColor = '';

  function sortColors(colors) {
    // Sample colors in HEX format
    // const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

    // Convert HEX to OKLCH
    const oklchColors = colors.map((color) => converter('oklch')(parse(color)));

    // Sort by lightness (L)
    oklchColors.sort((a, b) => a.l - b.l);

    // Convert back to HEX
    sortedColors = oklchColors.map((color) => formatHex(color));

    lightestColor = sortedColors[7];
    middleColor = sortedColors[4];
    darkestColor = sortedColors[0];

    console.log('🙂', lightestColor);
    console.log('🙂', middleColor);
    console.log('🙂', darkestColor);

    console.log('sorted colors: ', sortedColors);

    averageColor = average(sortedColors);
    console.log('averageColor: ', JSON.stringify(averageColor));
    averageColorHex = formatHex(averageColor);
    console.log('averageColorHex: ', averageColorHex);

    // Step 2: Convert to OKLCH
    let toOklch = converter('oklch');
    let oklchColor = toOklch(averageColor);

    let middleOklch = toOklch(middleColor);
    middleOklch.l += 0.1; // Adjust this value as needed
    middleOklchCss = `oklch(${middleOklch.l} ${middleOklch.c} ${middleOklch.h})`;

    // Step 3: Increase the chroma
    oklchColor.l += 0.1; // Adjust this value as needed
    cssOklchColor = `oklch(${oklchColor.l} ${oklchColor.c} ${oklchColor.h})`;

    console.log('cssOklchColor: ', cssOklchColor); // Outputs the modified color

    let dominantOklch = toOklch(dominantColor);
    dominantOklch.l -= 0.2;
    dominantOklchCss = `oklch(${dominantOklch.l} ${dominantOklch.c} ${dominantOklch.h})`;

    // ---------
    // Flatten the Tailwind color object into an array of color objects
    const colorsArray = Object.values(tailwindColors).flatMap((colorGroup) =>
      Object.values(colorGroup).map((color) => parse(color))
    );

    console.log(colorsArray[1]);
    // Target color
    // const targetColor = parse('#ff6347'); // tomato color
    // const targetColor = '#ff6347'; // tomato color
    // const targetColor = middleColor;
    const targetColor = dominantColor;

    // Find the nearest color using the Euclidean distance metric
    const closestColor = nearest(colorsArray, differenceEuclidean());

    // closestColor(targetColor);

    // Output the closest color in hex format
    // console.log(closestColor(targetColor, 1));
    tailwindColor = closestColor(targetColor, 1);
    console.log('tailwindColor :');
    console.log(formatHex(tailwindColor[0]));

    hexColor = formatHex(tailwindColor[0]);

    function findTailwindColorName(hex) {
      for (const [colorName, shades] of Object.entries(tailwindColors)) {
        for (const [shade, shadeHex] of Object.entries(shades)) {
          if (shadeHex.toLowerCase() === hex.toLowerCase()) {
            return { colorName, shade };
          }
        }
      }
      return null; // Return null if the hex code is not found
    }

    // Example usage:
    // const hexColor = '#f87171';
    colorInfo = findTailwindColorName(hexColor);
    console.log(colorInfo); // { colorName: 'red', shade: '400' }
  }

  function lightOrDark(color) {
    let luminance = wcagLuminance(color);
    console.log('luminance: ', luminance);

    // Using the HSP value, determine whether the color is light or dark
    if (luminance > 0.5) {
      textColor = darkestColor;
      return 'light';
    } else {
      textColor = lightestColor;
      return 'dark';
    }
  }

  // Function to toggle the boolean value
  function toggleColor() {
    isTextDark = !isTextDark;
    console.log(isTextDark ? 'yes its dark' : 'no not dark');
    // textColor = textColor === lightestColor ? darkestColor : lightestColor;
  }

  // Call myFunction every 3 seconds (3000 milliseconds)
  setInterval(toggleColor, 3000);

  // let textColor;

  // $: textColor &&
  //   textColor.style.setProperty(
  //     '--text-color',
  //     isTextDark ? lightestColor : darkestColor
  // );
</script>

<div style="--text-color: {textColor}">
  <div
    style={`--text-color: ${textColor}; background-color: ${dominantColor}; background-image: radial-gradient(circle, ${dominantColor} 0%,  ${dominantOklchCss} 66%);`}
    class="flex grid min-h-screen grid-cols-2 flex-col items-center space-y-8 p-4"
  >
    <!-- Image section -->
    <div class="mb-4 flex w-full flex-col items-center">
      <img
        bind:this={img}
        src={url}
        alt="Centered photograph"
        class="mb-4 aspect-video w-[300px] object-cover"
      />

      <!-- Color palette -->
      {#if sortedColors}
        <div class="flex justify-center space-x-2">
          {#each sortedColors as color}
            <div
              class="h-8 w-8 rounded-md"
              style="background-color: {color};"
            ></div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- <div> -->
    <!--   <p class="text">This text color changes based on the boolean value.</p> -->
    <!--   <button on:click={toggleColor}>Toggle Color</button> -->
    <!-- </div> -->

    {#if paletteFetched}
      <section
        style={`background-color: ${$dominantColorStore};`}
        class="w-full max-w-md rounded-lg bg-white p-2 shadow-md"
      >
        <h2 class="mb-4 text-lg font-bold">dominantColorStore</h2>
        <p class="mb-4 text-lg" style={`color: ${dominantOklchCss};`}>
          {$dominantColorStore}
        </p>
      </section>
    {/if}

    <!-- First additional section -->
    {#if paletteFetched}
      <section
        style={`background-color: ${hexColor};`}
        class="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
      >
        <h2 class="mb-4 text-xl font-bold">Tailwind Color</h2>
        <p class="mb-4 text-lg">{colorInfo.colorName} {colorInfo.shade}</p>
      </section>
    {/if}
    <!-- {#if cssOklchColor} -->
    <!--   <section -->
    <!--     style={`background-color: ${cssOklchColor};`} -->
    <!--     class="w-full max-w-md rounded-lg bg-white p-6 shadow-md" -->
    <!--   > -->
    <!--     <h2 class="mb-4 text-xl font-bold">oklch Color</h2> -->
    <!--   </section> -->
    <!-- {/if} -->

    <!-- Second additional section -->
    <!-- {#if middleColor} -->
    <!--   <section -->
    <!--     style={`background-color: ${middleColor};`} -->
    <!--     class="w-full max-w-md rounded-lg bg-white p-6 shadow-md" -->
    <!--   > -->
    <!--     <h2 class="mb-4 text-xl font-bold">Middle Color</h2> -->
    <!--   </section> -->
    <!-- {/if} -->

    <!-- Third additional section -->
    {#if middleOklchCss}
      <section
        style={`background-color: ${middleOklchCss};`}
        class="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
      >
        <h2 class="mb-4 text-xl font-bold">Middle oklch Color</h2>
      </section>
    {/if}
  </div>

  <hr />

  <button
    class="button btn absolute left-[25vw] top-[60vh] z-[50]"
    on:click={fetchPalette}>Fetch Palette</button
  >

  <!-- <div> -->
  <!--   {#if palette} -->
  <!--     <ul> -->
  <!--       {#each palette as color, i} -->
  <!--         <li> -->
  <!--           <div class="box" style={`background-color: ${color};`}></div> -->
  <!--           {color} -->
  <!--         </li> -->
  <!--       {/each} -->
  <!--     </ul> -->
  <!--   {/if} -->
  <!--   {#if dominantColor} -->
  <!--     <div> -->
  <!--       <h3>Dominant Color</h3> -->
  <!--       <div class="box" style={`background-color: ${dominantColor};`}></div> -->
  <!--       {dominantColor} -->
  <!--     </div> -->
  <!--   {/if} -->
  <!-- </div> -->
</div>

<style>
  div {
    border: hotpink 1px dotted;
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
</style>
