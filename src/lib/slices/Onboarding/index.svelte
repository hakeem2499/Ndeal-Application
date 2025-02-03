<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import RegistrationSection from '$lib/components/RegistrationSection.svelte';
	import Contact from '$lib/components/ReusableComponents/Contact.svelte';
	import SliderLogo from '$lib/components/SliderLogo.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicText, PrismicRichText } from '@prismicio/svelte';
	import clsx from 'clsx';
	import { onMount } from 'svelte';

	let showForm = true;
	// Initialize variables with type annotations
	let currentSectionIndex: number = 0;
	let progressWidth: number = 0;
	const duration: number = 10000; // duration for each section in ms
	let startTime: number | null = null;
	let animationFrameId: number;

	function animateProgressBar(timestamp: number): void {
		if (!startTime) startTime = timestamp;
		const elapsedTime = timestamp - startTime;
		progressWidth = Math.min((elapsedTime / duration) * 100, 100);

		if (progressWidth < 100) {
			animationFrameId = requestAnimationFrame(animateProgressBar);
		} else {
			currentSectionIndex++;
			if (currentSectionIndex < slice.primary.steps.length) {
				startTime = null;
				animationFrameId = requestAnimationFrame(animateProgressBar);
			} else {
				currentSectionIndex = 0;
				startProgress();
			}
		}
	}

	function startProgress(): void {
		progressWidth = 0;
		startTime = null;
		cancelAnimationFrame(animationFrameId);
		animationFrameId = requestAnimationFrame(animateProgressBar);
	}

	function resetProgress(): void {
		cancelAnimationFrame(animationFrameId);
		progressWidth = 0;
		startProgress();
	}

	function handleSectionClick(index: number): void {
		if (index !== currentSectionIndex) {
			currentSectionIndex = index;

			resetProgress();
		}
	}

	onMount((): void => {
		startProgress();
	});

	export let slice: Content.OnboardingSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h2
		class=" my-6 md:my-12 max-w-3xl md:max-w-5xl md:text-5xl text-balance mx-auto text-center text-2xl font-medium lg:text-6xl"
	>
		<PrismicText field={slice.primary.heading} />
	</h2>
	<div class="flex flex-col gap-10 md:gap-4 md:flex-row w-full items-center justify-between">
		<div class="ml-0 space-y-2 lg:space-y-10 mx-auto">
			{#each slice.primary.steps as item, index}
				<div
					class={clsx(
						'p-4 text-primary',
						index === currentSectionIndex ? 'bg-background rounded-3xl max-w-md shadow-2xl' : ''
					)}
				>
					<div class="flex item-center">
						<PrismicImage class="w-12 h-12" field={item.image} />
						<button
							type="button"
							class=" p-4 font-semibold font-poppins md:text-lg border-none {index ===
							currentSectionIndex
								? 'text-orange-700'
								: 'text-primary'} cursor-pointer w-full text-left"
							on:click={() => handleSectionClick(index)}
							on:keydown={(e) => e.key === 'Enter' && handleSectionClick(index)}
							aria-expanded={index === currentSectionIndex}
						>
							<PrismicText field={item.heading} />
						</button>
					</div>
					{#if index === currentSectionIndex}
						<div
							class="justify-items-start max-w-3xl p-2 grid grid-cols-[20px_1fr] gap-4 grid-rows-subgrid"
						>
							<div class="grid h-full bg-gray-300 col-span-auto rounded">
								<div class="bg-orange-700 w-2 rounded-full" style="height: {progressWidth}%"></div>
							</div>
							<PrismicRichText field={item.body} />
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<PrismicImage class="md:w-[50%]  h-auto" field={slice.primary.image} />
	</div>
	
</Bounded>
