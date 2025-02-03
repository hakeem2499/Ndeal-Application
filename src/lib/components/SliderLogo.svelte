<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Bounded from './Bounded.svelte';

	let reviewsContainer: HTMLElement;
	let reviews: HTMLElement;

	onMount(() => {
		console.log('slider mounteed')
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			initScroller();
			console.log("init scroller")
		}
	});

	function initScroller() {
		// Register ScrollTrigger plugin for GSAP
		gsap.registerPlugin(ScrollTrigger);
		console.log('scrolling has started')

		// Create an animation for the scroller
		gsap.to('review-content', {
			xPercent: -100,
			repeat: -1,
			duration: 20,
			ease: 'linear',
			modifiers: {
				xPercent: (x) => x % 100
			},
			// scrollTrigger: {
			// 	trigger: reviewsContainer,
			// 	start: 'top top',
			// 	end: 'bottom bottom',
			// 	scrub: 1,
			// 	pin: true,
			// 	markers: true
			// }
		});
	}
</script>

<Bounded>
	<div data-animated="true" class="scroller w-[90dvw] lg:max-w-6xl">
		<div bind:this={reviewsContainer} class="scroller__inner flex">
			<div class="review-content" bind:this={reviews}>
				<h1>You are the the king</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum temporibus amet ad
					nihil ipsum sed, eius aperiam nam incidunt deserunt molestias quidem odio ab, neque eos
					excepturi optio explicabo ex!
				</p>
			</div>
			<div class="review-content">
				<h1>You are the king</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum temporibus amet ad
					nihil ipsum sed, eius aperiam nam incidunt deserunt molestias quidem odio ab, neque eos
					excepturi optio explicabo ex!
				</p>
			</div>
			<div class="review-content">
				<h1>You are the king</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum temporibus amet ad
					nihil ipsum sed, eius aperiam nam incidunt deserunt molestias quidem odio ab, neque eos
					excepturi optio explicabo ex!
				</p>
			</div>
			<div class="review-content">
				<h1>You are the king</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum temporibus amet ad
					nihil ipsum sed, eius aperiam nam incidunt deserunt molestias quidem odio ab, neque eos
					excepturi optio explicabo ex!
				</p>
			</div>
			<div class="review-content">
				<h1>You are the king</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum temporibus amet ad
					nihil ipsum sed, eius aperiam nam incidunt deserunt molestias quidem odio ab, neque eos
					excepturi optio explicabo ex!
				</p>
			</div>
		</div>
	</div>
</Bounded>

<style>
	.scroller__inner {
		padding-block: 1rem;
		display: flex;
		gap: 1rem;
		white-space: nowrap; /* Ensure the scroller doesn't wrap to the next line */
		will-change: transform; /* Improve performance */
	}

	.scroller[data-animated='true'] {
		overflow: hidden;
		position: relative;
	}

	.scroller[data-animated='true'] .scroller__inner {
		display: flex;
		flex-wrap: nowrap;
	}

	.review-content {
		min-width: 100%; /* Each review takes up full width initially */
		flex-shrink: 0; /* Prevent reviews from shrinking */
	}

	.scroller[data-direction='right'] {
		--_animation-direction: reverse;
	}

	.scroller[data-direction='left'] {
		--_animation-direction: forwards;
	}

	.scroller[data-speed='fast'] {
		--_animation-duration: 20s;
	}

	.scroller[data-speed='slow'] {
		--_animation-duration: 60s;
	}

	/* For testing */
	.scroller__inner {
		border: 1px solid red;
	}
</style>
