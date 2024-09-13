<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let gradients = {
    color1: 'hsl(192deg 76% 50%)',
    color2: 'hsl(203deg 100% 43%)',
    color3: 'hsl(213deg 80% 40%)',
    color4: 'hsl(215deg 80% 29%)'
  };

  let newGradients = {
    color1: 'yellow',
    color2: 'orange',
    color3: 'orangered',
    color4: 'red'
  };

  $: currentGradients = gradients;

  $: cssVarStyles = Object.entries(currentGradients)
    .map(([key, value]) => `--${key}:${value}`)
    .join(';');

  function switchGradient() {
    currentGradients =
      currentGradients === gradients ? newGradients : gradients;
  }
</script>

<div style={cssVarStyles} class="absolute min-h-screen min-w-full">
  <div
    class="background-gradient absolute z-[-10] min-h-screen min-w-full"
  ></div>
  <button
    class="button btn absolute top-80 z-[999999999]"
    on:click={switchGradient}>Switch</button
  >
</div>

<!-- React Div -->
<!-- <main -->
<!-- class="absolute z-[999999999] flex min-h-[100dvh] w-full items-center justify-center" -->
<!-- > -->
<!-- <button class="button btn" on:click={switchGradient}>Switch</button> -->
<!-- </main> -->

<style>
  :root {
    --color1: hsl(192deg 76% 50%);
    --color2: hsl(203deg 100% 43%);
    --color3: hsl(213deg 80% 40%);
    --color4: hsl(215deg 80% 29%);
  }

  .background-gradient {
    background-image: radial-gradient(
      circle,
      var(--color1) 0%,
      var(--color2) 33%,
      var(--color3) 67%,
      var(--color4) 100%
    );
    transition:
      --color1 0.5s,
      --color2 1s,
      --color3 1.5s,
      --color4 2s;
  }

  @property --color1 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --color2 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --color3 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
  @property --color4 {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }
</style>
