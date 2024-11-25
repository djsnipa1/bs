<script>
  import { fade, fly } from 'svelte/transition';

  let layers = [
    { id: 1, color: 'bg-red-500', label: 'Red' },
    { id: 2, color: 'bg-blue-500', label: 'Blue' },
    { id: 3, color: 'bg-green-500', label: 'Green' },
    { id: 4, color: 'bg-yellow-500', label: 'Yellow' },
    { id: 5, color: 'bg-purple-500', label: 'Purple' },
    { id: 6, color: 'bg-pink-500', label: 'Pink' },
    { id: 7, color: 'bg-indigo-500', label: 'Indigo' },
    { id: 8, color: 'bg-gray-500', label: 'Gray' }
  ];

  let activeLayerId = null;

  function toggleLayer(id) {
    activeLayerId = activeLayerId === id ? null : id;
  }
</script>

<div class="container mx-auto p-4">
  <div class="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
    {#each layers as layer (layer.id)}
      <button
        class="rounded p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        class:bg-gray-200={activeLayerId !== layer.id}
        class:bg-gray-400={activeLayerId === layer.id}
        on:click={() => toggleLayer(layer.id)}
        aria-pressed={activeLayerId === layer.id}
      >
        Toggle {layer.label}
      </button>
    {/each}
  </div>

  <div class="relative h-96 overflow-hidden rounded border border-gray-300">
    {#each layers as layer (layer.id)}
      {#if activeLayerId === layer.id}
        <div
          transition:fly={{ y: 200, duration: 300 }}
          class="absolute inset-0 {layer.color} flex items-center justify-center text-2xl font-bold text-white"
        >
          {layer.label} Layer
        </div>
      {/if}
    {/each}
  </div>
</div>
