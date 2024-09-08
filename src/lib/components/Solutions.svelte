<script>
	import Image from '$lib/images/heroimage.webp';

	import Bounded from './Bounded.svelte';
	import ButtonLink from './ButtonLink.svelte';
	import AnchorLinkFooter from './ReusableComponents/AnchorLinkFooter.svelte';

	// Track whether the device supports hover
	let supportsHover = false;

	// Detect hover capability on component mount
	// if (window.matchMedia('(hover: hover)').matches) {
	// 	supportsHover = true;
	// }

	let isClicked = false;

	function handleClick() {
		// Toggle click state if device does not support hover
		if (!supportsHover) {
			isClicked = !isClicked;
		}
	}
</script>

<Bounded class="bg-primary text-white">
	<div class="flex  mx-auto gap-4 justify-center flex-col items-center">
		<h2 class="text-2xl">What we do</h2>

		<p class="">What is your name</p>
		<ButtonLink class="text-white ">Learn More about our services</ButtonLink>
	</div>
	<div
		class="mt-16 grid max-w-7xl text-white grid-rows-[auto_auto_auto] gap-4   md:grid-cols-2 lg:grid-cols-4 md:gap-2 lg:gap-4"
	>
		<div
			class="card group border-2 border-accent  relative hover:-translate-y-1 text-white active:-translate-y-1 duration-500 md:py-6 p-6 md:px-6 row-span-2 grid grid-rows-subgrid gap-10 md:gap-16 rounded-[5px] bg-primary" 
		>
			<div class="overflow-x-hidden relative z-10 text-balance flex flex-col gap-8 min-h-80 prose">
				<h3
					class="card-heading relative group-hover:translate-x-10 max-w-sm text-white font-semibold group-hover:translate-y-10 duration-300 text-2xl"
				>
					Plaster of Paris is the name
				</h3>
				<p
					class="lg:translate-x-[100%] mt-6 group-hover:translate-x-[100] duration-300 group-hover:block prose text-white text-pretty"
				>
					Nigeria's healthcare sector faces challenges like brain drain, high employee turnover, and
					limited resources. HR solutions can help manage talent, ensure compliance with
					regulations, and enhance employee engagement to improve patient care.
				</p>
			</div>

			<AnchorLinkFooter class="z-10" href="">Expand</AnchorLinkFooter>
		</div>
	</div>
</Bounded>

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
		background-image: url('/src/lib/images/Mobile Your Story.png');
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
		background: linear-gradient(to bottom right, var(--color-primary), rgba(123, 7, 7, 0.5));
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
</style>
