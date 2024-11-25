<script>
  import { onMount } from 'svelte';

  let buttons = [
    { id: 1, label: 'Button 1' },
    { id: 2, label: 'Button 2' },
    { id: 3, label: 'Button 3' },
    { id: 4, label: 'Button 4' }
  ];

  let activeButton = null;

  function handleClick(id) {
    activeButton = id;
  }

  onMount(() => {
    // Prevent scrolling on the page
    document.body.style.overflow = 'hidden';

    // Clean up when component is destroyed
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<div
  class="px-safe py-safe flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
>
  <h1 class="mb-8 text-3xl font-bold">Full Screen PWA</h1>
  <div class="grid grid-cols-2 gap-4">
    {#each buttons as button (button.id)}
      <button
        on:click={() => handleClick(button.id)}
        class="rounded-lg px-6 py-3 text-lg font-semibold transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        class:bg-blue-500={activeButton === button.id}
        class:text-white={activeButton === button.id}
        class:bg-white={activeButton !== button.id}
        class:dark:bg-gray-800={activeButton !== button.id}
        class:hover:bg-blue-600={activeButton !== button.id}
        class:dark:hover:bg-blue-700={activeButton !== button.id}
      >
        {button.label}
      </button>
    {/each}
  </div>
</div>

<!--
  To make this a PWA, you would typically add the following meta tags and link to your manifest.json in your HTML file:

  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#ffffff">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/icon-192x192.png">
-->

<style>
  /* These styles will be processed by Svelte, not Tailwind */
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }

  :global(:root) {
    --sat: env(safe-area-inset-top);
    --sar: env(safe-area-inset-right);
    --sab: env(safe-area-inset-bottom);
    --sal: env(safe-area-inset-left);
  }

  :global(.px-safe) {
    padding-left: var(--sal);
    padding-right: var(--sar);
  }

  :global(.py-safe) {
    padding-top: var(--sat);
    padding-bottom: var(--sab);
  }
</style>
