import { writable, derived } from 'svelte/store';

// const colors = [
//   { mode: 'hex', color: '#FF6B6B' },
//   { mode: 'hex', color: '#4ECDC4' },
//   { mode: 'hex', color: '#FFD93D' },
//   { mode: 'hex', color: '#6A0572' }
// ];
const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6A0572'];

const variables = {
  showCircleAnimationControls: true
};

export const youtubeUrl = writable('https://youtu.be/9B1SQX9a_hU');

// export const videoId = writable('M7lc1UVf-VE');
export const videoId = writable('9B1SQX9a_hU');

// Define the dependent store based on the base store
export const youtubeThumbnailUrl = derived(
  videoId,
  ($videoId) => `api/fetch-image?id=${$videoId}`
);

export const cssPosition = writable(0);
// nudges cssPosition left in FineTuning.svelte
export function nudgeLeft() {
  cssPosition.update((value) => {
    if (value - 3 < -33) {
      return -33;
    } else {
      return value - 3;
    }
  });
}
export function nudgeRight() {
  cssPosition.update((value) => {
    if (value + 3 > 33) {
      return 33;
    } else {
      return value + 3;
    }
  });
}

export const isControlsOpen = writable(false);

export const isUrlOpen = writable(false);

export const menuOpen = writable(false);

export const isPlayerReady = writable(false);

export const isVideoLoaded = writable(false);

export const isVideoPlaying = writable(null);

export const isVideoPaused = writable(null);

export const playerStore = writable(null);

export const hideMainElements = writable(true);

export const isAnimationDone = writable(false);

export const showYoutubeTransition = writable(false);

export const showCircleAnimation = writable(false);

export const debugModeEnabled = writable(true);

export const imageUrlStore = writable(null);

export const culoriSortColors = writable({});

export const dominantColorStore = writable(null);

export const paletteColorStore = writable([]);

export const vibrantColorStore = writable({});

export const triggerStore = writable(false);

export const debugColorPaletteStore = writable(colors);

