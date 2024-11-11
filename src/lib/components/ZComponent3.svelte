<script>
  import { browser } from '$app/environment';
  import { injectStyleString } from '$lib/util/zIndexes.js';

  const Z_INDEX_LAYERS = ['red', 'green', 'yellow', 'orange'];

  injectStyleString(browser, Z_INDEX_LAYERS);

  //
  // const makeZIndexes = (layers) =>
  //   layers.reduce((agg, layerName, index) => {
  //     const valueName = `z-index-${layerName}`;
  //     agg[valueName] = index * 100;
  //
  //     return agg;
  //   }, {});
  //
  // const zIndexes = makeZIndexes(Z_INDEX_LAYERS);
  //
  // // Format as CSS variables and inject to a top HTML element
  // const styleString = Object.entries(zIndexes)
  //   .map(([name, value]) => `--${name}: ${value}; `)
  //   .join('');
  //
  // if (browser) {
  //   document.querySelector('#app').setAttribute('style', styleString);
  // }
</script>

<div
  id="app"
  class="relative h-screen w-full border-2 border-dotted border-green-600 p-4 font-black"
>
  <div
    class="screen-1/2 rieht-2 absolute bottom-1/2 flex w-full items-center justify-center border-2 border-dashed border-cyan-500"
  >
    <div
      id="red"
      class="absolute left-12 top-16 z-[var(--z-index-red)] size-20 bg-red-500"
    ></div>
    <div
      id="green"
      class="absolute left-16 top-20 z-[var(--z-index-green)] size-20 bg-green-500"
    ></div>
    <div
      id="yellow"
      class="absolute left-20 top-24 z-[var(--z-index-yellow)] size-20 bg-yellow-500"
    ></div>
    <div
      id="orange"
      class="absolute left-24 top-28 z-[var(--z-index-orange)] size-20 bg-orange-500"
    ></div>
  </div>
</div>
