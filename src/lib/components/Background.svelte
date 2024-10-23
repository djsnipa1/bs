<script>
  import { DebugColorPalette } from '$lib';
  import { vibrantColorStore } from '$lib/stores/store.js';
  import { oklchObj2String } from '$lib/util/colorUtils';
  import { converter } from 'culori';
  import { formatHex, formatRgb, modeLch, modeOklch, useMode } from 'culori/fn';

  const toLch = useMode(modeLch);
  const toOklch = useMode(modeOklch);

  let hexColor,
    hexColorDarker,
    hexColorLighter = null;

  $: if (Object.keys($vibrantColorStore).length !== 0) {
    let testColor = toLch($vibrantColorStore);
    console.log('testColor: ', testColor);

    let okLchColor = toOklch($vibrantColorStore);
    let oklchString = oklchObj2String(okLchColor);
    console.log('okLchColor: ', okLchColor);
    console.log(
      `%c${oklchString}`,
      `background-color: ${oklchString}; color: #fff;`
      // `background-color: oklch(${okLchColor.l} ${okLchColor.c} ${okLchColor.h}); color: #fff;`
    );

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

    console.log(
      `%c${hexColor}`,
      `background-color: ${hexColor}; font-weight: bold; color:white;`
    );

    let vibrantObject = { hexColor, hexColorDarker, hexColorLighter };
    vibrantColorStore.set(vibrantObject);
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
  <div class="background-gradient absolute z-[-10] min-h-screen min-w-full">
    <div class="relative flex h-screen w-screen items-center justify-center">
      <div class="absolute bottom-1/4 -translate-y-2/4 transform">
        <DebugColorPalette />
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --color1: hsl(192deg 76% 50%);
    --color2: hsl(203deg 100% 43%);
    --color3: hsl(213deg 80% 40%);
    --color4: hsl(215deg 80% 29%);
    --oklch-grad: linear-gradient(
      circle in oklch decreasing hue,
      color(display-p3 0.25 0.25 1) 0%,
      color(display-p3 1 0.85 0.3) 33%,
      oklch(0.8 0.3 236) 66%,
      oklch(0.8 0.3 146) 100%
    );
  }

  .oklch-gradient {
    background-image: var(--oklch-grad);
  }
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
