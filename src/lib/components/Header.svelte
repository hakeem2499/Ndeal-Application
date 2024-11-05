<script lang="ts">
	// your script goes here
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import clsx from 'clsx';
	import { components } from '$lib/slices';
	import type { Content } from '@prismicio/client';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import PrismicButtonLink from './ReusableComponents/PrismicButtonLink.svelte';
	import Dot from '~icons/ph/dot-duotone';
	import Arrow from '~icons/ph/caret-down-bold';
	import SocialLinks from './SocialLinks.svelte';
	import AnchorLinkFooter from './ReusableComponents/AnchorLinkFooter.svelte';
	import { get } from 'svelte/store'; // To access the $page store programmatically
	import { SliceZone } from '@prismicio/svelte';
	import type { KeyTextField } from '@prismicio/types';

	// Define the prop with the correct type
	export let settings: Content.SettingsDocument;
	// Define an array of specific headings you want to render
	const whatWeDo = ['How We Can Help', 'By Industry'];
	const whoWeAre = ['About Us', 'Investors and Media', 'How We Serve'];
	const insightsAndTools = ['Learn and Connect', 'Ndeal Tools'];

	// Filter slices based on the heading field
	// Safely filter slices where navigation_heading exists and matches one of the target headings
	// Define the function that filters slices by headings
	// Define a more general Slice interface to include all fields
	// Define a type for the Slice
	interface Slice {
		primary: {
			navigation_heading: KeyTextField;
			// Other fields of the slice
			[key: string]: any;
		};
		slice_type: string;
		id: string;
	}

	// Cache to store filtered results
	const sliceCache: Record<string, Slice[]> = {};

	// Function to categorize slices by their headings
	function categorizeSlicesByHeadings(slices: Slice[]): Record<string, Slice[]> {
		return slices.reduce(
			(acc, slice) => {
				const heading = slice.primary.navigation_heading || '';
				if (!heading) return acc;

				// Initialize array for this heading if it doesn't exist
				if (!acc[heading]) {
					acc[heading] = [];
				}

				// Push the slice into the appropriate heading category
				acc[heading].push(slice);
				return acc;
			},
			{} as Record<string, Slice[]>
		);
	}

	// Function to filter slices by a list of target headings
	function filterSlicesByHeadings(slices: Slice[], headings: string[]): Slice[] {
		const cacheKey = headings.join(',');

		// Check the cache first
		if (sliceCache[cacheKey]) {
			return sliceCache[cacheKey];
		}

		// Create a Set for fast lookups
		const headingSet = new Set(headings);

		// Categorize slices by their headings
		const categorizedSlices = categorizeSlicesByHeadings(slices);

		// Collect slices matching the target headings
		const filteredSlices = Object.keys(categorizedSlices)
			.filter((heading) => headingSet.has(heading))
			.flatMap((heading) => categorizedSlices[heading]);

		// Cache the result for future reuse
		sliceCache[cacheKey] = filteredSlices;

		return filteredSlices;
	}

	let isOpen = false;
	let openDropdownId: number | null = null; // Track which dropdown is currently open, null means none

	// Function to toggle dropdown, accepting a dropdown id
	const toggleDropdown = (id: number): void => {
		openDropdownId = openDropdownId === id ? null : id; // Toggle between opening and closing the dropdown
	};

	// Close dropdown if clicked outside
	const handleClickOutside = (event: MouseEvent): void => {
		const target = event.target as HTMLElement;

		// Check if the click happened outside the dropdown or the button
		if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-toggle')) {
			openDropdownId = null;
		}
	};

	onMount(() => {
		// Check if running in the browser before using document
		if (typeof window !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});

	const dispatch = createEventDispatcher();

	const toggleOpen = () => {
		isOpen = !isOpen;
		handleOverflow();
	};

	const close = () => {
		isOpen = false;
		handleOverflow();
	};

	const openLoginModal = () => {
		dispatch('openLoginModal');
	};

	const handleOverflow = () => {
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('overflow-hidden', isOpen);
		}
	};

	onMount(() => {
		handleOverflow();
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	let showButton = false;

	// Event listener for scroll events
	const handleScroll = () => {
		showButton = window.scrollY > 50; // Adjust the scroll threshold as needed
	};
</script>

<header class=" sticky top-0 z-1000 bg-white lg:h-22 h-20 z-50 lg:items-center text-black">
	<nav
		class="mx-auto flex max-w-7xl mb-0 lg:relative flex-col justify-between py-2 md:py-0 font-medium lg:flex-row lg:items-center"
		aria-label="main"
	>
		<div class="flex items-center z-50 justify-between">
			<a
				class="mt-2 scale-75 transition-all duration-300 lg:scale-100 md:px-0 md:py-4 md:mt-0"
				href="/"
			>
				<img src={logo} alt="Ndeal" />
			</a>
			<div class=" lg:hidden">
				<button aria-expanded={isOpen} type="button" class="button z-50" on:click={toggleOpen}>
					<span class={clsx('burger hidden  burger-3', isOpen ? 'is-closed' : '')}></span>
				</button>
			</div>
		</div>

		<!-- MobileNav -->
		<div
			class={clsx(
				'fixed items-end justify-between inset-0  z-40 flex  flex-col custom-gradient to-primary pr-4 pt-6 transition-transform duration-300 ease-in-out lg:hidden',
				isOpen ? ' animate-fadeIn' : 'translate-y-[-100%]'
			)}
		>
			<ul class="grid first:pt-12 justify-items-end text-xl gap-8">
				<!-- {#each settings.data.navigation as item (item.nav_link)}
					<li>
						<PrismicButtonLink field={item.nav_link}>
							{item.nav_label}
						</PrismicButtonLink>
					</li>
				{/each} -->
				<!-- <button class="flex relative items-center group gap-2" on:click={toggleDropdown}>
					Insights and Tools <span
						class={clsx(
							'text-primary transition-transform',
							isDropdownOpen ? 'rotate-0' : 'rotate-180'
						)}><Arrow /></span
					>
					{#if isDropdownOpen}
						<ul
							class="absolute top-0 flex items-end gap-4 justify-end flex-col right-0 py-10 min-w-[90dvw]"
						>
							{#each settings.data.grouped_navigation as item (item.nav_link)}
								<li class="flex items-center">
									<PrismicButtonLink field={item.nav_link}>
										{item.nav_label}
									</PrismicButtonLink><span><Dot /></span>
								</li>
							{/each}
						</ul>
					{/if}
				</button> -->
			</ul>
			<SocialLinks />
		</div>

		<!-- DesktopNav -->

		<ul class="hidden lg:flex h-full items-center gap-14">
			<!-- Dropdown 1 -->
			<li aria-current={$page.url.pathname.startsWith('/whatwedo') ? 'page' : undefined}>
				<button
					class="anchor-link dropdown-toggle  flex items-center gap-2 relative"
					on:click={() => toggleDropdown(1)}
					aria-expanded={openDropdownId === 1 ? 'true' : 'false'}
					aria-controls="dropdown1-menu"
				>
					<span
						class={clsx(
							openDropdownId === 1
								? 'bg-gradient-to-br from-orange-900 via-primary to-yellow-600 bg-clip-text italic text-transparent font-semibold'
								: 'text-primary'
						)}
					>
						What we do
					</span>
					<span
						class={clsx(
							'text-primary transition-transform',
							openDropdownId === 1 ? 'rotate-0 ' : 'rotate-180'
						)}
					>
						<Arrow />
					</span>
				</button>

				{#if openDropdownId === 1}
					<div
						id="dropdown1-menu"
						class="dropdown-menu border-gray-950/50 animate-fadeInUp bg-background items-start border-2 min-h-[20rem]"
					>
						<ul class="flex justify-between min-w-[600px]">
							<!-- {#each settings.data.grouped_navigation as item (item.nav_link)}
								<li>
									<AnchorLinkFooter field={item.nav_link}>
										{item.nav_label}
									</AnchorLinkFooter>
								</li>
							{/each} -->
							<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, whatWeDo)}
								{components}
							/>
						</ul>
					</div>
				{/if}
			</li>

			<!-- Dropdown 2 -->
			<li aria-current={$page.url.pathname.startsWith('/Who We are') ? 'page' : undefined}>
				<button
					class="anchor-link dropdown-toggle flex items-center gap-2 relative"
					on:click={() => toggleDropdown(2)}
					aria-expanded={openDropdownId === 2 ? 'true' : 'false'}
					aria-controls="dropdown2-menu"
				>
					<span
						class={clsx(
							openDropdownId === 2
								? 'bg-gradient-to-br from-orange-900 via-primary to-yellow-600 bg-clip-text italic text-transparent font-semibold'
								: 'text-primary'
						)}
					>
						Who we are
					</span>
					<span
						class={clsx(
							'text-primary transition-transform',
							openDropdownId === 2 ? 'rotate-0 ' : 'rotate-180'
						)}
					>
						<Arrow />
					</span>
				</button>

				{#if openDropdownId === 2}
					<div
						id="dropdown2-menu"
						class="dropdown-menu border-gray-950/50 animate-fadeInUp bg-background items-start border-2 min-h-[20rem]"
					>
						<ul class="flex justify-between min-w-[600px]">
							<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, whoWeAre)}
								{components}
							/>
						</ul>
					</div>
				{/if}
			</li>

			<!-- Dropdown 3 -->
			<li aria-current={$page.url.pathname.startsWith('/insightsandtools') ? 'page' : undefined}>
				<button
					class="anchor-link dropdown-toggle flex items-center gap-2 relative"
					on:click={() => toggleDropdown(3)}
					aria-expanded={openDropdownId === 3 ? 'true' : 'false'}
					aria-controls="dropdown3-menu"
				>
					<span
						class={clsx(
							openDropdownId === 3
								? 'bg-gradient-to-br from-orange-900 via-primary to-yellow-600 bg-clip-text italic text-transparent font-semibold'
								: 'text-primary'
						)}
					>
						Insights and Tools
					</span>
					<span
						class={clsx(
							'text-primary transition-transform',
							openDropdownId === 3 ? 'rotate-0 ' : 'rotate-180'
						)}
					>
						<Arrow />
					</span>
				</button>

				{#if openDropdownId === 3}
					<div
						id="dropdown3-menu"
						class="dropdown-menu border-gray-950/50 animate-fadeInUp bg-background items-start border-2 min-h-[20rem]"
					>
						<ul class="flex justify-between min-w-[600px] ">
							<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, insightsAndTools)}
								{components}
							/>
						</ul>
					</div>
				{/if}
			</li>
			<li aria-current={$page.url.pathname.startsWith('/What we think') ? 'page' : undefined}>
				<PrismicButtonLink href="/founder">What we think</PrismicButtonLink>
			</li>
		</ul>
		<ButtonLink
			aria-current={$page.url.pathname.startsWith('/founder') ? 'page' : undefined}
			class="hidden mb-1  lg:flex"
			href="/founder">Become a Partner</ButtonLink
		>
	</nav>
</header>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -2;
	}

	/* Dropdown styles */
	.dropdown-menu {
		position: absolute;
		top: 100%;
		width: 100%;
		left: 0;
		background-color: var(--color-background);
		padding-bottom: 2rem;
		padding-top: 2rem;
		padding-inline: 2rem;
		list-style: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: 0.125rem;
		box-shadow: 0 4px 8px rgba(16, 13, 13, 0.2);
	}
	.button {
		background: transparent;
		border: 0;
		width: 56px;
		height: 56px;
		display: grid;
		place-items: center;
		cursor: pointer;
		padding: 0;
		opacity: 0.6;
		scale: 0.7;
		border-radius: 8px;
		transition: 0.25s;
	}

	.button:hover {
		opacity: 1;
		background: transparent;
	}

	.burger {
		position: relative;
		width: 32px;
		border: 0;
	}

	.burger,
	.burger::before,
	.burger::after {
		display: block;
		border-radius: 2px;
		height: 4px;
		background: #000000;
		transition: 0.3s;
	}

	.burger::before,
	.burger::after {
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
	}

	.burger::before {
		top: -8px;
	}

	.burger::after {
		top: 8px;
	}

	.burger.burger-3::before,
	.burger.burger-3::after {
		transition-duration: 0.15s;
		transition-timing-function: linear;
	}

	.burger.burger-3.is-closed::before,
	.burger.burger-3.is-closed::after {
		width: 20px;
	}

	.burger.burger-3.is-closed::before {
		transform: rotate(-45deg) translate(-4px, -2px);
	}

	.burger.burger-3.is-closed::after {
		transform: rotate(45deg) translate(-4px, 2px);
	}
	.anchor-link{
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
	}
	.anchor-link::after {
		content: '';
		position: absolute;
		height: 4px;
		left: 0;
		bottom: -0.2rem;
		width: 100%;
		background: var(--color-primary);
		transform: scaleX(0);
		transition: transform 200ms ease;
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

	.custom-gradient {
		background: linear-gradient(
			to bottom,
			rgb(248, 255, 255) 80%,
			var(--color-background),
			var(--color-background),
			var(--color-accent),
			var(--color-primary) 90%
		);
	}

	
</style>
