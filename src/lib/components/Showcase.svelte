<script>
	import Image from '$lib/images/heroimage.webp';
	import DisplayImage from '$lib/images/DisplayImage.png';
	import Bounded from './Bounded.svelte';
	import ButtonLink from './ButtonLink.svelte';
	import AnchorLink from './ReusableComponents/AnchorLink.svelte';
	import YoutubeVideoEmbed from './YoutubeVideoEmbed.svelte';
	import RegistrationSection from './RegistrationSection.svelte';
</script>

<Bounded>
	<div class="flex ml-0 mx-auto gap-4 justify-start flex-col items-start">
		<h2 class="text-2xl">What we do</h2>

		<p class="">What is your name</p>
		<ButtonLink>Learn More about our services</ButtonLink>
	</div>
	<div
		class="mt-16 grid max-w-7xl text-white grid-rows-[auto_auto_auto] gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-2 lg:gap-4"
	>
		<div
			class="card hover:-translate-y-1 active:-translate-y-1 duration-500 md:py-4 p-6 md:px-8 row-span-4 grid grid-rows-subgrid gap-2 md:gap-6 rounded-[5px] bg-[#171717]"
		>
			<div class=" text-balance flex flex-col gap-4 items-center prose">
				<h3 class="card-heading relative text-center mt-2 text-white font-semibold text-2xl">
					Plaster of Paris
				</h3>
				<p class="prose text-white text-pretty">
					Nigeria's healthcare sector faces challenges like brain drain, high employee turnover, and
					limited resources. HR solutions can help manage talent, ensure compliance with
					regulations, and enhance employee engagement to improve patient care.
				</p>
			</div>
			<div class="max-h-42 max-w-sm">
				<img src={Image} alt="" />
			</div>
			<AnchorLink href="">Expand</AnchorLink>
		</div>
	</div>
	<!-- <div class="p-8">
		<YoutubeVideoEmbed />
	</div> -->

	<h2
		class="hero_heading max-w-3xl mt-16 md:mt-20 mx-auto text-center text-balance text-4xl font-medium md:text-7xl"
	>
		Streamline Operations, Simplify Tasks, Maximize Productivity
	</h2>
	<Bounded class="hero_image  w-fit">
		<picture>
			<img
				class="rounded-lg border-4"
				src={DisplayImage}
				alt="A beautiful sunset over the mountains"
				loading="lazy"
			/>
			<RegistrationSection />
		</picture>
	</Bounded>
</Bounded>

<style>
	.card-heading::after {
		content: '';
		position: absolute;
		height: 2px;
		left: 0;
		bottom: -0.5rem;
		width: 100%;
		background: white;
		transform: scaleX(0);
		transition: transform 500ms ease;
		transform-origin: left;
	}

	.card:hover .card-heading::after {
		transform: scaleX(1);
	}

	@media (prefers-reduced-motion: reduce) {
		.card-heading::after {
			/* Remove transitions or reduce their duration */
			transition: none;
		}
	}
</style>
