<script lang="ts">
	import type { Content } from '@prismicio/client';
	import WaveSvg from '$lib/images/whitewave2.svg';
	import Bounded from '$lib/components/Bounded.svelte';
	import MoveLeft from '~icons/ph/arrow-circle-left-fill';
	import MoveRight from '~icons/ph/arrow-circle-right-fill';
	import { PrismicImage, PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import GoldText from '$lib/components/GoldText.svelte';
	import Contact from '$lib/components/ReusableComponents/Contact.svelte';

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
								class="flex font-poppins w-[60dvw] md:w-[500px] gap-2 flex-col items-center rounded-ss-2xl rounded-ee-2xl px-2 md:px-8 ring-1 ring-slate-300 text-slate-200 py-4 ring-slate-300/20 xl:px-10"
							>
								<div
									class=" md:grid flex flex-col items-center md:grid-cols-3 w-full grid-row-subgrid md:place-items-center gap-4 md:gap-8 md:justify-items-between"
								>
									<div
										class="flex col-span-1 flex-col grayscale w-full items-center justify-center gap-6"
									>
										<PrismicImage
											class="md:h-40 h-20 w-20 md:w-30 lg:w-40 object-cover rounded-md  border-none "
											field={item.image}
										/>
										<PrismicLink field={item.linkedin_link}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="30"
												height="30"
												fill="currentColor"
												class="bi bi-linkedin"
												viewBox="0 0 16 16"
												xml:space="preserve"
											>
												<path
													d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
													fill="currentColor"
												></path>
											</svg>
										</PrismicLink>
									</div>
									<div class="col-span-2 flex flex-col gap-2 md:gap-4 h-full items-center w-full">
										<p
											class="prose md:text-start text-center prose-invert leading-2 text-xs md:text-sm lg:text-base"
										>
											<PrismicText field={item.comment} />
										</p>
										<p
											class=" text-center text-brand text-sm font-Just_sans_medium uppercase md:text-base"
										>
											<PrismicText field={item.position} />
										</p>
									</div>
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
			<div class="bg-[#c9e4ca] lg:w-full px-2 ring-1 ring-slate-100/20 md:px-6 rounded-2xl py-8">
				<Contact />
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
