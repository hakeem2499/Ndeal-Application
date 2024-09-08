<script lang="ts">
	import { Points } from '../../store/contents';
	import Bounded from './Bounded.svelte';
	
	import CheckList from '~icons/ph/circle-wavy-check-bold';
	import { onMount } from 'svelte';
	import HeroTransition from '$lib/images/herosvg.svg';
	import { fade } from 'svelte/transition';
	import HeroAnimation from './HeroAnimation.svelte';

	let items = ['Hiring', 'old days', 'MakeanImpact', 'stayaloone'];

	// The index of the currently displayed item
	let currentIndex = 0;

	// This variable holds the current item to display
	let currentItem = '';

	// Interval time in milliseconds
	const intervalTime = 3000;

	// Function to update the current item
	function updateItem() {
		currentItem = items[currentIndex];
		const formHeader = document.querySelector('.form-header') as HTMLElement;
		if (formHeader) {
			// Restart the animation by forcing reflow
			formHeader.style.animation = 'none';
			formHeader.offsetHeight; // Trigger a reflow, flushing the CSS changes
			formHeader.style.animation = ''; // Reapply the animation

			currentIndex = (currentIndex + 1) % items.length;
		}
	}

	

	// Use onMount to start the interval when the component is mounted
	onMount(() => {
		updateItem(); // Display the first item immediately
		const interval = setInterval(updateItem, intervalTime);
		return () => clearInterval(interval); // Clear interval on component destruction
	});
</script>

<Bounded class="bg-accent">
	<div class="grid lg:justify-items-end lg:grid-cols-2 md:first:mt-6 gap-4">
		<div class="space-y-2">
			<h1
				class="text-black max-w-2xl flex text-4xl lg:text-6xl text-balance font-semibold flex-col"
			>
				Leading the Revolution for Fair Employment and Ethical Standards.
			</h1>
			<p class="font-semibold text-2xl">Bringing Nigerians to Work</p>
			
			{#each Points as point}
				<ul class="space-y-2">
					<li>
						<span class=" text-pretty max-w-4xl list-item justify-start text-lg py-1">
							<CheckList class="text-xl text-green-700 text-nowrap w-auto h-auto" />
							{point}
						</span>
					</li>
				</ul>
			{/each}
		</div>
		<div class="flex flex-col mt-6 justify-center items-center gap-3">
			<!-- <h2 class="form-header animate-fadeHero relative z-10 text-2xl text-green-900">
				{currentItem}
			</h2> -->

			
			<HeroAnimation />

			
			<!-- <img src={HeroTransition} alt=""> -->
		</div>
	</div>

	<!-- <h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter /> -->
</Bounded>

<style>
	.form-header::after {
		--distance: 1rem;
		content: '';
		position: absolute;
		top: calc(-1 * var(--distance)); /* Move up by distance */
		bottom: calc(-1 * var(--distance)); /* Move down by distance */
		left: calc(-1 * var(--distance)); /* Move left by distance */
		right: calc(-1 * var(--distance)); /* Move right by distance */
		background: #fff; /* Set background color */
		z-index: -1;
		transform: skew(-10deg); /* Skew to create parallelogram */
	}
</style>
