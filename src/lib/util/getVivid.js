import Vibrant from 'node-vibrant';
// import * as Vibrant from 'node-vibrant'
// import Vibrant from "node-vibrant/dist/vibrant"

export async function getVividColors(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = async () => {
      try {
        const v = new Vibrant(img);
        const palette = await v.getPalette();
        console.log('Vibrant Palette:', JSON.stringify(palette));
        // console.log('vibrant hex: ', palette.Vibrant.getHex());
        // Resolve with the actual palette instead of the promise
        resolve(palette.Vibrant.getHex());
      } catch (error) {
        reject(error);
      }
    };

    // img.onload = async () => {
    //   try {
    //     // let vibrant = null;
    //     let v = new Vibrant(img)
    //     let temp = v.getPalette((err, palette) => console.log(JSON.stringify(palette)))
    //     console.log('temp: ', temp)
    //     // const colors = await Vibrant.from(img).getPalette();
    //     // resolve(colors);
    //     resolve(JSON.stringify(temp));
    //   } catch (error) {
    //     reject(error);
    //   }
    // };

    img.onerror = (error) => {
      reject(error);
    };
  });
}

// Example usage:
// getVividColors(imageUrl)
//   .then(colors => {
//     console.log(colors);
//   })
//   .catch(error => {
//     console.error('Error fetching colors:', error);
// });


// export async function getVividColors(imageUrl) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//
//     img.src = imageUrl;
//
//     img.onload = () => {
// let v = new Vibrant.from(imageUrl, opts);
// Promise
// v.getPalette().then((palette) => console.log(palette))
// async function getColors(imageUrl) {
//   const colors = await Vibrant.from(imageUrl).getPalette();
//   return colors;
// }

// Example usage
// getColors(imageUrl)
//   .then(colors => {
//     console.log(colors);
//   })
//   .catch(error => {
//     console.error('Error fetching colors:', error);
//   });

// Promise
// Vibrant.from(imageUrl).getPalette()
//   .then((palette) => console.log(palette))

// Using constructor
// let v = new Vibrant('path/to/image', opts)
// v.getPalette((err, palette) => console.log(palette))

// const palette = colorThief.getPalette(img, 9);
// const dominantColor = colorThief.getColor(img);
// const vibrantColors = {
//   vibrant: palette.Vibrant?.hex,
//   lightVibrant: palette.LightVibrant?.hex,
//   darkVibrant: palette.DarkVibrant?.hex,
//   muted: palette.Muted?.hex,
//   lightMuted: palette.LightMuted?.hex,
//   darkMuted: palette.DarkMuted?.hex
// };
// const vibrantPalette = palette.Vibrant;
// const {
// rgb: [vr, vg, vb]
// } = vibrantPalette;
// const rgbaString = `rgba(${vr}, ${vg}, ${vb})`;

// const json = {
// vibrantColors: vibrantColors,
//   vibrantRGBA: rgbaString,
//   palette: vibrantPalette
// };
// Resolve with both the palette and the dominant color
// resolve({ json });
// };

//   img.onerror = (error) => {
//     reject(error);
//   };
// });

//   if (imageUrl) {
//     const image = await fetch(imageUrl).then((res) => res.arrayBuffer());
//
//     const palette = await Vibrant.from(imageUrl).getPalette();
//
//     const vibrantColors = {
//       vibrant: palette.Vibrant?.hex,
//       lightVibrant: palette.LightVibrant?.hex,
//       darkVibrant: palette.DarkVibrant?.hex,
//       muted: palette.Muted?.hex,
//       lightMuted: palette.LightMuted?.hex,
//       darkMuted: palette.DarkMuted?.hex
//     };
//
//     const vibrantPalette = palette.Vibrant;
//     const {
//       rgb: [vr, vg, vb]
//     } = vibrantPalette;
//     const rgbaString = `rgba(${vr}, ${vg}, ${vb})`;
//
//     return json({
//       // color: `rgba(${r},${g},${b})`
//       vibrantColors: vibrantColors,
//       vibrantRGBA: rgbaString,
//       palette: vibrantPalette
//     });
//   }
// }

