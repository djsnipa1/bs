import { get } from 'svelte/store';
import { videoId, newYtUrl } from '$lib/stores/store.js';

let color,
  vibrantColors,
  vibrantRGBA = null;

const thumbnailUrl = get(newYtUrl);

export const load = async ({ fetch, params }) => {
  const colorRes = await fetch(
    `/api/color?${new URLSearchParams({ image: thumbnailUrl }).toString()}`
  );
  if (colorRes.ok) {
    const colorJson = await colorRes.json();
    // color = (await colorRes.json()).color;
    //color = colorJson.color;
    vibrantColors = colorJson.vibrantColors;
    vibrantRGBA = colorJson.vibrantRGBA;
  }

  return {
    //color,
    vibrantColors,
    vibrantRGBA
  };
};
