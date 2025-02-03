<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicLink, PrismicText } from '@prismicio/svelte';

	export let slice: Content.VideoHeroSlice;

	console.log(slice.primary.video.html);
</script>

<!-- Content -->
<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="flex flex-col items-center w-full justify-between gap-4 md:gap-6 lg:flex-row">
		<!--  YouTube Video -->
		<div id="hero-video">
			<iframe
				title="hero-video"
				id="video-background"
				width="100%"
				height="100%"
				src="https://www.youtube.com/embed/Lso1Wh35tbU?autoplay=1&loop=1&controls=0&mute=1&playlist=Lso1Wh35tbU"
				frameborder="0"
				allow="autoplay; encrypted-media; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		<div class="flex flex-col mt-12  md:mt-24 lg:w-1/2 gap-4 md:gap-8">
			<h1 class="w-full rounded-lg text-4xl text-accent  md:text-5xl lg:text-6xl max-w-5xl leading-1">
				<PrismicText field={slice.primary.heading} />
			</h1>
			<div
				class="prose prose-invert border-l-4 px-2 md:px-4 border-accent text-secondary text-lg md:text-xl mt-4 max-w-4xl"
			>
				<PrismicText field={slice.primary.body} />
			</div>
			<PrismicLink
				class="anchor-link-white  w-fit text-semibold text-background text-lg font-Just_sans_medium"
				field={slice.primary.cta_link}
			/>
		</div>
	</div>
</Bounded>

<style>
	#hero-video {
		@apply w-full lg:w-1/2;

		height: 0;
		padding-bottom: 56.25%; /* Aspect ratio for 16:9 video */
		position: relative;
	}

	#video-background {
		position: absolute;
		top: 25%;

		@apply right-0 h-full lg:h-1/2 left-0 md:right-auto;
		width: 100%;
		
	}
</style>
