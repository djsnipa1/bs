import { writable, derived } from 'svelte/store';

const variables = {
  showCircleAnimationControls: true
};

export const youtubeUrl = writable('https://youtu.be/9B1SQX9a_hU');

// export const videoId = writable('M7lc1UVf-VE');
export const videoId = writable('9B1SQX9a_hU');

// Define the dependent store based on the base store
export const newYtUrl = derived(
  videoId,
  ($videoId) => `https://img.youtube.com/vi/${$videoId}/hqdefault.jpg` // Constructing the URL based on videoId
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

export const isVideoPlaying = writable(null);

export const isVideoPaused = writable(null);

export const playerStore = writable(null);

export const hideMainElements = writable(true);

export const isAnimationDone = writable(false);

export const showYoutubeTransition = writable(false);

export const showCircleAnimation = writable(false);

export const debugModeEnabled = writable(true);
