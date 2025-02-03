<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import { PrismicImage, PrismicText, SliceZone } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import BoxArrow from '~icons/ph/box-arrow-up-fill'
	import Newsletter from '$lib/components/ReusableComponents/Newsletter.svelte';

	export let slice: Content.BottomCtaSlice;
</script>

<Bounded
	class="bg-primary"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div
		class="relative mt-2 grid items-center gap-8 rounded-xl border border-slate-900/20 justify-between w-full px-2 py-8 backdrop-blur-sm lg:grid-cols-3 lg:py-12"
	>
		<div class="div pl-4  md:pb-0 lg:space-y-6 lg:col-span-2">
			<h3 class="w-fit rounded-lg text-3xl text-accent md:text-4xl lg:text-5xl max-w-4xl leading-1">
				<PrismicText class="w-20 h-20" field={slice.primary.heading} />
			</h3>

			<div class="prose  prose-invert text-secondary text-xl md:text-2xl mt-4 max-w-4xl">
				<PrismicText field={slice.primary.body} />
			</div>
		</div>

		<PrismicImage
			field={slice.primary.image}
			class="shadow-2xl lg:col-span-1 lg:pt-0  lg:-order-1 lg:translate-x-[-10%]"
		/>
	</div>
	<div class="bg-secondary py-10 md:p-8">
		<Newsletter />
	</div>
</Bounded>

<style>
	.div {
		border-left-width: 0.4rem;
		
		border-image: linear-gradient(
				to bottom,
				var(--color-accent),
				#a83959,
				#ff7c49,
				var(--color-accent)
			)
			1;
	}
</style>
