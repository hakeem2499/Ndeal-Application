<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicImage, PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.SectorsSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h2
		class="showcase__heading py-4 md:py-16 max-w-3xl md:max-w-7xl md:text-5xl text-balance m-auto text-center text-2xl font-medium lg:text-6xl"
	>
		<PrismicText field={slice.primary.heading} />
	</h2>

	<div class="flex md:mx-6 flex-col gap-4  lg:gap-20 justify-between lg:flex-row">
		<div class="sectors max-w-[90dvw] m-2 mx-auto md:m-0 lg:w-[50dvw] flex-1">
			{#each slice.primary.economic_sector as item}
				<div
					class="sector-element h-fit relative rounded-md m-4 border-t-8 border-primary text-white justify-between"
				>
					<PrismicImage class="h-full absolute -z-10 w-full" field={item.background_imge} />

					<div class="p-2 md:p-4 gap-2 flex flex-col items-center">
						<h3 class=" text-xl"><PrismicText field={item.subheading} /></h3>
						<div class="image-wrapper w-[80%] md:w-[90%] m-2 md:m-4 relative">
							<PrismicImage field={item.image} />
						</div>

						<div class="solution-challenge">
							<h5><PrismicText field={item.challenges_heading} /></h5>
							<p class="text-xs lg:text-[.95rem] prose prose-lg text-gray-300 leading-4">
								<PrismicText field={item.challenges} />
							</p>
						</div>
						<div class="solution-challenge">
							<h5><PrismicText field={item.solutions_heading} /></h5>
							<p class="text-xs text-gray-300 lg:text-[.95rem] prose prose-lg leading-4">
								<PrismicText field={item.solutions} />
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-col   md:h-full flex-1 items-center gap-4 md:mt-4 lg:w-[30dvw]">
			{#each slice.primary.choose_us as item}
				<div
					class="div ring-1 w-[80dvw] h-fit group flex items-center justify-between   text-sm md:font-normal md:w-fit ring-primary my-1 md:m-0"
				>
					<PrismicImage class="h-auto p-2 max-w-[25%]" field={item.image} />

					<div
						class="flex md:items-center m-2 lg:m-0 p-2 md:p-4  group-hover:bg-primary group-hover:text-background rounded-ss-2xl rounded-ee-2xl flex-col"
					>
						<h3 class="text-lg md:text-xl font-poppins"><PrismicText field={item.heading} /></h3>
						<p class="text-sm md:text-base">
							<PrismicText field={item.body} />
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Bounded>

<style>
	.div {
		border-radius: 1rem 0;
		transform: scale(100%);
		transition: transform 500ms ease-in-out;
		transform-origin: right;
		background-color: var(--color-background);
		border: 4rem;
	}

	.div :nth-child(2) {
		@apply justify-self-end;
	}

	.div:hover {
		transform: scale(105%);
	}
	.div:focus-within {
		transform: scale(110%);
		background-color: var(--color-primary);
		color: var(--color-background);
	}
	.sectors {
		--_spacer: 1rem;
		display: grid;
		gap: var(--_spacer);
		grid-auto-flow: column;
		grid-auto-columns: 95%;
		overflow-x: auto;
		overscroll-behavior-inline: contain;
		scroll-snap-align: start;
		scroll-snap-type: inline mandatory;
		scroll-padding-inline: var(--_spacer, 1rem);
		@apply rounded-md;
	}

	.sectors::-webkit-scrollbar {
		width: 2em;
		height: 1em;
	}

	.sectors::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 100vw;
		margin-block: 0.5em;
	}

	.sectors::-webkit-scrollbar-thumb {
		background: var(--color-primary);
		border: 0.25em solid var(--color-background);
		border-radius: 100vw;
	}

	.sectors::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary);
	}

	.sector-element > h3,
	p,
	a {
		padding: 1rem;
	}

	.snaps-inline {
		scroll-snap-type: inline mandatory;
		scroll-padding-inline: var(--_spacer, 1rem);
	}

	.image-wrapper::before {
		content: '';
		position: absolute;
		top: -.5rem;
		left: -1.5rem;
		bottom: 0;
		height: 105%;
		width: 105%; /* Adjust this to control the width of the cut effect */
		background: var(--color-primary); /* Adjust this to match your desired color */
		transform: skew(5deg); /* Create the diagonal cut */
		transform-origin: top left;
		z-index: -1; /* Ensure it appears above the image */
		pointer-events: none; /* Prevents interactions with the overlay */
	}
	.solution-challenge{
		@apply text-xs flex flex-col items-center font-poppins lg:text-[.95rem] prose prose-lg text-slate-200;
	}
</style>
