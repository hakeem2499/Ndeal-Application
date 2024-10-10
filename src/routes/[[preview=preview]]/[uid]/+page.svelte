<script>
	import { SliceZone, PrismicText, PrismicRichText } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Bounded from '$lib/components/Bounded.svelte';
	import CTASection from '$lib/components/CTASection.svelte';

	export let data;
</script>

<Bounded>
	<div class="diagonal w-full mt-10 mb-10 h-40 relative grid place-items-center text-center">
		<h1 class="font font-medium">
			<PrismicText field={data.page.data.title} />
		</h1>
		<p class="max-w-xl">
			<PrismicText field={data.page.data.description} />
		</p>
	</div>
	
	<div class="flex gap-4 w-full flex-col">
		{#each data.page.data.sections as item}
			<h2 class="font-poppins text-2xl ">
				<PrismicText field={item.heading} />
			</h2>
			
			<p class="w-full">
				<PrismicRichText field={item.description} />
			</p>
		{/each}
	</div>
</Bounded>

<CTASection />

<SliceZone slices={data.page.data.slices} {components} />

<style>
	.diagonal {
  --skew-angle: -2deg;
  --background: linear-gradient(
                  45deg, 
                  var(--color-primary), 
                  #c471ed, 
                  var(--color-accent)
                );

  position: relative;
  isolation: isolate;
}

.diagonal::after {
  content: '';
  background: var(--background);
  position: absolute;
  z-index: -1;
  inset: 0;
  transform: skewY(var(--skew-angle));
}
</style>