import { quintOut } from 'svelte/easing';

export function circleTransition(node, { duration = 1000, delay = 0 }) {
  //const o = +getComputedStyle(node).clipPath;

  return {
    duration,
    delay,
    easing: quintOut,
    css: (t) => `clip-path: circle(${t * 100}% at center);`
  };
}
