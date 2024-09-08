<script lang="ts">
    import type { ComponentType } from "svelte";
    
    export let title: string = "Title";
    export let testimonial: string = "This is a testimonial.";
    export let location: string = "Location";
    export let icon: ComponentType;
  </script>
  
  <div
    class="flex w-full flex-col justify-between rounded-xl p-8 ring-1 ring-slate-300 glass-container text-slate-200 ring-slate-300/20 xl:p-10"
  >
    <div class="w-40 md:w-64">
      <div class="flex items-center justify-between">
        <h3 id="tier-starter" class="text-lg font-semibold leading-8">{title}</h3>
      </div>
      <div class="">
        <p class="text-balance">
          {testimonial}
        </p>
      </div>
    </div>
    <div class="flex gap-1 items-center mt-8">
      <svelte:component this={icon} class="text-yellow-500 w-6 h-6" />
      <span>{location}</span>
    </div>
  </div>
  