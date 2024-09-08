<script lang="ts">
	import Bounded from './Bounded.svelte';
	import MoveLeft from '~icons/ph/arrow-circle-left-fill';
	import MoveRight from '~icons/ph/arrow-circle-right-fill';
	import Location from '~icons/ph/map-pin-fill';
	import TestimonialCard from './ReusableComponents/TestimonialCard.svelte';

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

<Bounded class="bg-[#171717] ">
	<div class="grid md:justify-items-start justify-items-center">
		<div class=" w-full overflow-hidden">
			<div
				class="overflow-x-auto grid grid-flow-col gap-10 p-4"
				bind:this={scrollableDiv}
				id="scrollable-div"
			>
				<!-- cards -->

				<div
					class="flex w-full max-w-md flex-col justify-between rounded-xl p-8 ring-1 ring-slate-300 glass-container text-slate-200 ring-slate-300/20 xl:p-10"
				>
					<div class="w-40 md:w-64">
						<div class="flex items-center justify-between">
							<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						</div>
						<div class="">
							<p class="text-balance">
								"Their graduate employment program helped us find talented individuals who are now
								valuable members of our team."
							</p>
						</div>
					</div>
					<div class=" mt-4">
						<span><Location class="text-yellow-500" />Abuja</span>
					</div>
				</div>
				<div
					class="flex w-full max-w-md flex-col justify-between rounded-xl p-8 ring-1 ring-slate-300 glass-container text-slate-200 ring-slate-300/20 xl:p-10"
				>
					<div class="w-40 md:w-64">
						<div class="flex items-center justify-between">
							<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						</div>
						<div class="">
							<p class="text-balance">
								"Their graduate employment program helped us find talented individuals who are now
								valuable members of our team."
							</p>
						</div>
					</div>
					<div class=" mt-4">
						<span><Location class="text-yellow-500" />Abuja</span>
					</div>
				</div>
				<div
					class="flex w-full max-w-md flex-col justify-between rounded-xl p-8 ring-1 ring-slate-300 glass-container text-slate-200 ring-slate-300/20 xl:p-10"
				>
					<div class="w-40 md:w-64">
						<div class="flex items-center justify-between">
							<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						</div>
						<div class="">
							<p class="text-balance">
								"Their graduate employment program helped us find talented individuals who are now
								valuable members of our team."
							</p>
						</div>
					</div>
					<div class=" mt-4">
						<span><Location class="text-yellow-500" />Abuja</span>
					</div>
				</div>
				<div
					class="flex w-full max-w-md flex-col justify-between rounded-xl p-8 ring-1 ring-slate-300 glass-container text-slate-200 ring-slate-300/20 xl:p-10"
				>
					<div class="w-40 md:w-64">
						<div class="flex items-center justify-between">
							<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						</div>
						<div class="">
							<p class="text-balance">
								"Their graduate employment program helped us find talented individuals who are now
								valuable members of our team."
							</p>
						</div>
					</div>
					<div class=" mt-4">
						<span><Location class="text-yellow-500" />Abuja</span>
					</div>
				</div>
				<div
					class="flex w-full flex-col justify-between rounded-xl p-8 ring-1 ring-slate-300 glass-container text-slate-200 ring-slate-300/20 xl:p-10"
				>
					<div class="w-40 md:w-64">
						<div class="flex items-center justify-between">
							<h3 id="tier-starter" class="text-lg font-semibold leading-8">Hakeem</h3>
						</div>
						<div class="">
							<p class="text-balance">
								"Their graduate employment program helped us find talented individuals who are now
								valuable members of our team."
							</p>
						</div>
					</div>
					<div class="flex gap-1 items-center mt-8">
						<Location class="text-yellow-500" />Abuja
					</div>
				</div>
				<TestimonialCard
					title="Hakeem on ton do"
					testimonial="Their graduate employment program helped us find talented individuals who are now valuable members of our team."
					location="Abuja"
					icon={Location}
				/>
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
	</div></Bounded
>

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
