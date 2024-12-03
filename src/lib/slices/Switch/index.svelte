<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import PopupShow from '$lib/components/ReusableComponents/PopupShow.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	import Cancel from '~icons/ph/x-thin';
	import DotSquare from '~icons/mdi/square-inc';

	export let slice: Content.SwitchSlice;
	let showPopup: boolean = false;
	let currentSectionIndex: number = 0;

	function handleshowPopup(index: number) {
		currentSectionIndex = index; // Ensure the index is set before showing the popup
		showPopup = true;
	}
	function closeShowPopup() {
		showPopup = false;
	}

	function handleFocus(event: FocusEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		throw new Error('Function not implemented.');
	}
</script>

<Bounded class="lg:h-[900px] h-dvh" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h2 class="lg:pb-20 text-3xl text-balance text-accent text-center lg:text-6xl md:text-5xl font-Just_sans max-w-8xl">
		<PrismicText field={slice.primary.heading} />
	</h2>
	<div class="flex justify-between lg:gap-4 w-full">
		<div class="flex flex-col">
			{#each slice.primary.subsection as item, index}
				<!-- Desktop Section Buttons -->
				<button
					type="button"
					class="p-4 w-full items-center gap-4 font-semibold hidden lg:flex font-poppins md:text-3xl border-none
						{index === currentSectionIndex
						? 'text-white  transition-transform duration-700 translate-x-4'
						: 'text-secondary'} cursor-pointer"
					on:focus={handleFocus}
					on:mouseover={() => (currentSectionIndex = index)}
					aria-expanded={index === currentSectionIndex}
				><span class=" {index === currentSectionIndex ? 'flex' : 'hidden' } text-lg text-accent"><DotSquare/></span>
					<PrismicText field={item.heading} />
				</button>
			{/each}
		</div>

		<!-- Mobile -->
		<div class="flex mx-auto mt-8 flex-col lg:hidden">
			{#each slice.primary.subsection as item, index}
				<button
					type="button"
					class="block p-4 font-semibold font-poppins md:text-lg border-none
						{index === currentSectionIndex ? 'text-white ' : 'text-secondary'} cursor-pointer w-full text-left"
					on:click={() => handleshowPopup(index)}
					aria-expanded={index === currentSectionIndex}
				>
					<PrismicText field={item.heading} />
				</button>
			{/each}
		</div>

		<!-- Popup Content for Mobile -->
		{#if showPopup}
			<PopupShow class="text-secondary z-50" bind:showPopup>
				<button on:click={closeShowPopup} class="absolute left-4 top-3 md:top-4">
					<span class="md:text-2xl text-xl text-white"><Cancel /></span>
				</button>
				<h3><PrismicText field={slice.primary.subsection[currentSectionIndex].subheading} /></h3>
				<p><PrismicText field={slice.primary.subsection[currentSectionIndex].sub_body} /></p>
				<PrismicImage
					class="w-60 h-auto"
					field={slice.primary.subsection[currentSectionIndex].image}
				/>
			</PopupShow>
		{/if}

		<!-- Desktop -->
		<div class="hidden justify-end items-center mr-0 lg:flex flex-col gap-2">
			{#each slice.primary.subsection as item, index}
				{#if index === currentSectionIndex}
					<h3 class="text-3xl max-w-xl"><PrismicText field={item.subheading} /></h3>
					<p class="max-w-xl"><PrismicText field={item.sub_body} /></p>
					<PrismicImage class="w-60 h-auto" field={item.image} />
				{/if}
			{/each}
		</div>
	</div>
</Bounded>
