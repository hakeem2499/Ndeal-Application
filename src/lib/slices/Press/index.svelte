<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicText } from '@prismicio/svelte';
	import clsx from 'clsx';
	import Label from '~icons/ix/label-filled';
	import BookMark from '~icons/ph/book-bookmark-fill';
	export let slice: Content.PressSlice;
	const icons = {
		Label: Label,
		BookMark: BookMark
	};
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="flex ml-0 mx-auto p-4 md:p-8 flex-col gap-4">
		<h1
			class="max-w-7xl text-balance font-Just_sans text-center text-3xl ml-0 mx-auto font-medium md:text-5xl"
		>
			<PrismicText field={slice.primary.heading} />
		</h1>

		<p class="prose prose-lg mx-auto ml-0 text-gray-900 leading-4">
			<PrismicText field={slice.primary.body} />
		</p>
	</div>

	<div class="flex  w-full items-start gap-4 flex-col md:flex-row">
		{#each slice.primary.news_box as item}
			<div
				class="flex {slice.variation == "withSubheading" ? "gap-8": "gap-2"}  md:w-1/3 border-t-4 border-accent items-center rounded-md group w-full md:max-w-[50dvw] lg:max-w-[33.33dvw] transition-transform hover:shadow-xl hover:scale-[1.01] duration-300 bg-white p-4 md:py-8 flex-col flex-grow relative"
			>
				{#if item.heading}
					<h2 class={clsx('', slice.variation == "withSubheading" ? 'text-gray-900 font-semibold text-xl text-center prose prose-lg' : 'text-3xl text-balance w-full text-center md:text-4xl')}>
						<PrismicText field={item.heading} />
					</h2>
				{/if}

				<PrismicImage class="h-auto w-60" field={item.image} />

				
				{#if slice.variation == 'withSubheading'}
					<p class="text-gray-900 text-xl  prose prose-lg">
						<PrismicText field={item.body} />
					</p>
				{/if}
				<div class="inline-flex ml-0 mx-auto gap-2 place-items-center">
					{#if slice.primary.icon}
						<div class="text-primary rotate-180 text-3xl">
							<svelte:component this={icons[slice.primary.icon]} />
						</div>
					{/if}
					<PrismicLink class="underline  hover:underline-accent " field={item.link} />
				</div>
			</div>
		{/each}
	</div>
</Bounded>
