<script lang="ts">
	import type { Content } from '@prismicio/client';
	import WaveSvg from '$lib/images/whitewave2.svg';
	import Bounded from '$lib/components/Bounded.svelte';
	import MoveLeft from '~icons/ph/arrow-circle-left-fill';
	import MoveRight from '~icons/ph/arrow-circle-right-fill';
	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import GoldText from '$lib/components/GoldText.svelte';

	export let slice: Content.TestimonialsSlice;
	let scrollableDiv: any;

	function handleScroll(_direction: number) {
		scrollableDiv.scrollBy({
			left: _direction,
			behavior: 'smooth'
		});
	}

	function leftScroll() {
		handleScroll(300);
	}
	function rightScroll() {
		handleScroll(-300);
	}
</script>

<div>
	<img src={WaveSvg} alt="" />

	<div class=" bg-[#171717] p-2 md:w-full">
		<Bounded
			class="bg-primary"
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div class="grid md:justify-items-start justify-items-center">
				<div class=" w-full overflow-hidden">
					<div
						class="overflow-x-auto grid grid-flow-col gap-10 p-4"
						bind:this={scrollableDiv}
						id="scrollable-div"
					>
						<!-- cards -->
						{#each slice.primary.testimonials as item}
							<div
								class="flex font-poppins w-full gap-2 max-w-md flex-col rounded-xl px-8 ring-1 ring-slate-300 glass-container text-slate-200 py-4 ring-slate-300/20 xl:px-10"
							>
								<div class="w-[60dvw] grid  gap-4  items-start md:w-80">
									<div class="flex gap-2 items-center justify-center">
										<PrismicImage
											class="h-12 object-contain rounded-full border  w-12"
											field={item.image}
										/>
										<p class="text-base md:text-lg text-block font-semibold leading-8">
											<PrismicText field={item.name} />
										</p>
									</div>
									<p class="prose prose-invert leading-2 text-xs  md:text-sm lg:text-base">
										<PrismicText field={item.comment} />
									</p>
									<p class="text-accent text-base">
										<PrismicText field={item.position} />
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="item-center space-x-2 py-2">
					<button
						class=" top-0 left-0 scroll-bar z-10 text-[#f1efe7] text-5xl font-bold rounded"
						id="scroll-btn"
						on:click={rightScroll}><MoveLeft /></button
					>
					<button
						class=" top-0 left-0 scroll-bar z-10 text-[#f1efe7] text-5xl font-bold rounded"
						id="scroll-btn"
						on:click={leftScroll}><MoveRight /></button
					>
				</div>
			</div>
		</Bounded>
	</div>
</div>

<style>
	#scrollable-div {
		overflow-x: scroll;
		scrollbar-width: none;
		overscroll-behavior-inline: contain;
		scroll-snap-type: inline mandatory;
		scroll-behavior: smooth;
		-webkit-mask: linear-gradient(90deg, transparent, black 0%, black 100%, transparent);
		mask: linear-gradient(90deg, transparent, black 0%, black 100%, transparent);
	}

	#scrollable-div::-webkit-scrollbar {
		display: none;
	}

	#scrollable-div::-webkit-scrollbar-thumb {
		background-color: #ccc;
		border-radius: 4px;
	}

	#scrollable-div::-webkit-scrollbar-track {
		background-color: #eee;
		border-radius: 4px;
	}
</style>
