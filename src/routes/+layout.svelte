<script>
  import '../app.pcss';
  // Supports weights 100-900
  import '@fontsource-variable/sofia-sans';
  import { hideMainElements } from '$lib/stores/store.js';
</script>

<svelte:head>
  <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<div
  class="{$hideMainElements
    ? 'bg-black'
    : 'bg-transparent'} flex h-screen w-full items-center justify-center"
>
  <slot />
</div>

<style>
  :global(body) {
    @apply w-full;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    overflow: hidden;
    position: fixed;
    -webkit-overflow-scrolling: touch;
  }

  .gradient {
    background-image: linear-gradient(
      109.6deg,
      rgba(62, 161, 219, 1) 11.2%,
      rgba(93, 52, 236, 1) 100.2%
    );
  }
</style>
