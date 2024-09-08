<script lang="ts">
	import { onMount } from 'svelte';
	import Bounded from './Bounded.svelte';

	const images = import.meta.glob(['$lib/images/*.jpg', '$lib/images/*.png', '$lib/images/*.svg'], {
		eager: true,
		as: 'url'
	});

	let logoUrls = [
		'/src/lib/images/chippper.svg',
		'/src/lib/images/fluttterwave.svg',
		'/src/lib/images/GEEPEE.svg',
		'/src/lib/images/holb.svg',
		'/src/lib/images/irokosmall.svg',
		'/src/lib/images/jumia.svg',
		'/src/lib/images/konga.svg',
		'/src/lib/images/kudsm.svg',
		'/src/lib/images/moniep.svg',
		'/src/lib/images/sspecs.svg',
	];

	let scrollers: any = [];

	onMount(() => {
		scrollers = document.querySelectorAll('.scroller');

		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			addAnimation();
		}
	});

	function addAnimation() {
		scrollers.forEach((scroller: any) => {
			scroller.setAttribute('data-animated', true);

			const scrollerInner = scroller.querySelector('.scroller__inner');
			const scrollerContent = Array.from(scrollerInner.children);

			scrollerContent.forEach((item: any) => {
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});
		});
	}
</script>

<Bounded>
	<p class="text-gray-600 text-center">WE ARE IN TOUCH WITH THIS COMPANIES</p>
	<div class="scroller" data-animated="true">
		<div class="tag-list scroller__inner">
			{#each logoUrls as logoUrl (logoUrl)}
				<img src={images[logoUrl]} alt="Company Logo" />
			{/each}
		</div>
	</div>
</Bounded>

<style>
	.scroller {
		max-width: 8	0dvw;
	}

	.scroller__inner {
		padding-block: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
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
		--_animation-duration: 60s;
	}

	@keyframes scroll {
		to {
			transform: translate(calc(-50% - 0.5rem));
		}
	}

	/* general styles */

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

	.tag-list img {
		scale: 2;
		filter: grayscale(100%);
		image-rendering: crisp-edges;
	}
</style>
