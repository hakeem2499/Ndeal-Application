<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import AnchorLink from '$lib/components/ReusableComponents/AnchorLink.svelte';
	import ButtonLinkBlack from '$lib/components/ReusableComponents/ButtonLinkBlack.svelte';
	import PrismicButtonLink from '$lib/components/ReusableComponents/PrismicButtonLink.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import clsx from 'clsx';
	import { writable } from 'svelte/store';

	export let slice: Content.ProductsSlice;
	export let products: Content.ProductDocument[] = [];

	// Track which product's paragraph should be visible
	let showParagraph = writable<number | null>(null);

	function toggleParagraph(index: number) {
		showParagraph.update((current) => (current === index ? null : index));
	}
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="flex mx-auto ml-0 gap-6 justify-start flex-col items-start">
		<div class="text-xl md:text-2xl">
			{slice.primary.title}
		</div>
		<h2 class=" text-3xl md:text-5xl text-balance max-w-5xl">
			<PrismicText field={slice.primary.heading} />
		</h2>
		<p class="prose prose-base max-w-6xl">
			<PrismicRichText field={slice.primary.body} />
		</p>

		<ButtonLink field={slice.primary.link_to_products}>{slice.primary.link_label}</ButtonLink>
	</div>
	<div
		class="mt-16 grid max-w-7xl text-white grid-rows-[auto_auto_auto] gap-4 grid-cols-2 lg:grid-cols-4 md:gap-2 justify-items-center lg:gap-2"
	>
		{#each products as product, index}
			<div
				role="button"
				tabindex="0"
				on:click={() => toggleParagraph(index)}
				class="card hover:-translate-y-1 active:-translate-y-1 text-sm duration-500 md:py-4 px-2 md:px-4 py-2 row-span-3 grid grid-rows-subgrid md:gap-4 rounded-[5px] justify-items-center bg-[#171717]"
			>
				<h3
					class="card-heading font-poppins relative text-xs md:text-base text-center mt-2 text-white md:font-semibold"
				>
					<PrismicText field={product.data.product} />
				</h3>

				<div class="relative">
					<p
						class={clsx(
							'prose text-center text-sm text-white text-pretty',
							$showParagraph === index
								? 'absolute animate-fadeIn md:animate-none md:static'
								: 'hidden  md:animate-none md:flex'
						)}
					>
						<PrismicText field={product.data.description} />
					</p>
					<div
						class={clsx('max-w-sm', $showParagraph === index ? 'opacity-20 transition-opacity duration-300 md:opacity-100' : '')}
					>
						<PrismicImage field={product.data.image} />
					</div>
				</div>
				<ButtonLinkBlack document={product} class="z-10 w-full scale-90 md:hidden">
					Expand <span>{product.data.initials}</span>
				</ButtonLinkBlack>
				<ButtonLinkBlack document={product} class="z-10 w-full hidden md:flex">
					Learn More About <span>{product.data.initials}</span>
				</ButtonLinkBlack>
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

	.card:hover > h3 {
		transform: scaleX(1);
		text-shadow: 0 0 12px rgba(76, 81, 191, 0.8); /* Stronger glow */
	}

	@media (prefers-reduced-motion: reduce) {
		.card-heading::after {
			/* Remove transitions or reduce their duration */
			transition: none;
		}
	}
</style>
