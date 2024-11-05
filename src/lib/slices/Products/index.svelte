<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import AnchorLink from '$lib/components/ReusableComponents/AnchorLink.svelte';
	import ButtonLinkBlack from '$lib/components/ReusableComponents/ButtonLinkBlack.svelte';
	import PrismicButtonLink from '$lib/components/ReusableComponents/PrismicButtonLink.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';

	export let slice: Content.ProductsSlice;
	export let products: Content.ProductDocument[] = [];
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="flex mx-auto ml-0 gap-6 justify-start flex-col items-start">
		<div class="text-xl md:text-2xl">
			{slice.primary.title}
		</div>
		<h2 class=" text-3xl md:text-5xl text-balance  max-w-5xl">
			<PrismicText field={slice.primary.heading} />
		</h2>
		<p class="prose prose-base max-w-6xl">
			<PrismicRichText field={slice.primary.body} />
		</p>

		<ButtonLink field={slice.primary.link_to_products}>{slice.primary.link_label}</ButtonLink>
	</div>
	<div
		class="mt-16 grid max-w-7xl text-white grid-rows-[auto_auto_auto] gap-8 grid-cols-2 lg:grid-cols-4 md:gap-2 lg:gap-2"
	>
		{#each products as product, index}
			<div
				class="card hover:-translate-y-1 active:-translate-y-1 text-sm duration-500 md:py-4 px-2 py-6 md:px-8 row-span-4 grid grid-rows-subgrid gap-2 md:gap-6 rounded-[5px] bg-[#171717]"
			>
				<div class=" text-balance flex flex-col gap-4 items-center prose">
					<h3
						class="card-heading font-poppins relative text-sm text-center mt-2 text-white md:text-2xl"
					>
						<PrismicText field={product.data.product} />
					</h3>
					<p class="prose text-white text-pretty">
						<PrismicRichText field={product.data.description} />
					</p>
				</div>
				<div class="max-h-42 max-w-sm">
					<PrismicImage field={product.data.image} />
				</div>
				<ButtonLinkBlack document={product} class="z-10  md:hidden">Expand</ButtonLinkBlack>
				<ButtonLinkBlack document={product} class="z-10 hidden md:flex"
					>Learn More About EOR</ButtonLinkBlack
				>
			</div>
		{/each}
	</div>

	<h3
		class="hero_heading max-w-3xl mt-16 md:mt-20 mx-auto text-center text-balance text-3xl font-medium md:text-5xl"
	>
		<PrismicText field={slice.primary.subheading} />
		
	</h3>

	<div class="w-fit glass-container mt-10">
		<PrismicImage class="rounded-lg border-4" field={slice.primary.dashboard_image} /> 
	</div>
</Bounded>

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
