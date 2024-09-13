<script>
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
        l: baseColor.l,
        c: baseColor.c,
        h: adjustHue(baseColor.h + step),
        mode: 'lch'
      }));
    }

    return palettes;
  }

  console.log(toLCH('#C0FF00'));
  let newbase = toLCH('#C0FF00');

  const baseColor = {
    l: 50,
    c: 100,
    h: 0,
    mode: 'lch'
  };

  const palettes = createScientificPalettes(newbase);
  const analogousHex = palettes.analogous.map((colorLCH) =>
    formatHex(colorLCH)
  );
  const triadicHex = palettes.triadic.map((colorLCH) => formatHex(colorLCH));
  const tetradicHex = palettes.tetradic.map((colorLCH) => formatHex(colorLCH));

  let numCols = 5;
  let pName = 'tridatic';
  const paletteName = 'Pastel Dream';
  const colors = ['#FFD1DC', '#E0BBE4', '#957DAD', '#D0F0C0', '#F4C2C2'];

  function tailwindGridCols(arr) {
    if (arr.length === 3) {
      return 'grid-cols-3';
    } else if (arr.length === 4) {
      return 'grid-cols-4';
    } else if (arr.length === 5) {
      return 'grid-cols-5';
    } else {
      console.log('array was less than 3 or more than 5');
    }
  }
</script>

<!-- 1st palette -->
<div class="min-h-screen bg-slate-800 p-8 text-white">
  <div class="mx-auto max-w-md">
    <h2 class="mb-6 text-center text-xl font-semibold">Analgous</h2>
    <div class="flex justify-center">
      <div class="mb-6 grid grid-cols-5 gap-3">
        {#each colors as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-shadow duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-8 border-t border-slate-600" />

    <!-- 2nd palette -->
    <h2 class="mb-6 text-center text-xl font-semibold">Analogous</h2>
    <div class="flex justify-center">
      <div class={`mb-6 grid ${tailwindGridCols(analogousHex)} gap-3`}>
        {#each analogousHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-shadow duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-8 border-t border-slate-600" />

    <!-- 3rd palette -->
    <h2 class="mb-6 text-center text-xl font-semibold">Triadic</h2>
    <div class="flex justify-center">
      <div class={`mb-6 grid ${tailwindGridCols(triadicHex)} gap-3`}>
        {#each triadicHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-shadow duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-8 border-t border-slate-600" />

    <!-- 4th palette -->
    <h2 class="mb-6 text-center text-xl font-semibold">Tetradic</h2>
    <div class="flex justify-center">
      <div class={`mb-6 grid ${tailwindGridCols(tetradicHex)} gap-3`}>
        {#each tetradicHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-shadow duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-8 border-t border-slate-600" />
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
  }
</style>
