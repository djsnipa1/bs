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
  $: console.log(currentGradients);

  function switchGradient() {
    currentGradients =
      currentGradients === gradients ? newGradients : gradients;
  }

  $: cssVarStyles = Object.entries(currentGradients)
    .map(([key, value]) => `--${key}:${value}`)
    .join(';');

  const Feeling = {
    Sad: 1,
    Neutral: 2,
    Happy: 3
  };

  // Usage
  let currentFeeling = Feeling.Neutral;

  if (currentFeeling === Feeling.Happy) {
    console.log('You are happy!');
  } else if (currentFeeling === Feeling.Sad) {
    console.log('You are sad.');
  } else {
    console.log('You are feeling neutral.');
  }
  const feelingColorMap = {
    [Feeling.Sad]: ['#394e7a', '	#8e9ac7', '#4ee'],
    [Feeling.Neutral]: ['#22d', '#c8f8ff', '#6d2'],
    [Feeling.Happy]: ['#39f', '#f4e54d', '#fa3']
  };

  const feelingLabelMap = {
    [Feeling.Sad]: 'Could be better',
    [Feeling.Neutral]: 'Okay',
    [Feeling.Happy]: 'Happy'
  };

  let wrapperRef = null;
  const feeling = writable(Feeling.Neutral);

  $: {
    const [a, b, c] = feelingColorMap[$feeling];
    if (wrapperRef) {
      wrapperRef.style.setProperty('--color-a', a);
      wrapperRef.style.setProperty('--color-b', b);
      wrapperRef.style.setProperty('--color-c', c);
    }
  }

  function handleChange(event) {
    feeling.set(Number(event.target.value));
  }

  onMount(() => {
    // Initial setup if needed
  });
</script>

<div style={cssVarStyles} class="absolute min-h-screen min-w-full">
  <div
    class="background-gradient absolute z-[-10] min-h-screen min-w-full duration-[3000ms] [transition-property:_--color1,_--color2,_--color3,_--color4]"
  ></div>
</div>

<!-- React Div -->
<main
  class="absolute z-[999999999] flex min-h-[100dvh] w-full items-center justify-center"
>
  <button class="button btn" on:click={switchGradient}>Switch</button>

  <!-- <div style={cssVarStyles} class="box background-gradient"></div> -->
  <div
    bind:this={wrapperRef}
    class="before:animate-blob after:animate-blob-reverse relative mx-auto aspect-[9/16] w-[360px] max-w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[--color-a] via-[--color-b] to-[--color-c] p-8 text-white duration-500 ease-in [transition-property:_--color-a,_--color-b,_--color-c] before:absolute before:left-[20%] before:top-[10%] before:h-[50%] before:w-[70%] before:origin-[60%] before:rounded-3xl before:bg-gradient-to-br before:from-[--color-a] before:to-[--color-b] before:blur-[50px] before:brightness-125 after:absolute after:left-[40%] after:top-[30%] after:h-[80%] after:w-[70%] after:origin-[60%] after:rounded-3xl after:bg-gradient-to-br after:from-[--color-a] after:to-[--color-b] after:blur-[50px] after:brightness-125"
  >
    <div class="relative z-10">
      <h1 class="mb-12 text-5xl font-medium leading-tight">
        How are you feeling today?
      </h1>

      <h2 class="mb-4 text-center text-2xl font-medium">
        {feelingLabelMap[$feeling]}
      </h2>

      <input
        class="range"
        on:change={handleChange}
        type="range"
        min="1"
        bind:value={$feeling}
        max="3"
        step="1"
      />
    </div>
  </div>
</main>

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
      --color1,
      --color2,
      --color3,
      --color4 5.5s;
  }

  .gradient-test {
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
  /*
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

html,
body {
  margin: 0;
  --color-a: #ccc;
  --color-b: #afaf;
  --color-c: #33aa;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100dvh;
}

.wrapper {
  width: 300px;
  margin: 0 auto;
  aspect-ratio: 9/16;
  border-radius: 12px;
  transition: 500ms ease-in;
  transition-property: --color-a, --color-b, --color-c;
  background: linear-gradient(45deg, var(--color-a), var(--color-b), var(--color-c));
  position: relative;
  overflow: hidden;
  color: white;

}

.wrapper::before {
  content: "";
  position: absolute;
  background: linear-gradient(45deg, var(--color-a), var(--color-b));
  filter: blur(50px) brightness(1.5);
  left: 20%;
  top: 10%;
  width: 70%;
  height: 50%;
  border-radius: 25px;
  animation: blob 8s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
  transform-origin: 60%;
}

.wrapper::after {
  content: "";
  position: absolute;
  background: linear-gradient(45deg, var(--color-a), var(--color-b));
  filter: blur(50px) brightness(1.5);
  left: 40%;
  top: 30%;
  width: 70%;
  height: 80%;
  border-radius: 25px;
  animation: blob 10s infinite cubic-bezier(0.215, 0.61, 0.355, 1) reverse;
  transform-origin: 60%;
}

.content {
  position: relative;
  z-index: 2;
}

.title {
  line-height: 1.2;
  font-size: 42px;
}

.label {
  text-align: center;
  font-size: 32px;
}

input[type="range"] {
  appearance: none;
  width: 100%;
  background: white;
  height: 2px;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  background: var(--color-b);
  border: 2px solid white;
  width: 36px;
  height: 36px;
  border-radius: 36px;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  appearance: none;
  background: var(--color-b);
  border: 2px solid white;
  width: 36px;
  height: 36px;
  border-radius: 36px;
  cursor: pointer;
}

@keyframes blob {
  0% {
    translate: 0 0;
    rotate: 0deg;
  }
  30% {
    rotate: 40deg;
  }
  50% {
    transform: translate(300px, 390px) scale(1.1);
  }
  80% {
    rotate: 90%;
  }
}
*/
  @property --color-a {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }

  @property --color-b {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }

  @property --color-c {
    syntax: '<color>';
    inherits: true;
    initial-value: transparent;
  }

  property --a {
    syntax: '<angle>';
    inherits: false;
    initial-value: 90deg;
  }
  @property --l {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 10%;
  }
  @property --c {
    syntax: '<color>';
    inherits: false;
    initial-value: red;
  }

  .box {
    /*  needed for firefox to have a valid output */
    --a: 20deg;
    --l: 10%;
    --c: red;
    /**/
    cursor: pointer;
    width: 500px;
    height: 400px;
    margin: 15px;
    display: inline-block;
    transition:
      --a 0.5s 0.1s,
      --l 0.5s,
      --c 0.2s;
    background: linear-gradient(
      var(--a),
      var(--c) var(--l),
      blue,
      var(--c) calc(100% - var(--l))
    );
    animation: a 1s linear infinite alternate;
  }

  @keyframes a {
    from {
      --a: 20deg;
      --l: 10%;
      --c: red;
    }
    50% {
      --c: pink;
    }
    to {
      --a: 300deg;
      --l: 40%;
      --c: green;
    }
  }
</style>
