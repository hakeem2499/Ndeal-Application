<script lang="ts">
	import herowave from '$lib/images/herowave.svg';
	import Bounded from '$lib/components/Bounded.svelte';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	import { onMount } from 'svelte';
	import { Points } from '../../store/contents';
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import Bento from '$lib/components/Bento.svelte';
	import wave from '$lib/images/solutionswave.svg';

	import WaveSvg from '$lib/images/whitewave2.svg';
	import Hero from '$lib/components/Hero.svelte';
	import YoutubeVideoEmbed from '$lib/components/YoutubeVideoEmbed.svelte';
	import Sectors from '$lib/components/Sectors.svelte';
	import Showcase from '$lib/components/Showcase.svelte';
	import Services from '$lib/components/Services.svelte';
	import OnBoarding from '$lib/components/OnBoarding.svelte';
	import Solutions from '$lib/components/Solutions.svelte';
	import RegistrationSection from '$lib/components/RegistrationSection.svelte';
	import { PrismicImage } from '@prismicio/svelte';

	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<Hero />
<Showcase />
<Sectors />
<!-- <div class=" md:w-full">
	<SliderLogo />
</div> -->

<Bento />
<Services />
<div class="sectioned-layer">
	<div>
		<Solutions />
		<img src={wave} alt="" />
	</div>
	<OnBoarding />

	<div>
		<img src={WaveSvg} alt="" />

		<div class=" bg-[#171717] p-2 md:w-full">
			<TestimonialCard />
		</div>
	</div>
</div>
<div>
	<!-- <PrismicImage field={data.image} class="h-fit" /> -->

</div>

<!-- <style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style> -->

<style>
	.sectioned-layer {
		background-image: url('/src/lib/images/nnnoise.svg');
	}
	.wave-two {
		fill: #171717;
	}
</style>
