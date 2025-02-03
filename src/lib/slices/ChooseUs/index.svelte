<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';

	export let slice: Content.ChooseUsSlice;
</script>

<Bounded
	class=" text-secondary"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<h2 class="max-w-7xl text-balance text-center text-amber-50 text-3xl font-medium md:text-5xl">
		<PrismicText field={slice.primary.heading} />
	</h2>
	<div class="mx-auto prose mt-6 max-w-lg text-secondary text-balance text-center">
		<PrismicRichText field={slice.primary.body} />
	</div>

	<div class="w-[90dvw] py-2 md:py-8 md:w-fit">
		<div class="scrollable-div md:grid md:gap-4 md:place-items-center md:grid-cols-3">
			{#each slice.primary.benefits as item}
				<div class="flex flex-col gap-4 w-full items-center justify-center md:gap-8">
					<div class="p-2">
						<PrismicImage class="h-60 w-auto" field={item.image} />
					</div>
					<div class="flex flex-col gap-4 md:gap-8 items-center">
						<h3 class="text-balance text-accent text-center text-lg font-medium md:text-xl">
							<PrismicText field={item.heading} />
						</h3>
						<p class="prose prose-lg text-center  text-balance text-white">
							<PrismicText field={item.body} />
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Bounded>

<style>
	@media (max-width: 768px) {
		.scrollable-div {
			--_spacer: 2rem;
			max-width: 100dvw;
			display: grid;
			gap: var(--_spacer);
			grid-auto-flow: column;
			grid-auto-columns: 90%;

			overflow-x: auto;
			overscroll-behavior-inline: contain;
			scroll-snap-align: start;
			scroll-snap-type: inline mandatory;
			scroll-padding-inline: var(--_spacer, 1rem);
			@apply rounded-md;
			-webkit-mask: linear-gradient(90deg, transparent, black 0%, black 100%, transparent);
			mask: linear-gradient(90deg, transparent, black 0%, black 100%, transparent);
		}

		.scrollable-div::-webkit-scrollbar-track {
			background: transparent;
			border-radius: 100vw;
			margin-block: 0.5em;
			margin-top: 2rem;
		}

		.scrollable-div::-webkit-scrollbar-thumb {
			background: var(--color-primary);
			border: 0.25em solid var(--color-background);
			border-radius: 100vw;
		}

		.scrollable-div {
			overflow: auto; /* or scroll, depending on your needs */
			scrollbar-width: none; /* For Firefox */
			-ms-overflow-style: none; /* For Internet Explorer and Edge */
		}

		/* Hide scrollbars for WebKit browsers (Chrome, Safari, etc.) */
		.scrollable-div::-webkit-scrollbar {
			display: none; /* For Chrome, Safari, and WebKit-based browsers */
		}
	}
</style>
