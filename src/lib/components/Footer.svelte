<script lang="ts">
	import { page } from '$app/stores';
	import AnchorLinkFooter from './ReusableComponents/AnchorLinkFooter.svelte';
	import SocialLinks from './SocialLinks.svelte';
	import CopyWright from '~icons/ph/copyright-light';
	import { PrismicLink, SliceZone } from '@prismicio/svelte';
	// Import the type for SettingsDocument from Prismic
	import type { Content } from '@prismicio/client';
	import { filterSlicesByHeadings, insightsAndTools, insightsAndToolsFooter, whoWeAre } from '../../store/HomeStore';
	import { components } from '$lib/slices';
	import Bounded from './Bounded.svelte';

	// Define the prop with the correct type
	export let settings: Content.SettingsDocument;
	console.log("🚀 ~ settings:For footer", settings)
</script>

<footer>
	<Bounded class="flex flex-col py-20   gap-4 text-sm bg-[#171717] text-[#f1efe7] items-center">
		<nav class=" grid  grid-cols-2 w-full gap-4  mx-auto justify-items-center md:grid-cols-3">
			<div class="flex items-start  flex-col">
				<h5 class="text-2xl font-semibold pl-6 md:text-4xl">
					<span class="text-green-900 ">N</span>deal.
				</h5>
				<ul class="flex flex-col md:gap-10 justify-between">
					<SliceZone
						slices={filterSlicesByHeadings(settings.data.slices, whoWeAre)}
						{components}
					/>
				</ul>
			</div>
			<div class="flex text-white  flex-col">
				<h5 class="text-xl pl-8 md:text-3xl">Resources</h5>
				<ul class="flex text-white flex-col lg:flex-row   p-2 gap-4">
					<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, insightsAndToolsFooter)}
								{components}
							/>
				</ul>
			</div>
			<div class="flex mt-8 px-8 ml-4  md:mt-0 md:ml-auto mx-auto flex-col">
				<h5 class="text-xl   md:text-3xl">Legal</h5>
				<ul class="flex flex-col mt-4 md:mt-14 gap-4">
					
					{#each settings.data.policies as item}
						<li>
							<AnchorLinkFooter class="anchor-link font-Just_sans_medium text-base" field={item.policy_link}>
								{item.policy_label}
							</AnchorLinkFooter>
						</li>
					{/each}
				</ul>
			</div>
		</nav>
		<div class="flex flex-col border-t border-gray-500 w-full mt-10 md:mt-16 py-4 justify-between"></div>

		<SocialLinks />
		<span class="flex mt-4 items-center gap-1"
			><CopyWright /> copyright 2024. All rights reserved</span
		>
	</Bounded>
</footer>

<style>
	.anchor-link::after {
		content: '';
		position: absolute;
		height: 2px;
		left: 0;
		bottom: -0.5rem;
		width: 100%;
		background: white;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 500ms ease;
	}
	.anchor-link:hover::after {
		transform: scaleX(1);
	}

	@media (prefers-reduced-motion: reduce) {
		.anchor-link {
			/* Remove transitions or reduce their duration */
			transition: none;
		}
	}
</style>
