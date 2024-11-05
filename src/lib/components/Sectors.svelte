<!-- <script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import MoveLeft from '~icons/ph/arrow-square-left';
	import MoveRight from '~icons/ph/arrow-square-right';
	import Image from '$lib/images/heroimage.webp';
	import ButtonLink from './ButtonLink.svelte';
	import AnchorLink from './ReusableComponents/AnchorLink.svelte';
	import Bounded from './Bounded.svelte';

	let scrollableDiv: HTMLDivElement | null = null;
	let carouselWrapper: HTMLDivElement | null = null;
	let isPaused = false;
	let scrollInterval: any;

	function rightScroll() {
		if (scrollableDiv) {
			const containerWidth = scrollableDiv.clientWidth;
			scrollableDiv.scrollBy({ left: containerWidth, behavior: 'smooth' });
		}
	}

	function leftScroll() {
		if (scrollableDiv) {
			const containerWidth = scrollableDiv.clientWidth;
			scrollableDiv.scrollBy({ left: -containerWidth, behavior: 'smooth' });
		}
	}

	function startAutoScroll() {
		scrollInterval = setInterval(() => {
			if (!isPaused && scrollableDiv) {
				const containerWidth = scrollableDiv.clientWidth;
				if (scrollableDiv.scrollLeft + containerWidth >= scrollableDiv.scrollWidth) {
					scrollableDiv.scrollTo({ left: 0, behavior: 'smooth' });
				} else {
					rightScroll();
				}
			}
		}, 10000); // Auto-scroll interval
	}

	function toggleAutoScroll() {
		isPaused = !isPaused;
		if (isPaused) {
			clearInterval(scrollInterval);
		} else {
			startAutoScroll();
		}
	}

	function applySmoothScroll() {
		scrollableDiv?.style.setProperty('scroll-behavior', 'smooth', 'important');
	}

	function handleMouseEnter() {
		isPaused = true;
		clearInterval(scrollInterval);
	}

	function handleMouseLeave() {
		isPaused = false;
		startAutoScroll();
	}

	onMount(() => {
		applySmoothScroll();
		startAutoScroll();
		if (carouselWrapper) {
			(carouselWrapper as HTMLElement).addEventListener('mouseenter', handleMouseEnter);
			(carouselWrapper as HTMLElement).addEventListener('mouseleave', handleMouseLeave);
		}
	});

	onDestroy(() => {
		clearInterval(scrollInterval);
		if (carouselWrapper) {
			(carouselWrapper as HTMLElement).removeEventListener('mouseenter', handleMouseEnter);
			(carouselWrapper as HTMLElement).removeEventListener('mouseleave', handleMouseLeave);
		}
	});

	
</script> -->

<!-- <div class="carousel-wrapper mx-auto py-8 md:py-16 bg-[#171717]">
	<div class="carousel-content grid md:justify-items-start justify-items-center">
		<div class="scroll-container" bind:this={scrollableDiv}>
			<!-- Cards -->
<!-- <div
				class="flex group relative md:p-4 flex-col md:gap-20 md:justify-between md:flex-row scroll-item" 
			>
				<img
					src={Image}
					class=" w-full h-full object-cover sm:w-1/2 rounded-lg"
					alt="whatever Description"
				/>
				<div>
					<div
						class="flex group relative group-hover:scale-105 transition-transform duration-300 ease-in-out flex-col gap-3 md:gap-6 text-white items-start justify-between"
					>
						<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						<p class="text-balance">
							"Their graduate employment program helped us find talented individuals who are now
							valuable members of our team."
						</p>
						<AnchorLink>Learn More</AnchorLink>
					</div>
				</div>
			</div> -->
<!-- <div class="flex flex-col md:gap-20 md:justify-between md:flex-row scroll-item">
				<img
					src={Image}
					class="w-full h-2/3 object-cover sm:w-1/2 rounded-lg"
					alt="whatever Description"
				/>
				<div>
					<div class="flex flex-col text-white items-start justify-between">
						<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						<p class="text-balance">
							"Their graduate employment program helped us find talented individuals who are now
							valuable members of our team."
						</p>
						<ButtonLink>Learn More</ButtonLink>
					</div>
				</div>
			</div>
			<div class="flex flex-col md:gap-20 md:justify-between md:flex-row scroll-item">
				<img
					src={Image}
					class="w-full h-2/3 object-cover sm:w-1/2 rounded-lg"
					alt="whatever Description"
				/>
				<div>
					<div class="flex flex-col text-white items-start justify-between">
						<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						<p class="text-balance">
							"Their graduate employment program helped us find talented individuals who are now
							valuable members of our team."
						</p>
						<ButtonLink>Learn More</ButtonLink>
					</div>
				</div>
			</div>
			<div class="flex flex-col md:gap-20 md:justify-between md:flex-row scroll-item">
				<img
					src={Image}
					class="w-full h-2/3 object-cover sm:w-1/2 rounded-lg"
					alt="whatever Description"
				/>
				<div>
					<div class="flex flex-col text-white items-start justify-between">
						<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						<p class="text-balance">
							"Their graduate employment program helped us find talented individuals who are now
							valuable members of our team."
						</p>
						<ButtonLink>Learn More</ButtonLink>
					</div>
				</div>
			</div>
		</div> -->

<!-- Controls -->
<!-- </div>
	<div class="controls items-center">
		<button class="playpause border" on:click={toggleAutoScroll} class:playing={!isPaused}>
			<div class="button"></div>
		</button>
		<div class="items-center justify-center flex">
			<button class="scroll-btn left-btn" on:click={leftScroll}><MoveLeft /></button>
			<button class="scroll-btn right-btn" on:click={rightScroll}><MoveRight /></button>
		</div>
	</div>
</div> -->

<!-- <style>
	.carousel-wrapper {
		position: relative;
		overflow: hidden;
		display: grid;
		animation: autoScroll 20s cubic-bezier(0.42, 0, 0.58, 1) infinite;
	}

	.carousel-content {
		display: flex;
		justify-content: center;
		overflow: hidden;

	}

	.scroll-container {
		display: flex;
		overflow-x: hidden;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scroll-behavior: smooth;
		transition: transform 1.5s cubic-bezier(0.42, 0, 0.58, 1); /* Smoother transition */
	}

	.scroll-container::-webkit-scrollbar {
		display: none;
	}

	.scroll-item {
		flex: 0 0 100%;
		scroll-snap-align: start;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		box-sizing: border-box;
	}

	.carousel-text {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: left;
		color: white;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		position: relative;
		width: 100%;
		top: 50%;
	}

	.scroll-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 2rem;
		color: #f1efe7;
		pointer-events: auto;
	}

	.playpause {
		padding: 0.5rem;
		background: #464646;
		cursor: pointer;
		transition: background-color 0.3s ease-in-out;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.playpause .button {
		width: 1rem;
		height: 1rem;
		background: #f1efe7;
		transition: clip-path 0.3s ease-in-out;
		clip-path: polygon(10% 10%, 10% 90%, 90% 50%);
	}

	.playpause.playing .button {
		clip-path: polygon(0 0, 40% 0, 40% 100%, 60% 100%, 60% 0, 100% 0, 100% 100%, 0 100%);
	}

	@keyframes autoScroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-100% + 100vw));
		}
	}
</style> -->

<script>
	import Image from '$lib/images/heroimage.webp';
	import BgNoise from '$lib/images/education.jpg';
	import Bounded from './Bounded.svelte';
	import svg from '../images/growth.svg';
</script>

<div class="flex my-10 md:my-16 lg:my-20 flex-col gap-20">
	<h2
		class="showcase__heading max-w-3xl md:max-w-5xl text-balance mx-auto text-center text-4xl font-medium lg:text-5xl"
	>
		Pioneering Fair Employment and Ethical Practices
	</h2>

	<div class="flex md:mx-6 flex-col gap-4 md:gap-10 lg:gap-20 justify-between md:flex-row">
		<div class="sectors max-w-[90dvw] m-2 mx-auto md:m-0 md:w-[50dvw] flex-1">
			<div
				class="sector-element h-fit relative rounded-md m-4 border-t-8 border-primary text-white justify-between"
			>
				<img src={BgNoise} class="h-full absolute -z-10 w-full" alt="" />
				<div class="p-2 md:p-4 gap-2 flex flex-col items-center">
					<h3 class=" text-xl ">Some heaeding 3 Text</h3>
					<div class="image-wrapper m-2 md:m-4 relative">

						<img class="header p-1 relative" src={Image} alt="" />
					</div>

					<p class="text-xs lg:text-[.95rem] prose prose-lg text-slate-200">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil ducimus fugit pariatur,
						velit debitis nesciunt blanditiis beatae neque molestias corporis sunt nemo adipisci
						quas. Voluptas nihil maiores fugit recusandae. Nihil.
					</p>
					<p class=" text-xs lg:text-[.95rem] prose prose-lg text-slate-200">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil ducimus fugit pariatur,
						velit debitis nesciunt blanditiis beatae neque molestias corporis sunt nemo adipisci
						quas. Voluptas nihil maiores fugit recusandae. Nihil.
					</p>
					<a href="">Learn More</a>
				</div>
			</div>
			<Bounded class="sector-element">
				<h3>Some heaeding 3 Text</h3>
				<img src={Image} alt="" />
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis, quia
					dolores voluptatibus numquam quod impedit neque modi veritatis quis autem beatae explicabo
					dolore unde sint suscipit! Facere, earum voluptate!
				</p>
				<a href="">Expan</a>
			</Bounded>
			<div class="sector-element">
				<h3>Some heaeding 3 Text</h3>
				<img src={Image} alt="" />
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, nemo accusantium
					aspernatur nostrum tenetur quod nesciunt nobis ut ipsa perferendis. Quis ab itaque nulla
					recusandae. Suscipit incidunt beatae consequuntur! Necessitatibus!
				</p>
				<a href="">Expand</a>
			</div>
			<div class="sector-element">
				<h3>Some heaeding 3 Text</h3>
				<img class="rounded-lg p-4 border-4" src={Image} alt="" />
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptates eveniet et,
					debitis at fugit aliquid enim doloremque quasi accusamus aperiam perspiciatis saepe labore
					eligendi hic tempora repudiandae maiores ex!
				</p>
				<a href="">Expand</a>
			</div>
			<div class="sector-element">
				<h3>Some heaeding 3 Text</h3>
				<img src={Image} alt="" />
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab placeat unde eligendi odio
					nisi
				</p>
				<a href="">Expand</a>
			</div>
		</div>
		<div
			class="flex flex-col md:max-h-[90dvh] md:h-full flex-1 items-center gap-4 md:mt-4 md:w-[30dvw]"
		>
			<div
				class="div ring-1 w-[80dvw] h-fit group flex items-center justify-between md:min-h-[25dvh] text-sm md:font-normal md:w-full ring-primary my-1 md:m-0"
			>
				<img src={svg} class="h-auto p-2 max-w-[25%]" alt="" />
				<div
					class="flex m-2 lg:m-0 p-4 gap-4 group-hover:bg-primary group-hover:text-background rounded-ss-2xl flex-col"
				>
					<h3 class="text-xl md:text-2xl font-poppins">Lorem ipsum dolor</h3>
					<p class="text-sm md:text-base">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consectetur
						architecto
					</p>
				</div>
			</div>
			<div class="div">
				<h3>Lorem ipsum dolor sit</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consectetur architecto
				</p>
			</div>
			<div class="div">
				<h3>Lorem ipsum dolor, sit</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consectetur architecto
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.div {
		border-radius: 1rem 0;
		transform: scaleX(100%);
		transition: transform 500ms ease-in-out;
		transform-origin: right;
		background-color: var(--color-background);
		border: 4rem;
	}

	.div :nth-child(2) {
		@apply justify-self-end;
	}

	.div:hover {
		transform: scaleX(110%);
	}
	.div:focus-within {
		transform: scale(110%);
		background-color: var(--color-primary);
		color: var(--color-background);
	}
	.sectors {
		--_spacer: 1rem;
		display: grid;
		gap: var(--_spacer);
		grid-auto-flow: column;
		grid-auto-columns: 95%;
		overflow-x: auto;
		overscroll-behavior-inline: contain;
		scroll-snap-align: start;
		scroll-snap-type: inline mandatory;
		scroll-padding-inline: var(--_spacer, 1rem);
		@apply rounded-md;
	}

	.sectors::-webkit-scrollbar {
		width: 2em;
		height: 1em;
	}

	.sectors::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 100vw;
		margin-block: 0.5em;
	}

	.sectors::-webkit-scrollbar-thumb {
		background: var(--color-primary);
		border: 0.25em solid var(--color-background);
		border-radius: 100vw;
	}

	.sectors::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary);
	}

	.sector-element > h3,
	p,
	a {
		padding: 1rem;
	}

	.snaps-inline {
		scroll-snap-type: inline mandatory;
		scroll-padding-inline: var(--_spacer, 1rem);
	}

	.image-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: -.75rem;
    bottom: 0;
	height:102%;
    width: 100%; /* Adjust this to control the width of the cut effect */
    background: #fff; /* Adjust this to match your desired color */
    transform: skew(5deg); /* Create the diagonal cut */
    transform-origin: top left;
    z-index: -1; /* Ensure it appears above the image */
    pointer-events: none; /* Prevents interactions with the overlay */
}

</style>
