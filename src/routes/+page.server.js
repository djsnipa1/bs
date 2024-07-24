import { get } from 'svelte/store';
import { videoId } from '$lib/stores/store.js';

let newVideoId = get(videoId);

export function load({ cookies }) {
  //const visited = cookies.get('visited');

  cookies.set('videoId', newVideoId, { path: '/' });

  return {
    videoId: newVideoId
  };
}
