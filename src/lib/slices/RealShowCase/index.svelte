<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { writable, get } from 'svelte/store';
	import Bounded from '$lib/components/Bounded.svelte';
	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	import { onMount, tick } from 'svelte';

	export let slice: Content.RealShowCaseSlice;
	const serviceType = writable('Hiring');

	// Array of service options
	const serviceOptions = ['Hiring', 'Training', 'Compliance', 'Payroll', 'Software'];
	let sliderRef: HTMLDivElement;
	let activeIndex = 0;

	// Updates the slider position based on the active button
	const updateSliderPosition = () => {
		const activeButton = document.querySelector(`button[data-service="${get(serviceType)}"]`) as HTMLElement;
		if (sliderRef && activeButton) {
			const buttonRect = activeButton.getBoundingClientRect();
			const parentRect = sliderRef.parentElement?.getBoundingClientRect();

			// Calculate slider width and position
			sliderRef.style.width = `${buttonRect.width}px`;
			sliderRef.style.left = `${buttonRect.left - (parentRect?.left || 0)}px`;
		}
	};

	// Ensures updateSliderPosition only runs on the client
	onMount(() => {
		// Initial slider position
		updateSliderPosition();

		// Re-run updateSliderPosition when serviceType changes
		serviceType.subscribe(async () => {
			await tick(); // Wait for DOM to update
			updateSliderPosition();
		});
	});
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h2 class="my-10 max-w-3xl md:max-w-4xl md:text-5xl text-balance mx-auto text-center text-2xl font-medium lg:text-6xl">
		<PrismicText field={slice.primary.heading} />
	</h2>
	<div class="flex justify-center relative">
		<div class="rounded-full border border-slate-950 relative overflow-hidden">
			<div bind:this={sliderRef} class="slider"></div>
			<div class="flex text-xs lg:text-lg font-semibold font-poppins leading-5">
				{#each serviceOptions as service}
					<button
						data-service={service}
						on:click={() => serviceType.set(service)}
						class="relative z-10 rounded-full px-2 py-1 md:py-4 transition-all duration-500 md:px-8 lg:px-16 focus:outline-none
							{$serviceType === service ? 'bg-green-900 text-white' : 'text-black hover:text-gray-700'}"
					>
						{service}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Conditional Rendering of Content based on Selected Service Type -->
	{#each slice.primary.switchable_divs as item}
		{#if $serviceType === item.label}
			<div
				class="relative mt-16 grid items-center gap-8 rounded-xl border border-violet-600/20 bg-gradient-to-br from-gray-400/15 to-bg-primary/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12"
			>
				<div>
					<div class="w-fit rounded-lg bg-background p-4">
						<PrismicImage class="w-20 h-20" field={item.icon_image} />
					</div>

					<div class="prose prose-invert text-inherit mt-4 max-w-xl">
						<PrismicText field={item.description} />
					</div>
				</div>

				<PrismicImage
					field={item.image}
					class="shadow-2xl lg:col-span-2 lg:pt-0 lg:-order-1 lg:translate-x-[-10%]"
				/>
			</div>
		{/if}
	{/each}
</Bounded>

<style>
	.slider {
		position: absolute;
		height: 100%;
		background-color: #064e3b;
		transition: width 0.3s ease, left 0.3s ease;
		border-radius: 5px;
		z-index: -1;
	}
</style>
