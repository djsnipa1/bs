function getActiveBreakpointAndScreenSize() {
  let screenWidth = window.innerWidth;

  if (window.matchMedia('(min-width: 1280px)').matches) {
    console.log(`Current Breakpoint: xl, Current Width: ${screenWidth}px`);
    return 'xl';
  } else if (window.matchMedia('(min-width: 1024px)').matches) {
    console.log(`Current Breakpoint: lg, Current Width: ${screenWidth}px`);
    return 'lg';
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    console.log(`Current Breakpoint: md, Current Width: ${screenWidth}px`);
    return 'md';
  } else if (window.matchMedia('(min-width: 640px)').matches) {
    console.log(`Current Breakpoint: sm, Current Width: ${screenWidth}px`);
    return 'sm';
  } else {
    console.log(`Current Breakpoint: xs, Current Width: ${screenWidth}px`);
    return 'xs'; // Default or smaller than smallest breakpoint
  }
}

export function tailwindSize() {
  console.log(getActiveBreakpointAndScreenSize());
}
