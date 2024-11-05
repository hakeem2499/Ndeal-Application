<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLinkBlack from '$lib/components/ReusableComponents/ButtonLinkBlack.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicLink, PrismicRichText, PrismicText, PrismicImage } from '@prismicio/svelte';
	import MoveUp from '~icons/ph/arrow-line-up-right-fill'
	export let slice: Content.ToolsSlice;
	export let tools: Content.ToolsDocument[] = [];
</script>

<Bounded
	class=" text-primary"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="flex flex-col items-center gap-4">
		<h2 class="max-w-4xl text-balance text-center text-3xl font-medium md:text-6xl">
			<PrismicText field={slice.primary.heading} />
		</h2>
		<div class="mx-auto prose mt-6 max-w-lg text-balance text-center">
			<PrismicRichText field={slice.primary.body} />
		</div>
		<ButtonLinkBlack field={slice.primary.link_to_tools}>{slice.primary.label}</ButtonLinkBlack>
	</div>
	<div
		class="mt-20 grid max-w-7xl text-white grid-rows-[auto_auto_auto] gap-4 grid-cols-2 justify-items-stretch lg:grid-cols-4"
	>
		{#each tools as tool, index}
			<div
				class="card group border-2 border-accent relative hover:-translate-y-1 text-white active:-translate-y-1 duration-500 md:py-2 p-6 md:px-6 row-span-2 grid grid-rows-subgrid gap-10 md:gap-16 rounded-[5px] bg-primary"
			>
				<div class="overflow-x-hidden relative p-2 md:p-4 z-10 text-balance flex flex-col prose">
					<h4
						class="card-heading font-poppins text-center relative max-w-3xl text-white font-semibold group-hover:translate-y-10 duration-300 md:text-2xl text-base"
					>
						<PrismicText field={tool.data.tool} />
					</h4>

					<p
						class="max-w-md z-20 hidden md:flex pt-8 text-sm leading-6 prose-base -bottom-4 lg:absolute lg:translate-x-[110%] group-hover:translate-x-[100] duration-300 group-hover:block prose text-white text-pretty"
					>
						<PrismicText field={tool.data.description} />
					</p>

					<div class="h-full group-hover:opacity-20 relative group-hover:mix-blend-multiply w-full">
						<PrismicImage class="group-hover:mix-blend-multiply" field={tool.data.image} />
					</div>
				</div>
				<PrismicLink document={tool} class="z-10 text-white ">Learn More</PrismicLink>
			</div>
		{/each}
	</div>
</Bounded>

<div class="bg-primary py-4 md:py-8 w-full">
	<div class="flex mx-auto p-8 md:p-16 items-center justify-center">
		<a
			href="/"
			class="button items-center inline-flex gap-2 px-4 md:px-8 py-2 border-4 font-Orlean font-semibold text-2xl hover:text-slate-100 f border-accent rounded-[5px] text-orange-700  leading-4 md:text-3xl"
			><span></span>
			dealInsight<MoveUp />
			<span></span>
		</a>
	</div>
</div>

<style>
	.card {
		position: relative;
		height: auto;
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
		background-image: url('/src/lib/images/DiscoverBg.svg');
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
		background: linear-gradient(to bottom right, var(--color-primary), #0a0018);
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
		background: var(--color-primary);
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
