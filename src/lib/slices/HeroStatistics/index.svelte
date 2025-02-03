<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import CountingStats from '$lib/components/ReusableComponents/CountingStats.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	let count = 0;
	let targetValue = 100;

	export let slice: Content.HeroStatisticsSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="w-full md:max-h-screen -z-10 relative h-auto">
		<PrismicImage class="h-auto w-full" field={slice.primary.image} />
		<div
			class="absolute z-40 bottom-0 bg-gradient-to-b from-transparent to-primary via-primary w-full md:h-[40%] h-20"
		></div>
	</div>
	<div class="md:-mt-40 -mt-20 bg-gradient-to-b from-transparent to-primary via-primary z-60">
		<div class="flex w-full p-4 gap-2 md:h-80 place-items-center flex-col md:flex-row items-center">
			{#each slice.primary.statistic as item}
				<div
					class="flex md:w-1/3 md: w-full px-4 py-8 md:py-12 justify-center items-center bg-primary text-secondary rounded-md flex-col gap-4"
				>
					<div
						class="text-transparent text-7xl md:text-8xl bg-gradient-to-r bg-clip-text from-accent to-violet-600 via-background"
					>
						<PrismicText field={item.number} />
					</div>
					<p>
						<PrismicText field={item.body} />
					</p>
				</div>
			{/each}
		</div>
		<div class="w-full flex items-center justify-center bg-primary">
			<div class="relative  m-4 px-8  md:w-[40%] ">
				<div class="w-[20%] right-[50%] top-6 absolute h-1 rounded-full ml-2 bg-accent"></div>
				<CountingStats title={"User Experience and Process Improvement"} currentValue={50} targetValue={75} duration={1} />
			</div>
		</div>
	</div>
</section>
