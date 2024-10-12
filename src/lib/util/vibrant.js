import Vibrant from 'node-vibrant';

export async function getPaletteFromImage(imageUrl) {
    try {
        const palette = await Vibrant.from(imageUrl).getPalette();
        return palette;
    } catch (error) {
        console.error('Error extracting palette:', error);
        return null;
    }
}
