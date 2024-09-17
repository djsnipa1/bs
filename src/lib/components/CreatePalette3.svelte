<script>
  // import { draggable } from '@neodrag/svelte';
  // import createScientificPalettes from '$lib/components/CreatePalette2.svelte';
  // import ColorThief from 'color-thief-ts';
  import { converter, differenceEuclidean, nearest } from 'culori';

  // import { converter, differenceEuclidean, formatHex, nearest } from 'culori';
  // import { onMount } from 'svelte';

  function isColorEqual(c1, c2) {
    return c1.h === c2.h && c1.l === c2.l && c1.c === c2.c;
  }

  function discoverPalettes(colors) {
    const palettes = {};

    for (const color of colors) {
      let targetPalettes;
      // const targetPalettes = createScientificPalettes(color);

      for (const paletteType of Object.keys(targetPalettes)) {
        const palette = [];
        let variance = 0;

        for (const targetColor of targetPalettes[paletteType]) {
          // filter out colors already in the palette
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

  const toLCH = converter('lch');

  const baseColors = [
    '#FFB97A',
    '#FF957C',
    '#FF727F',
    '#FF5083',
    '#F02F87',
    '#C70084',
    '#9A007F',
    '#6A0076',
    '#33006B'
  ];

  const baseColorsLCH = baseColors.map((color) => toLCH(color));

  const palettes = discoverPalettes(baseColorsLCH);
  console.log(palettes);
</script>

<h2 class="text-2xl">Shit</h2>
