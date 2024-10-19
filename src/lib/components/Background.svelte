<script>
  import { vibrantColorStore } from '$lib/stores/store.js';
  import { converter } from 'culori';
  import { formatHex, formatRgb, modeLch, modeOklch, useMode } from 'culori/fn';

  const toLch = useMode(modeLch);
  const toOklch = useMode(modeOklch);
  // const toOklch = converter('oklch');
  let hexColor,
    hexColorDarker,
    hexColorLighter = null;

  $: if ($vibrantColorStore !== null) {
    let testColor = toLch($vibrantColorStore);
    console.log('testColor: ', testColor);

    let okLchColor = toOklch($vibrantColorStore);
    console.log('okLchColor : ', okLchColor);

    const testColorDarker = {
      ...testColor,
      l: testColor.l - 10
    };
    const testColorLighter = {
      ...testColor,
      l: testColor.l + 20
    };
    console.log('testColorDarker: ', testColorDarker);
    console.log('testColorDarkerHex: ', formatHex(testColorDarker));

    let rgbColor = formatRgb(testColor);
    console.log(rgbColor);
    hexColor = formatHex(testColor);
    hexColorDarker = formatHex(testColorDarker);
    hexColorLighter = formatHex(testColorLighter);
    console.log('hexColor: ', hexColor);
    // formatHex(testColorDarker)
    // formatRgb(testColorDarker)
  }

  let gradients = {
    color1: 'hsl(192deg 76% 50%)',
    color2: 'hsl(203deg 100% 43%)',
    color3: 'hsl(213deg 80% 40%)',
    color4: 'hsl(215deg 80% 29%)'
  };

  // let newGradients = {
  //   color1: 'yellow',
  //   color2: 'orange',
  //   color3: 'orangered',
  //   color4: 'red'
  // };
  const hexColors = ['#FF5733', '#33FFCE', '#A633FF', '#FF33D6'];

  // let newGradients = {
  //   color1: hexColors[0],
  //   color2: hexColors[1],
  //   color3: hexColors[2],
  //   color4: hexColors[3]
  // };

  $: newGradients = {
    color1: hexColorLighter,
    color2: hexColor,
    color3: hexColorDarker,
    color4: hexColorDarker
  };

  $: currentGradients = gradients;

  $: cssVarStyles = Object.entries(currentGradients)
    .map(([key, value]) => `--${key}:${value}`)
    .join(';');

  export function switchGradient() {
    currentGradients =
      currentGradients === gradients ? newGradients : gradients;
  }
</script>

<div style={cssVarStyles} class="absolute min-h-screen min-w-full">
  <div
    class="background-gradient absolute z-[-10] min-h-screen min-w-full"
  ></div>
  <button
    class="button btn absolute top-80 z-[999999999]"
    on:click={switchGradient}>Switch</button
  >
</div>

<!-- React Div -->
<!-- <main -->
<!-- class="absolute z-[999999999] flex min-h-[100dvh] w-full items-center justify-center" -->
<!-- > -->
<!-- <button class="button btn" on:click={switchGradient}>Switch</button> -->
<!-- </main> -->

<style>
  :root {
    --color1: hsl(192deg 76% 50%);
    --color2: hsl(203deg 100% 43%);
    --color3: hsl(213deg 80% 40%);
    --color4: hsl(215deg 80% 29%);
  }

  /* .background-gradient { */
  /*   background-image: radial-gradient( */
  /*     circle, */
  /*     var(--color1) 0%, */
  /*     var(--color4) 100% */
  /*   ); */
  /*   transition: */
  /*     --color1 0.5s, */
  /*     --color4 1.6s; */
  /* } */

  .background-gradient {
    background-image: radial-gradient(
      circle at 50% 25%,
      var(--color1) 0%,
      var(--color2) 33%,
      var(--color3) 67%,
      var(--color4) 100%
    );
    transition:
      --color1 0.25s,
      --color2 0.75s,
      --color3 1.25s,
      --color4 1.75s;
  }

  @property --color1 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --color2 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --color3 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --color4 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
</style>
