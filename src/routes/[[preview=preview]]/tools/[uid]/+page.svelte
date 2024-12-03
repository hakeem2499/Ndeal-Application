<script>
	import { PrismicImage, PrismicText, SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Bounded from '$lib/components/Bounded.svelte';
	import CtaSection from '$lib/components/CTASection.svelte';

	export let data;
</script>

<Bounded class="bg-black text-background">
	<div
		class="relative mt-2 grid items-center gap-8 rounded-xl border border-slate-900/20 justify-between w-full px-2 py-8 backdrop-blur-sm lg:grid-cols-3  lg:py-12"
	>
		<div class="div pb-8   lg:space-y-6 lg:col-span-2">
			<h1 class="w-fit rounded-lg text-3xl text-accent md:text-4xl lg:text-5xl max-w-4xl   leading-1">
				<PrismicText class="w-20 h-20" field={data.page.data.tool} />
			</h1>

			<div class="prose prose-invert text-secondary text-xl md:text-2xl mt-4 max-w-4xl">
				<PrismicText field={data.page.data.description} />
			</div>
		</div>

		<PrismicImage
			field={data.page.data.image}
			class="shadow-2xl lg:col-span-1 lg:pt-0  lg:-order-1 lg:translate-x-[-10%]"
		/>
	</div>
	<div class="mx-auto mt-8">
		<SliceZone slices={data.page.data.slices} {components} />
	</div>
</Bounded>
<CtaSection />

<style>
	.div {
		border-bottom-width: .4rem;
		border-image: linear-gradient(to right, var(--color-accent), #62021d, #c2410c, var(--color-accent)) 1;

	}
</style>
