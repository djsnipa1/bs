<script>
  import { debugColorPaletteStore } from '$lib/stores/store';

  let colors = $debugColorPaletteStore;

  // const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6A0572'];
</script>

<div class="rounded-md bg-white p-2 text-xs shadow-lg">
  <h2 class="mb-1 font-bold">Color Palette</h2>
  <div class="flex space-x-1">
    {#each colors as color}
      <div class="flex flex-col items-center">
        <div
          class="h-6 w-6 rounded-sm shadow-inner"
          style="background-color: {color};"
          title={color}
        ></div>
        <span class="mt-0.5 text-[8px]">{color}</span>
      </div>
    {/each}
  </div>
</div>
