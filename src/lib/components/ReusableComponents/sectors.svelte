<script lang="ts">
    export let title: string = "Title";
    export let description: string = "This is a description.";
    export let imageSrc: string = "";
    export let linkText: string = "Learn More";
    export let linkUrl: string = "#";
  </script>
  
  <div
    class="flex group relative md:p-4 flex-col md:gap-20 md:justify-between md:flex-row scroll-item"
  >
    <img
      src={imageSrc}
      class="w-full h-full object-cover sm:w-1/2 rounded-lg"
      alt=" description"
    />
    <div>
      <div
        class="flex group relative group-hover:scale-105 transition-transform duration-300 ease-in-out flex-col gap-3 md:gap-6 text-white items-start justify-between"
      >
        <h3 id="tier-starter" class="text-lg font-semibold leading-8">{title}</h3>
        <p class="text-balance">
          {description}
        </p>
        <a href={linkUrl} class="text-blue-500 underline">
          {linkText}
        </a>
      </div>
    </div>
  </div>
  