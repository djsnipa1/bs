<script>
  const colors = [
    { name: 'Coral', hex: '#FF6B6B' },
    { name: 'Teal', hex: '#4ECDC4' },
    { name: 'Yellow', hex: '#FFD93D' },
    { name: 'Lavender', hex: '#6A0572' }
  ];
</script>

<div class="rounded-md bg-white p-2 text-xs shadow-lg">
  <h2 class="mb-1 font-bold">Color Palette</h2>
  <div class="flex space-x-1">
    {#each colors as color}
      <div class="flex flex-col items-center">
        <div
          class="h-6 w-6 rounded-sm shadow-inner"
          style="background-color: {color.hex};"
          title={color.name}
        ></div>
        <span class="mt-0.5 text-[8px]">{color.hex}</span>
      </div>
    {/each}
  </div>
</div>
