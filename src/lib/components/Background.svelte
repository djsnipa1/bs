<script>
  // Import necessary components and utilities
  import { DebugColorPalette } from '$lib';
  import { debugModeEnabled, vibrantColorStore } from '$lib/stores/store.js';
  import { oklchObj2String } from '$lib/util/colorUtils';
  import { converter } from 'culori';
  import { formatHex, formatRgb, modeLch, modeOklch, useMode } from 'culori/fn';

  // Define color conversion modes
  const toLch = useMode(modeLch);
  const toOklch = useMode(modeOklch);

  // Initialize color variables
  let hexColor,
    hexColorDarker,
    hexColorLighter = null;

  // Reactive statement to update colors when vibrantColorStore changes
  $: if (Object.keys($vibrantColorStore).length !== 0) {
    const testColor = toLch($vibrantColorStore);
    console.log('testColor: ', testColor);

    const okLchColor = toOklch($vibrantColorStore);
    const oklchString = oklchObj2String(okLchColor);
    console.log('okLchColor: ', okLchColor);
    console.log(
      `%c${oklchString}`,
      `background-color: ${oklchString}; color: #fff;`
    );

    const testColorDarker = { ...testColor, l: testColor.l - 10 };
    const testColorLighter = { ...testColor, l: testColor.l + 20 };
    console.log('testColorDarker: ', testColorDarker);
    console.log('testColorDarkerHex: ', formatHex(testColorDarker));

    const rgbColor = formatRgb(testColor);
    console.log(rgbColor);
    hexColor = formatHex(testColor);
    hexColorDarker = formatHex(testColorDarker);
    hexColorLighter = formatHex(testColorLighter);

    console.log(
      `%c${hexColor}`,
      `background-color: ${hexColor}; font-weight: bold; color:white;`
    );

    const vibrantObject = { hexColor, hexColorDarker, hexColorLighter };
    vibrantColorStore.set(vibrantObject);
  }

  // Define initial gradient colors
  const initialGradients = {
    color1: 'hsl(192deg 76% 50%)',
    color2: 'hsl(203deg 100% 43%)',
    color3: 'hsl(213deg 80% 40%)',
    color4: 'hsl(215deg 80% 29%)'
  };

  // Reactive statement to update newGradients when hexColorLighter, hexColor, and hexColorDarker change
  $: newGradients = {
    color1: hexColorLighter,
    color2: hexColor,
    color3: hexColorDarker,
    color4: hexColorDarker
  };

  // Function to convert an object to CSS variables
  const objectToCssVars = (object) => {
    return Object.entries(object)
      .map(([key, value]) => `--${key}:${value}`)
      .join(';');
  };

  // Initialize finalCssVars with initialGradients
  let isGradients = true;

  // Function to wait for newGradients to be populated
  const waitForNewGradients = () => {
    return new Promise((resolve) => {
      const checkGradients = setInterval(() => {
        if (
          newGradients.color1 &&
          newGradients.color2 &&
          newGradients.color3 &&
          newGradients.color4
        ) {
          clearInterval(checkGradients);
          resolve();
        }
      }, 100);
    });
  };

  // Function to switch gradient colors
  export const switchGradient = async () => {
    console.log(
      `%ccalled switchGradient`,
      `font-weight: bold; background-color: darkmagenta; color: #fff;`
    );

    await waitForNewGradients();

    if (isGradients) {
      finalCssVars = objectToCssVars(newGradients);
    } else {
      finalCssVars = objectToCssVars(initialGradients);
    }

    isGradients = !isGradients;
  };

  // Reactive statement to update finalCssVars when initialGradients or newGradients change
  $: finalCssVars = objectToCssVars(initialGradients);
</script>

<div style={finalCssVars} class="absolute min-h-screen min-w-full">
  <div
    class="background-gradient absolute z-[-10] min-h-screen min-w-full bg-[radial-gradient(circle_at_50%_25%,var(--color1)_0%,var(--color2)_33%,var(--color3)_67%,var(--color4)_100%)]"
  >
    <div class="relative flex h-screen w-screen items-center justify-center">
      {#if $debugModeEnabled}
        <div class="absolute bottom-1/4 -translate-y-3/4 transform">
          <DebugColorPalette />
        </div>
      {/if}
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

  .background-gradient {
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
