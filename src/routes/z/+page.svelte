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

<!-- <div class="flex h-screen flex-col"> -->
<!-- Top Half -->
<!--   <div class="flex h-1/2 items-center justify-center"> -->
<!--     <div class="flex h-1/4 w-full items-center justify-center bg-blue-500"> -->
<!--       Top Centered Box -->
<!--     </div> -->
<!--   </div> -->
<!-- Bottom Half -->
<!--   <div class="flex h-1/2 items-center justify-center"> -->
<!--     <div class="flex h-1/4 w-full items-center justify-center bg-green-500"> -->
<!--       Bottom Centered Box -->
<!--     </div> -->
<!--   </div> -->
<!-- </div> -->
