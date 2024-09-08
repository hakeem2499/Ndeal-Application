<script lang="ts">
    import { SvelteComponent } from "svelte";
    
    export let title: string = "Title";
    export let description: string = "This is a description.";
    export let imageSrc: string = "";
    export let buttonText: string = "Learn More";
    export let buttonLink: string = "#";
    export let icon: typeof SvelteComponent | null = null;
  </script>
  
  <div
    class="relative mt-16 grid items-center gap-8 rounded-xl border border-violet-50/20 bg-gradient-to-b from-gray-50/15 to-gray-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12"
  >
    <div>
      <div class="w-fit rounded-lg bg-violet-800 p-4 text-3xl">
        {#if icon}
          <svelte:component this={icon} />
        {/if}
      </div>
  
      <h3 class="mt-6 text-2xl font-normal">{title}</h3>
  
      <div class="prose prose-invert text-inherit mt-4 max-w-xl">
        <p>{description}</p>
      </div>
  
      <a href={buttonLink} class="mt-6 inline-block bg-violet-800 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition">
        {buttonText}
      </a>
    </div>
  
    {#if imageSrc}
      <img
        src={imageSrc}
        class="shadow-2xl lg:col-span-2 lg:pt-0 lg:-order-1 lg:-translate-x-[15%]"
        alt=" description"
      />
    {/if}
  </div>
  
  <style>
    .prose-invert p {
      color: inherit;
    }
  </style>
  