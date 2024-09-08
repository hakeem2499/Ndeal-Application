<script>
	import AnchorLink from "./AnchorLink.svelte";

	export let title = "Card Title";
	export let content = "This is some card content.";
	export let imageSrc = "";
	export let link = "#";
  </script>
  
  <div class="card hover:-translate-y-1 active:-translate-y-1 duration-500 md:py-4 p-6 md:px-8 row-span-4 grid grid-rows-subgrid gap-2 md:gap-6 rounded-3xl bg-[#171717]">
	<div class="text-balance flex flex-col gap-4 items-center prose">
	  <h3 class="card-heading relative text-center mt-2 text-white font-semibold text-2xl">
		{title}
	  </h3>
	  <p class="prose text-white text-pretty">
		{content}
	  </p>
	</div>
	{#if imageSrc}
	  <div class="max-h-42 max-w-sm">
		<img src={imageSrc} alt="Card " />
	  </div>
	{/if}
	<AnchorLink href={link} class="mt-4 text-white underline">Expand</AnchorLink>
  </div>
  
  <style>
	.card-heading::after {
	  content: '';
	  position: absolute;
	  height: 2px;
	  left: 0;
	  bottom: -0.5rem;
	  width: 100%;
	  background: white;
	  transform: scaleX(0);
	  transition: transform 500ms ease;
	  transform-origin: left;
	}
  
	.card:hover .card-heading::after {
	  transform: scaleX(1);
	}
  
	@media (prefers-reduced-motion: reduce) {
	  .card-heading::after {
		/* Remove transitions or reduce their duration */
		transition: none;
	  }
	}
  </style>
  