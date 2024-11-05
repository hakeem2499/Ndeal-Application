<script>
	import { PrismicImage, PrismicText, SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Bounded from '$lib/components/Bounded.svelte';
	import CtaSection from '$lib/components/CTASection.svelte';

	export let data;
</script>

<Bounded class="bg-black text-background">
	<div class="relative  grid w-full place-items-center text-center">
		<h1 class="text-2xl font-medium md:text-5xl">
			<PrismicText field={data.page.data.tool} />
			
		</h1>
		<p class="mb-4 mt-8 max-w-xl text-lg text-slate-300">
			<PrismicText field={data.page.data.description} />
		</p>
		<div class=" max-w-md">
			<PrismicImage  field={data.page.data.image} class="rounded-lg" />
		</div>
	</div>
	<div class="mx-auto mt-8">
		<SliceZone slices={data.page.data.slices} {components} />
	</div>
</Bounded>
<CtaSection/>
