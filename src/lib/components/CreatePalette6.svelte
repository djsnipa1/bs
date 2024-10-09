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

  function convertHexToOklch(colors) {
    return colors.map((color) => oklch(parse(color)));
  }

  let mostChromaticOklch;
  $: paletteColorStore.subscribe((colors) => {
    oklchColors = convertHexToOklch(colors);
    mostChromaticColor = findMostChromaticColor(oklchColors);
    console.log('OKLCH Colors:', oklchColors);
    console.log('Most Chromatic Color:', mostChromaticColor);

    mostChromaticOklch = `oklch(${mostChromaticColor.l} ${mostChromaticColor.c} ${mostChromaticColor.h})`;
  });

  function findMostChromaticColor(colors) {
    return colors.reduce((max, color) => (color.c > max.c ? color : max), {
      c: -Infinity
    });
  }

  function getMostChromatic(colors) {
    const newColors = colors.map((color) => converter('oklch')(parse(color)));
    let maxChroma = 0;

    newColors.forEach((newColor) => {
      const colorObj = parse(newColor);
      const oklchColor = oklch(colorObj);
      const chroma = oklchColor.c;

      if (chroma > maxChroma) {
        maxChroma = chroma;
        mostChromaticColor = newColor;
        console.log(mostChromaticColor);
      }
    });
    // return mostChromaticColor;

    console.log(`Most chromatic color is: ${mostChromaticColor}`);
  }

  let sortedColors;
  let lightestColor, middleColor, darkestColor;
  let tailwindColor;
  let colorInfo;
  let hexColor;
  let dominantOklch, darkestOklch;
  let darkerDominantOklch, moreChromaticDominantOklch, darkestChromaticOklch;
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

    // console.log('sorted colors: ', sortedColors);

    averageColor = average(sortedColors);
    // console.log('averageColor: ', JSON.stringify(averageColor));
    averageColorHex = formatHex(averageColor);
    // console.log('averageColorHex: ', averageColorHex);

    // Step 2: Convert to OKLCH
    let toOklch = converter('oklch');
    let oklchColor = toOklch(averageColor);

    let middleOklch = toOklch(middleColor);
    middleOklch.l += 0.2; // Adjust this value as needed
    middleLighterOklchCss = `oklch(${middleOklch.l} ${middleOklch.c} ${middleOklch.h})`;

    // Step 3: Increase the lightness
    oklchColor.c += 0.025; // Adjust this value as needed
    moreChromaticDominantOklch = `oklch(${oklchColor.l} ${oklchColor.c} ${oklchColor.h})`;

    let temp4DominantOklch = toOklch(darkestColor);
    temp4DominantOklch.c += 0.05;
    temp4DominantOklch.l += 0.05;
    darkestChromaticOklch = `oklch(${temp4DominantOklch.l} ${temp4DominantOklch.c} ${temp4DominantOklch.h})`;

    let temp3DominantOklch = toOklch(darkestColor);
    darkestOklch = `oklch(${temp3DominantOklch.l} ${temp3DominantOklch.c} ${temp3DominantOklch.h})`;

    let temp2DominantOklch = toOklch(dominantColor);
    dominantOklch = `oklch(${temp2DominantOklch.l} ${temp2DominantOklch.c} ${temp2DominantOklch.h})`;

    let tempDominantOklch = toOklch(dominantColor);
    tempDominantOklch.l -= 0.1;
    darkerDominantOklch = `oklch(${tempDominantOklch.l} ${tempDominantOklch.c} ${tempDominantOklch.h})`;

    // ---------
    // Flatten the Tailwind color object into an array of color objects
    const colorsArray = Object.values(tailwindColors).flatMap((colorGroup) =>
      Object.values(colorGroup).map((color) => parse(color))
    );

    // console.log(colorsArray[1]);
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
    // console.log('tailwindColor :');
    // console.log(formatHex(tailwindColor[0]));

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
    // console.log(colorInfo); // { colorName: 'red', shade: '400' }
  }

  function lightOrDark(color) {
    let luminance = wcagLuminance(color);
    // console.log('luminance: ', luminance);

    // Using the HSP value, determine whether the color is light or dark
    if (luminance > 0.5) {
      textColor = darkestColor;
      return 'light';
    } else {
      textColor = lightestColor;
      return 'dark';
    }
  }

  let countdown = 3.0; // Starting at 3 seconds with two decimals
  let running = true; // Control variable

  async function updateCountdown() {
    if (running) {
      countdown = 3.0; // Reset countdown
      const interval = setInterval(async () => {
        countdown = (countdown - 0.01).toFixed(2);
        await tick();
        if (countdown <= 0) {
          countdown = 0.0;
          clearInterval(interval); // Stop the countdown
          await fetchPalette(); // Run async function
          updateCountdown(); // Restart the process
        }
      }, 10); // Update interval set to 10ms for two decimal places
    }
  }

  onMount(() => {
    updateCountdown();
  });

  // To stop the countdown, you can set `running = false` when needed.

  // Function to toggle the boolean value
  function toggleColor() {
    // console.log('this runs every ten seconds...');
  }

  // Call myFunction every 3 seconds (3000 milliseconds)
  setInterval(toggleColor, 3000);

  let sampleColors = ['#FF5733', '#33FF57', '#3357FF'];

  function hexToRgb(hex) {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r / 255, g / 255, b / 255];
  }

  function rgbToHsy(r, g, b) {
    let y = 0.299 * r + 0.587 * g + 0.114 * b;
    let minRgb = Math.min(r, g, b);
    let maxRgb = Math.max(r, g, b);
    let deltaRgb = maxRgb - minRgb;
    let s = maxRgb !== 0 ? deltaRgb / maxRgb : 0;
    let h;
    if (deltaRgb === 0) {
      h = 0;
    } else {
      if (maxRgb === r) {
        h = (g - b) / deltaRgb;
      } else if (maxRgb === g) {
        h = 2.0 + (b - r) / deltaRgb;
      } else {
        h = 4.0 + (r - g) / deltaRgb;
      }
      h = (h * 60) % 360;
      if (h < 0) h += 360;
    }
    return { h: h.toFixed(2), s: s.toFixed(2), y: y.toFixed(2) };
  }
  $: console.log(`colors = `, colors);
  $: hsyColors = colors.map((color) => {
    let [r, g, b] = hexToRgb(color);
    return rgbToHsy(r, g, b);
  });

  $: oklchColorTest = convertHexToOklch(colors);

  $: vividColors = oklchColorTest.filter((color) =>
    checkOklchColor(color.l, color.c)
  );

  $: console.log(`vividColors = `, vividColors);

  function checkOklchColor(l, c) {
    return c > 0.15 && l > 0.45 && l < 0.95;
  }
  // Your previous HSY colors array
  // let hsyColors = [
  //     { h: 0, s: 0.50, y: 0.60 },
  //     { h: 120, s: 0.10, y: 0.20 },
  //     { h: 240, s: 0.70, y: 0.80 }
  // ];

  // Function to check if color meets criteria
  function checkColor(s, y) {
    return s > 0.15 && y > 0.18 && y < 0.95;
  }

  let mostVividColor = null;

  // let filteredColors
  // Convert string values to numbers and filter the HSY colors array
  $: if (hsyColors && hsyColors.length > 0) {
    let filteredColors = hsyColors
      .map((color) => ({
        h: parseFloat(color.h),
        s: parseFloat(color.s),
        y: parseFloat(color.y)
      }))
      .filter((color) => checkColor(color.s, color.y));
    console.log('filtered colors: ', filteredColors);
    // Find the most vivid color
    mostVividColor = findMostVividColor(filteredColors);
  }

  // Function to find the most vivid color based on saturation (S)
  function findMostVividColor(colors) {
    return colors.reduce((max, color) => (color.s > max.s ? color : max), {
      s: -Infinity
    });
  }
</script>

<div class="relative h-screen" style="--text-color: {textColor}">
  <div
    style={`--text-color: ${textColor}; background-image: radial-gradient(circle, ${darkestChromaticOklch} 0%,  ${darkestOklch} 85%);`}
    class="flex min-h-screen flex-col items-center space-y-8 p-4"
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
        <div transition:fade class="flex justify-center space-x-2">
          {#each sortedColors as color}
            <div
              class="h-8 w-8 rounded-md"
              style="background-color: {color};"
            ></div>
          {/each}
        </div>
      {/if}
    </div>

    <p class="font-mono text-xs text-white">
      {JSON.stringify(mostVividColor)}
    </p>

    <div class="grid grid-cols-2 gap-2">
      {#if paletteFetched}
        <section
          style={`background-color: ${$dominantColorStore};`}
          class="w-full max-w-md rounded-lg bg-white p-2 shadow-md"
        >
          <h2 class="text-md mb-4 font-bold">Dominant Color Store</h2>
          <p class="text-md mb-4" style={`color: ${darkerDominantOklch};`}>
            {$dominantColorStore}
          </p>
        </section>
      {/if}

      <!-- Gradient additional section -->
      {#if paletteFetched}
        <section class="flex w-full max-w-md flex-col rounded-lg shadow-md">
          <div
            style={`background-image: radial-gradient(circle, ${darkestChromaticOklch} 0%,  ${darkestOklch} 85%);`}
            class="flex-1 rounded-lg"
          >
            <h2
              class="text-md h-1/2 p-2 font-bold"
              style={`color: ${lightestColor};`}
            >
              Gradient
            </h2>
            <!-- <pre -->
            <!--   style={`background-color: ${darkerDominantOklch};`} -->
            <!--   class="h-1/2 overflow-y-scroll p-1 text-xs"> -->
            <!--   {dominantOklch} -->
            <!-- </pre> -->
          </div>
        </section>
      {/if}

      <!-- First additional section -->
      {#if paletteFetched}
        <section class="flex w-full max-w-md flex-col rounded-lg shadow-md">
          <div
            style={`background-color: ${hexColor};`}
            class="h-1/2 flex-1 rounded-t-lg"
          >
            <h2 class="text-md h-1/2 p-2 font-bold">Tailwind Color</h2>
            <p class="h-1/2 p-2 text-lg">
              {colorInfo.colorName}
              {colorInfo.shade}
            </p>
          </div>
          <div
            style={`background-color: ${$dominantColorStore};`}
            class="h-1/2 flex-1 rounded-b-lg p-2 font-mono"
          >
            {$dominantColorStore}
          </div>
        </section>
      {/if}

      <!-- Gradient additional section -->
      {#if paletteFetched}
        <section class="flex w-full max-w-md flex-col rounded-lg shadow-md">
          <div
            style={`background-color: ${mostChromaticOklch};`}
            class="h-1/2 flex-1 rounded-t-lg"
          >
            <h2 class="text-md h-1/2 p-2 font-bold">Most Chromatic</h2>
            <pre
              style={`background-color: ${darkerDominantOklch};`}
              class="h-1/2 overflow-y-scroll p-1 text-xs">
              {dominantOklch}
            </pre>
          </div>
        </section>
      {/if}
    </div>

    {#if buttonVisible}
      <button
        on:click={fetchPalette}
        transition:fade
        class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-amber-600 px-6 font-medium text-neutral-200 transition hover:scale-110"
        ><span
          >Fetch Palette<br />
          <p class="font-lg">{countdown}</p></span
        >
        <div
          class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"
        >
          <div class="relative h-full w-8 bg-white/20"></div>
        </div></button
      >
      <!-- <button -->
      <!--   class="button btn absolute left-1/2 top-1/2 z-[50] -translate-x-1/2 -translate-y-1/2" -->
      <!--   on:click={fetchPalette} -->
      <!--   transition:fade>Fetch Palette</button -->
      <!-- > -->
    {/if}
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
</div>

<style>
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
