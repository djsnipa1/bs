import BezierEasing from "bezier-easing";

export function customFadeBlur(node, {delay = 0, duration = 400, blurAmount = 10}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity || 1;
    const initial_scale = 1.3;
    const final_scale = 1;
    const customEase = BezierEasing(0.5, 0, 0.75, 0);

    return {
      delay,
      duration,
      easing: customEase,
      css: (t, u) => `
      opacity: ${target_opacity * t};
      filter: blur(${u * blurAmount}px);
      transform: scale(${initial_scale - (initial_scale - final_scale) * t});
    `,
    };
  }