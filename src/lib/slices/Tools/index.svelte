<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import ButtonLinkBlack from '$lib/components/ReusableComponents/ButtonLinkBlack.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicLink, PrismicRichText, PrismicText, PrismicImage } from '@prismicio/svelte';
	import clsx from 'clsx';
	import { writable } from 'svelte/store';
	import MoveUp from '~icons/ph/arrow-line-up-right-fill';
	export let slice: Content.ToolsSlice;
	export let tools: Content.ToolsDocument[] = [];

	// Track which product's paragraph should be visible
	let showParagraph = writable<number | null>(null);

	function toggleParagraph(index: number) {
		showParagraph.update((current) => (current === index ? null : index));
	}
</script>

<Bounded
	class=" text-primary"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="flex flex-col items-center gap-4">
		<h2 class="max-w-7xl text-balance text-center text-3xl font-medium md:text-5xl">
			<PrismicText field={slice.primary.heading} />
		</h2>
		<div class="mx-auto prose mt-6 max-w-lg text-balance text-center">
			<PrismicRichText field={slice.primary.body} />
		</div>
		<ButtonLink field={slice.primary.link_to_tools}>{slice.primary.label}</ButtonLink>
	</div>
	<div
		class="scroller mt-6 md:mt-20 md:grid md:max-w-7xl text-white md:grid-rows-[auto_auto_auto] md:gap-4 md:grid-cols-2 md:justify-items-stretch lg:grid-cols-4"
	>
		{#each tools as tool, index}
			<div
				class="card h-fit group border-2 border-accent relative hover:-translate-y-1 text-white active:-translate-y-1 duration-500 md:py-2 p-4 md:px-6 grid grid-rows-subgrid gap-10 md:gap-16 rounded-[5px] bg-primary"
			>
				<div
					class="overflow-x-hidden overflow-y-hidden relative p-2 md:p-4 z-10 text-balance grid prose"
				>
					<div class="duration-300 py-2 flex flex-col items-center group-hover:translate-y-10">
						<h3
							class="card-heading font-poppins relative text-sm group-hover:text-accent md:text-lg text-center mt-2 text-white font-semibold"
						>
							<PrismicText field={tool.data.tool} />
						</h3>
					</div>

					<p
						class={clsx(
							'max-w-md z-20 hidden absolute lg:flex md:pt-8 text-sm md:text-base leading-6 prose-base -bottom-4 lg:absolute lg:translate-x-[150%] lg:group-hover:translate-x-[100] duration-300 group-hover:block prose text-[#f8f8f8] text-pretty'
						)}
					>
						<PrismicText field={tool.data.description} />
					</p>

					<div
						class="md:h-full group-hover:opacity-20 relative group-hover:mix-blend-multiply w-full"
					>
						<PrismicImage class="group-hover:mix-blend-multiply" field={tool.data.image} />
					</div>
				</div>
				<PrismicLink
					document={tool}
					class="z-10 text-xs md:text-base no-underline group-hover:text-accent group-hover:underline text-secondary "
					>Learn More</PrismicLink
				>
			</div>
		{/each}
	</div>
</Bounded>

<Bounded class="lg:h-screen  mx-auto h-[50dvh] ">
	<PrismicImage class="absolute  h-86 lg:h-full w-auto" field={slice.primary.dealinsight_image} />

	<div>
		<a
			href="/dealInsight"
			class="button scale-50 md:scale-100 mx-auto mt-10 ml-4 justify-start items-center inline-flex gap-2 px-4 md:px-8 py-2 border-4 font-Orlean font-semibold text-2xl border-slate-400 rounded-[5px] text-orange-700 leading-4 md:text-3xl"
			><span></span>
			dealInsight<MoveUp />
			<span></span>
		</a>
	</div>
</Bounded>

<style>
	@media (max-width: 768px) {
		.scroller {
			--_spacer: 1rem;
			max-width: 100dvw;
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
	}

	.scroller::-webkit-scrollbar {
		width: 2em;
		height: 1em;
	}

	.scroller::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 100dvw;
		margin-block: 0.5em;
	}

	.scroller::-webkit-scrollbar-thumb {
		background: var(--color-primary);
		border: 0.25em solid var(--color-background);
		border-radius: 100vw;
	}

	.scroller::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary);
	}
	.card {
		position: relative;
		height: fit-content;
		width: 100%;
		overflow: hidden; /* Ensures that the content does not overflow the card */
		z-index: 1;
		transition: all 0.3s ease;
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: -1;
		transition: all 0.3s ease;
	}

	.card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		@apply bg-gradient-to-b from-[#171717/70] to-slate-950;
		opacity: 0;
		z-index: 0;
		transition: opacity 0.3s ease;
	}

	@media (hover: hover) {
		.card:hover::before {
			filter: blur(8px); /* Apply blur to the background image on hover */
		}

		.card:hover::after {
			opacity: 1; /* Show the gradient overlay on hover */
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card-heading::after {
			/* Remove transitions or reduce their duration */
			transition: none;
		}
	}
	@media (hover: none) {
		.card:click::before {
			filter: blur(8px); /* Apply blur to the background image on hover */
		}

		.card:click::after {
			opacity: 1; /* Show the gradient overlay on hover */
		}
	}

	.button {
		transition: background-color 250ms;

		position: relative;
		isolation: isolate;
		overflow: hidden;
	}
	.button:hover,
	.button:focus-within,
	.button:focus-visible {
		background: var(--color-primary);
	}

	.button:hover,
	.button:focus-within,
	.button:focus-visible {
		background: white;
	}

	.button > span {
		position: absolute;
		z-index: -1;
		width: 33.333%;
		height: 100%;

		background: transparent;
		opacity: 0.5;
	}

	.button > :first-child {
		left: 0;
		top: 0;
	}

	.button > :last-child {
		right: 0;
		top: 0;
	}

	.button::before {
		content: '';
		position: absolute;
		z-index: -1;
		background: var(--color-secondary);
		width: 10%;
		aspect-ratio: 1;
		border-radius: 50%;
		inset: 0;
		margin: auto;
		opacity: 0;

		transition:
			transform 1500ms,
			opacity 500ms;
	}

	.button:hover::before,
	.button:focus-within::before {
		transform: scale(20);
		opacity: 1;
		transition:
			transform 1000ms,
			opacity 500ms;
	}
</style>
