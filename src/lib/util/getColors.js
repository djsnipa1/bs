import ColorThief from 'color-thief-ts';

export async function getPalette(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 5);
      const dominantColor = colorThief.getColor(img);

      // Resolve with both the palette and the dominant color
      resolve({ palette, dominantColor });
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
}

