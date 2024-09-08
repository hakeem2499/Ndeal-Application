<script lang="ts">
	import { onMount } from 'svelte';
	import Bounded from './Bounded.svelte';
	import { Professions, ProfessionsReverse } from '../../store/contents';

	let scrollers: NodeListOf<Element>;

	onMount(() => {
		scrollers = document.querySelectorAll('.scroller');

		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			addAnimation();
			addEventListeners();
		}
	});

	function addAnimation() {
		scrollers.forEach((scroller: any) => {
			scroller.setAttribute('data-animated', true);

			const scrollerInner = scroller.querySelector('.scroller__inner');
			const scrollerContent = Array.from(scrollerInner.children);

			// Duplicate the content to create the infinite loop effect
			scrollerContent.forEach((item: any) => {
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});
            
		});
	}

	function addEventListeners() {
		scrollers.forEach((scroller: any) => {
			scroller.addEventListener('mouseenter', () => enableManualScroll(scroller));
			scroller.addEventListener('mouseleave', () => disableManualScroll(scroller));
			scroller.addEventListener('touchstart', () => enableManualScroll(scroller));
			scroller.addEventListener('touchend', () => disableManualScroll(scroller));
		});
	}

	function enableManualScroll(scroller: any) {
		const scrollerInner = scroller.querySelector('.scroller__inner');
		scrollerInner.style.animationPlayState = 'paused'; // Stop automatic scroll
		scroller.style.overflowX = 'auto'; // Enable horizontal scroll
		scroller.style.maskImage = 'none'; // Remove the mask effect
		scroller.style.webkitMaskImage = 'none'; // Remove the mask effect for WebKit browsers
	}

	function disableManualScroll(scroller: any) {
		const scrollerInner = scroller.querySelector('.scroller__inner');
		scrollerInner.style.animationPlayState = 'running'; // Resume automatic scroll
		scroller.style.overflowX = 'hidden'; // Disable horizontal scroll
		scroller.style.maskImage = ''; // Reapply the mask effect
		scroller.style.webkitMaskImage = ''; // Reapply the mask effect for WebKit browsers
	}
</script>

<Bounded>
	<p class="text-gray-600 text-center">Whatever your profession</p>
	<div class="scroller" data-animated="true" data-direction="right" data-speed="slow">
		<div class="tag-list scroller__inner">
			{#each Professions as items}
				<button class="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200">
					{items}
				</button>
			{/each}
		</div>
	</div>
	<div class="scroller" data-animated="true" data-direction="left" data-speed="slow">
		<div class="tag-list scroller__inner">
			{#each ProfessionsReverse as items}
				<button class="rounded-lg bg-slate-200 p-2 hover:bg-blue-600">
					{items}
				</button>
			{/each}
		</div>
	</div>
</Bounded>

<style>
	.scroller {
		max-width: 100%;
        
	}

	.scroller__inner {
		padding-block: 1rem;
		display: flex;
		flex-wrap: nowrap;
		gap: 1rem;
		overflow-x: scroll; /* Enable horizontal scroll */
		scrollbar-width: none; /* Hide scrollbar for Firefox */
		-ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
	}

	.scroller__inner::-webkit-scrollbar {
		display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
	}

	.scroller[data-animated='true'] {
		overflow: hidden;
		-webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
		mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
	}

	.scroller[data-animated='true'] .scroller__inner {
		width: max-content;
		flex-wrap: nowrap;
		animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear
			infinite;
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
		--_animation-duration: 240s;
	}

	@keyframes scroll {
		to {
			transform: translate(calc(-50% - 0.5rem));
		}
	}

	:root {
		--clr-neutral-100: hsl(0, 0%, 100%);
		--clr-primary-100: hsl(205, 15%, 58%);
		--clr-primary-400: hsl(215, 25%, 27%);
		--clr-primary-800: hsl(217, 33%, 17%);
		--clr-primary-900: hsl(218, 33%, 9%);
	}

	.tag-list {
		margin: 0;
		padding-inline: 0;
		list-style: none;
	}

	.tag-list button {
		/* Customize buttons as needed */
	}
</style>
