<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import { createEventDispatcher } from 'svelte';
	import CheckList from '~icons/mdi/star-four-points';
	import Button from '../../../lib/components/ReusableComponents/Button.svelte';
	import RegistrationSection from '../../components/RegistrationSection.svelte';

	import ArrowUp from '~icons/tabler/arrow-bar-up';
	import { showSwitchableButton, userType } from '../../../store/HomeStore';
	import Back from '~icons/ph/arrow-left-fill';
	import PopupShow from '$lib/components/ReusableComponents/PopupShow.svelte';
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	import Image from './Image.svelte';
	import Heading1 from './Heading1.svelte';
	import StyleText from './StyleText.svelte';
	export let slice: Content.HeroSlice;
	



</script>


<div class="bg-gradient-to-b from-accent via-accent to-background lg:mb-8 lg:relative">
	<Bounded class="" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
		<div
			class="flex gap-16 lg:gap-10 flex-col-reverse items-center w-full  justify-start lg:flex-row-reverse"
		>
			<div class="lg:w-3/5  right-0 p-2 bg-white   rounded-ss-2xl rounded-se-2xl border-b-primary border-8 border-transparent">
				
				 <Image/>
			</div>



			<div class="flex w-full max-md:items-center lg:w-2/5   flex-col gap-4">
				<h1
					class="text-black max-w-4xl flex text-3xl font-Just_sans_medium  md:text-4xl text-balance font-semibold flex-col"
				>
					<PrismicRichText field={slice.primary.heading} components={{ em: StyleText, heading1: Heading1 }} />
				</h1>

				<ul class="space-y-2">
					{#each slice.primary.points as point}
						<li>
							<div class=" text-pretty max-w-5xl list-item justify-start text-lg py-1">
								<CheckList class="text-lg text-green-700 text-nowrap w-auto h-auto" />
								<p class="prose">
									<PrismicRichText field={point.point} />
								</p>
							</div>
						</li>
					{/each}
				</ul>
				<div class="flex gap-2 lg:mt-8  w-full">
					<a
						class="rounded-full font-Just_sans_medium py-2 md:py-3 h-full items-center text-center  w-full text-white bg-primary  text-sm   flex  justify-center gap-2 md:gap-4 md:text-xl  "
						href="/signup"
					>
						Schedule a demo</a
					>
					<a
						href="/signup"
						class="font-Just_sans_medium h-full py-2 md:py-3  text-center  w-full rounded-3xl hover:border-secondary hover:transition-all duration-300 border border-primary  flex text-sm items-center justify-center gap-2 md:gap-4 md:text-xl "
					>
						contact sales</a
					>
				</div>
			</div>
		</div>
	</Bounded>
	
</div>

<style>
	.form-header::after {
		--distance: 1rem;
		content: '';
		position: absolute;
		top: calc(-1 * var(--distance)); /* Move up by distance */
		bottom: calc(-1 * var(--distance)); /* Move down by distance */
		left: calc(-1 * var(--distance)); /* Move left by distance */
		right: calc(-1 * var(--distance)); /* Move right by distance */
		background: #fff; /* Set background color */
		z-index: -1;
		transform: skew(-10deg); /* Skew to create parallelogram */
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-mobile {
		z-index: 1000;
		position: fixed;
	}
</style>
