<script>
  let sliderValue = 50;

  function decreaseValue() {
    sliderValue = Math.max(0, sliderValue - 10);
  }

  function increaseValue() {
    sliderValue = Math.min(100, sliderValue + 10);
  }

  function resetValue() {
    sliderValue = 50;
  }
</script>

<div
  class="flex min-h-screen flex-col items-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8"
>
  <div class="glassmorphic-container">
    <div class="slider-container">
      <input
        type="range"
        bind:value={sliderValue}
        min="0"
        max="100"
        class="slider"
      />
    </div>
    <p class="mt-2 text-lg font-semibold text-white">Value: {sliderValue}</p>
    <div class="mt-4 flex justify-center space-x-4">
      <button on:click={decreaseValue} class="glassmorphic-button">
        Decrease
      </button>
      <button on:click={resetValue} class="glassmorphic-button"> Reset </button>
      <button on:click={increaseValue} class="glassmorphic-button">
        Increase
      </button>
    </div>
  </div>
</div>

<style>
  :root {
    --slider-width: 300px;
    --slider-height: 6px;
    --thumb-size: 20px;
    --slider-color: rgba(255, 255, 255, 0.7);
    --slider-bg: rgba(255, 255, 255, 0.2);
  }

  .glassmorphic-container {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .slider-container {
    width: var(--slider-width);
    margin: 20px 0;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: var(--slider-height);
    border-radius: 5px;
    background: var(--slider-bg);
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background: var(--slider-color);
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.2s;
  }

  .slider::-moz-range-thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background: var(--slider-color);
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.2s;
    border: none;
  }

  .slider::-webkit-slider-thumb:hover,
  .slider::-webkit-slider-thumb:focus {
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);
  }

  .slider::-moz-range-thumb:hover,
  .slider::-moz-range-thumb:focus {
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);
  }

  /* For Firefox */
  .slider::-moz-range-progress {
    background-color: var(--slider-color);
    height: var(--slider-height);
    border-radius: 5px;
  }

  /* For IE/Edge */
  .slider::-ms-fill-lower {
    background-color: var(--slider-color);
    border-radius: 5px;
  }

  .glassmorphic-button {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .glassmorphic-button:hover,
  .glassmorphic-button:focus {
    background: rgba(255, 255, 255, 0.3);
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .glassmorphic-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
</style>
