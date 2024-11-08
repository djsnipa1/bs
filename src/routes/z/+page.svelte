<script>
  import ZComponent1 from '$lib/components/ZComponent1.svelte';
  import ZComponent2 from '$lib/components/ZComponent2.svelte';
</script>

<div class="relative h-screen w-full">
  <div class="absolute inset-0 h-screen w-full">
    <ZComponent1 />
  </div>
  <div class="absolute inset-0 h-screen w-full">
    <ZComponent2 />
  </div>
</div>
