<script>
  import { draggable } from '@neodrag/svelte';
  import ColorThief from 'color-thief-ts';
  import { converter, differenceEuclidean, formatHex, nearest } from 'culori';
  import { onMount } from 'svelte';

  const colorThief = new ColorThief();
  const toLCH = converter('lch');

  function adjustHue(val) {
    if (val < 0) val += Math.ceil(-val / 360) * 360;

    return val % 360;
  }

  export function createScientificPalettes(baseColor) {
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

  let mainColor = '#12b080';
  console.log(toLCH('#C0FF00'));
  let newbase = toLCH(mainColor);

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
  const complementaryHex = palettes.complementary.map((colorLCH) =>
    formatHex(colorLCH)
  );
  const splitComplementaryHex = palettes.splitComplementary.map((colorLCH) =>
    formatHex(colorLCH)
  );

  let numCols = 5;
  let pName = 'tridatic';
  const paletteName = 'Pastel Dream';
  const colors = ['#FFD1DC', '#E0BBE4', '#957DAD', '#D0F0C0', '#F4C2C2'];

  function tailwindGridCols(arr) {
    if (arr.length === 2) {
      return 'grid-cols-2';
    } else if (arr.length === 3) {
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
<div
  use:draggable
  class="my-4 rounded-sm border border-slate-300 bg-slate-800 p-2 text-white shadow-lg"
>
  <div class="mx-auto max-w-md">
    <h2 class="mb-2 text-center text-lg font-semibold">
      {mainColor}
    </h2>
    <div
      class="mx-auto mb-2 mb-2 flex aspect-square h-12 justify-center rounded-md"
      style={`background-color: ${mainColor};`}
    />
    <hr class="my-2 border-t border-slate-600" />
    <!-- <h2 class="mb-2 text-center text-lg font-semibold">Analgous</h2> -->
    <!-- <div class="flex justify-center"> -->
    <!--   <div class="mb-2 grid grid-cols-5 gap-3"> -->
    <!--     {#each colors as color} -->
    <!--       <div -->
    <!--         class="aspect-square size-8 rounded-md shadow-sm transition-all duration-300 ease-out hover:scale-150 hover:shadow-md" -->
    <!--         style="background-color: {color};" -->
    <!--         title={color} -->
    <!--       /> -->
    <!--     {/each} -->
    <!--   </div> -->
    <!-- </div> -->
    <!-- <hr class="my-2 border-t border-slate-600" /> -->

    <!-- 2nd palette -->
    <h2 class="mb-2 text-center text-lg font-semibold">Analogous</h2>
    <div class="flex justify-center">
      <div class={`mb-2 grid ${tailwindGridCols(analogousHex)} gap-3`}>
        {#each analogousHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-all duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-2 border-t border-slate-600" />

    <!-- 3rd palette -->
    <h2 class="mb-2 text-center text-lg font-semibold">Triadic</h2>
    <div class="flex justify-center">
      <div class={`mb-2 grid ${tailwindGridCols(triadicHex)} gap-3`}>
        {#each triadicHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-all duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-2 border-t border-slate-600" />

    <!-- 4th palette -->
    <h2 class="mb-2 text-center text-lg font-semibold">Tetradic</h2>
    <div class="flex justify-center">
      <div class={`mb-2 grid ${tailwindGridCols(tetradicHex)} gap-3`}>
        {#each tetradicHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-all duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-2 border-t border-slate-600" />

    <!-- 5th palette -->
    <h2 class="mb-2 text-center text-lg font-semibold">Complentary</h2>
    <div class="flex justify-center">
      <div class={`mb-2 grid ${tailwindGridCols(complementaryHex)} gap-3`}>
        {#each complementaryHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-all duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-2 border-t border-slate-600" />

    <!-- 6th palette -->
    <h2 class="mb-2 text-center text-lg font-semibold">Split Complentary</h2>
    <div class="flex justify-center">
      <div class={`mb-2 grid ${tailwindGridCols(splitComplementaryHex)} gap-3`}>
        {#each splitComplementaryHex as color}
          <div
            class="aspect-square size-8 rounded-md shadow-sm transition-all duration-300 ease-out hover:scale-150 hover:shadow-md"
            style="background-color: {color};"
            title={color}
          />
        {/each}
      </div>
    </div>
    <hr class="my-2 border-t border-slate-600" />
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
  }

  /* div { */
  /*   @apply border border-red-500; */
  /* } */
</style>
