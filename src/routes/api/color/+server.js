import { json } from '@sveltejs/kit';
//import sharp from 'sharp';
import Vibrant from 'node-vibrant';

export const GET = async ({ url, fetch }) => {
  const imageUrl = url.searchParams.get('image');

  if (imageUrl) {
    const image = await fetch(imageUrl).then((res) => res.arrayBuffer());
    // const stats = await sharp(Buffer.from(image)).stats();
    // const [r, g, b] = stats.channels.map((c) => c.mean);

    // Extracting RGB values from the "Vibrant" option
    // found out how to make this work here:
    // https://github.com/lsmacedo/spotify-track-color/blob/274678bea27b0641f4b4e25b16ac93a4014bb097/functions/src/spotify.ts#L94
    //  const darkVibrant = (await Vibrant.from(imageUrl).getPalette()).DarkVibrant?.hex;

    const palette = await Vibrant.from(imageUrl).getPalette();

    const vibrantColors = {
      vibrant: palette.Vibrant?.hex,
      lightVibrant: palette.LightVibrant?.hex,
      darkVibrant: palette.DarkVibrant?.hex,
      muted: palette.Muted?.hex,
      lightMuted: palette.LightMuted?.hex,
      darkMuted: palette.DarkMuted?.hex
    };

    const vibrantPalette = palette.Vibrant;
    const {
      rgb: [vr, vg, vb]
    } = vibrantPalette;
    const rgbaString = `rgba(${vr}, ${vg}, ${vb})`;

    return json({
      // color: `rgba(${r},${g},${b})`
      vibrantColors: vibrantColors,
      vibrantRGBA: rgbaString,
      palette: vibrantPalette
    });
  }
  return json({ color: null });
};
