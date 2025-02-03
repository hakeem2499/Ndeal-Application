<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	// Props for the target value and duration
	export let targetValue: number = 100; // Target value for the statistic
	export let duration: number = 3; // Duration of the animation in seconds

	export let currentValue: number = 80; // Initial value of the statistic
    export let title: string = "Engagement Score";
	let statElement: HTMLDivElement; // Reference to the statistic element

	// GSAP Animation
	onMount(() => {
		if (!statElement) {
			console.warn('Stat element not found');
			return;
		}

		// Animate value on scroll
		const tween = gsap.to(
			{ value: currentValue },
			{
				value: targetValue,
				duration: duration,
				ease: 'power1.out',
				onUpdate: () => {
					const tweenTargets = tween.targets() as Array<{ value: number }>;
					currentValue = Math.round(tweenTargets[0].value);
				},
				scrollTrigger: {
					trigger: statElement,
					start: 'top 80%',
					toggleActions: 'play none none reset'
				}
			}
		);

		
	});
</script>

<div class="stat-container">
    <div class="stat-number text-transparent bg-clip-text bg-gradient-to-tr font-semibold from-accent to-violet-600  text-8xl " bind:this={statElement}>{currentValue}%</div>
	<p class=" w-full text-accent font-semibold font-Just_sans_medium ">{title}</p>
    
</div>

<style>
	.stat-container {
		text-align: center;
		font-size: 2rem;
		margin: 2rem 0;
	}

	
</style>
