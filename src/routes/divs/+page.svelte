<script>
  const buttonPositions = [
    'top-4 left-4', // Div 1: Upper left
    'top-4 right-4', // Div 2: Upper right
    'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', // Div 3: Center
    'bottom-20 left-4', // Div 4: Lower left
    'bottom-20 right-4' // Div 5: Lower right
  ];

  const colors = [
    'text-red-500 border-red-500',
    'text-blue-500 border-blue-500',
    'text-green-500 border-green-500',
    'text-yellow-500 border-yellow-500',
    'text-purple-500 border-purple-500'
  ];

  function handleClick(index) {
    alert(`Clicked button ${index + 1}`);
  }
</script>

<div class="relative h-screen w-full overflow-hidden">
  {#each Array(5) as _, i}
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      style="z-index: {i};"
    >
      <!-- <h2 class="text-4xl font-bold {colors[i].split(' ')[0]}">Div {i + 1}</h2> -->
      <button
        class="absolute {buttonPositions[
          i
        ]} rounded bg-white px-4 py-2 font-semibold shadow hover:bg-gray-100 {colors[
          i
        ]} pointer-events-auto border-2"
        on:click={() => handleClick(i)}
      >
        Button {i + 1}
      </button>
    </div>
  {/each}
</div>
