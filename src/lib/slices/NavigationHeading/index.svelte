<script lang="ts">
	import AnchorLinkFooter from '$lib/components/ReusableComponents/AnchorLinkFooter.svelte';
	import PrismicButtonLink from '$lib/components/ReusableComponents/PrismicButtonLink.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';

	export let slice: Content.NavigationHeadingSlice;
	console.log("🚀 ~ slice:", slice)
</script>

<div
	class="flex flex-col pt-10  gap-6 md:gap-10"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	{#if slice.primary.navigation_heading}
		<div  class="heading-div pl-6 uppercase  text-gray-800 relative">
			{slice.primary.navigation_heading}
		</div>
	{/if}

	{#if slice.primary.navigation && slice.primary.navigation.length > 0}
		 <div class="flex flex-col    gap-4">
			 {#each slice.primary.navigation as item}
				 {#if item.nav_link}
					 <PrismicLink class="prose prose-md   font-Just_sans_medium text-neutral-900   cursor-pointer hover:underline no-underline rounded-sm py-1 hover:bg-accent px-6" field={item.nav_link} />
				 {/if}
			 {/each}
		 </div>
	{/if}
</div>

<style>
	.heading-div::after {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		margin-left: 1.5rem;
		left: 0;
		background-color: rgba(108, 108, 108, 0.229);
		height: 1px;
		width: 100%; /* Underlines the full width of the heading */
	}
</style>
