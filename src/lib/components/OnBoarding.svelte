<script lang="ts">
	import { onMount } from 'svelte';
	import Bounded from './Bounded.svelte';
	import Diamond from '~icons/ph/chart-polar-fill';

	// Define the shape of a section
	interface Section {
		title: string;
		content: string;
	}

	// Initialize variables with type annotations
	let currentSectionIndex: number = 0;
	let progressWidth: number = 0;
	const sections: Section[] = [
		{
			title: 'Section 1',
			content:
				'Our innovative approach to HR services sets us apart from the competition. We utilize cutting-edge technology to streamline processes and provide real-time data and insights that help you make informed decisions. Our solutions are designed to be user-friendly and integrate seamlessly with your existing systems, ensuring minimal disruption to your operations. Whether you need assistance with payroll compliance, workforce management, or any other HR function, we have the expertise and tools to help you succeed.'
		},
		{ title: 'Section 2', content: 'Content 2' },
		{ title: 'Section 3', content: 'Content 3' }
	];
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
			if (currentSectionIndex < sections.length) {
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
</script>

<Bounded>
	
	<div class="ml-0 gap-8 items-center mx-auto">
		<div>
			{#each sections as section, index}

				<div
					class=" p-4 text-black {index === currentSectionIndex
						? 'bg-background rounded-2xl max-w-md shadow-2xl'
						: 'bg-transparent'}  w-full text-left"
				>
					<div class="diamond flex items-center">
						<Diamond class=" relative text-2xl  { index === currentSectionIndex ? 'animate-spin  text-orange-700': " text-primary"}" />
						<button
							type="button"
							class=" p-4 border-none {index === currentSectionIndex
								? 'text-orange-700'
								: 'text-black'} cursor-pointer w-full text-left"
							on:click={() => handleSectionClick(index)}
							on:keydown={(e) => e.key === 'Enter' && handleSectionClick(index)}
							aria-expanded={index === currentSectionIndex}
						>
							<p class="text-xl font-bold">{section.title}</p>
						</button>
						
					</div>
					
					{#if index === currentSectionIndex}
						<div
							class="justify-items-start max-w-3xl p-2 grid grid-cols-[20px_1fr] gap-4 grid-rows-subgrid "
						>
							<div class="grid h-full bg-gray-300 col-span-auto  rounded">
								<div class="bg-orange-700 w-2  rounded-full" style="height: {progressWidth}%"></div>
							</div>
							<p>{section.content}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</Bounded>


