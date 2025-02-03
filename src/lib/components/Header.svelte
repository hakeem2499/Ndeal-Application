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
	import { gsap } from 'gsap';
	import SocialLinks from './SocialLinks.svelte';
	import AnchorLinkFooter from './ReusableComponents/AnchorLinkFooter.svelte';
	import { get, writable } from 'svelte/store'; // To access the $page store programmatically
	import { PrismicLink, SliceZone } from '@prismicio/svelte';
	import Logo from '$lib/images/Ndealsvg.svg';
	import MenuOpenIcon from '~icons/tabler/menu-deep';

	import PopupShow from './ReusableComponents/PopupShow.svelte';
	import DotSquare from '~icons/mdi/square-inc';
	import Button from './ReusableComponents/Button.svelte';
	import Back from '~icons/ph/arrow-left-fill';
	import { filterSlicesByHeadings } from '../../store/HomeStore';


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

	let scrollPosition = 0;
	let header: HTMLElement | null = null;
	let lastScroll = 0;
	let showPopup: boolean = false;

	// Function to categorize slices by their headings

	let isOpen = false;
	let openDropdownId: number | null = null; // Track which dropdown is currently open, null means none

	// Function to toggle dropdown, accepting a dropdown id
	const toggleDropdown = (id: number): void => {
		openDropdownId = openDropdownId === id ? null : id; // Toggle between opening and closing the dropdown
		showPopup = true;
	};
	const closeDropdown = (): void => {
		openDropdownId = null; //  and closing the dropdown
		showPopup = false;
	};

	const closeAllDropdowns = (): void => {
		closeDropdown();
		isOpen = false;
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
			window.addEventListener('scroll', throttleScroll); // Ensure this is added correctly
		}

		return () => {
			window.removeEventListener('scroll', throttleScroll);
		};
	});

	// Throttled scroll handler
	function throttleScroll() {
		const currentScroll = window.scrollY;
		console.log('scroll is triggered');
		handleScroll();
	}

	const handleScroll = (): void => {
		const currentScroll = window.scrollY;

		// Only trigger if the scroll change is significant (e.g., 10px)
		if (Math.abs(currentScroll - lastScroll) > 10) {
			lastScroll = currentScroll;
			if (currentScroll > 100) {
				console.log('greater than 50');
				// Check if the header exists before applying GSAP animation
				if (header) {
					gsap.to(header, { backgroundColor: 'white', duration: 1 });
				}
				gsap.to('#cta-link', { opacity: 1, duration: 1, autoAlpha: 1 });
			} else {
				if (header) {
					gsap.to(header, { backgroundColor: 'var(--color-accent)', duration: 1 });
				}
				gsap.to('#cta-link', { opacity: 0, duration: 1, autoAlpha: 0 });
			}
		}
	};

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});

	const toggleOpen = () => {
		isOpen = !isOpen;
	};

	const handleOverflow = () => {
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('overflow-hidden', isOpen);
		}
	};
</script>

<header
	bind:this={header}
	class=" sticky w-full top-0 z-1000 bg-accent lg:h-22 h-20 z-50 lg:items-center text-black"
>
	<nav
		class="mx-auto flex max-w-7xl mb-0 lg:relative flex-col justify-between py-2 md:py-0 font-medium lg:flex-row lg:items-center"
		aria-label="main"
	>
		<div class="flex items-center z-50 justify-between">
			<a
				class="mt-2 scale-75 transition-all duration-300 lg:scale-100 md:px-0 md:py-4 md:mt-0"
				href="/"
			>
				<img src={Logo} alt="" />
			</a>
			<div class=" lg:hidden">
				{#if openDropdownId != null}
					<Button className="bg-transparent hover:bg-transparent mr-2" onClick={closeDropdown}>
						<span class="rotate-90 text-black text-3xl"><Back /></span>
					</Button>
				{:else}
					<div class="flex items-center">
						<a
							id="cta-link"
							class="rounded-full px-4 text-center text-accent py-2 opacity-0 bg-primary text-sm"
							href="/signup">Request a demo</a
						>
						<button aria-expanded={isOpen} type="button" class="button z-50" on:click={toggleOpen}>
							<span class={clsx('burger hidden  burger-3', isOpen ? 'is-closed' : '')}></span>
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- MobileNav -->
		<div
			class={clsx(
				'fixed items-end justify-between inset-0  z-40 flex  flex-col  bg-background pr-4 pt-6 transition-transform duration-300 ease-in-out lg:hidden',
				isOpen
					? ' translate-x-[0%] transition-transform duration-200'
					: 'translate-x-[100%] transition-transform duration-500'
			)}
		>
			<ul class="grid first:pt-12 justify-items-end text-xl gap-8">
				<li aria-current={$page.url.pathname.startsWith('/whatwedo') ? 'page' : undefined}>
					<button
						class="anchor-link dropdown-toggle flex items-center gap-2 relative"
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
							<DotSquare />
						</span>
					</button>
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
							<DotSquare />
						</span>
					</button>
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
							<DotSquare />
						</span>
					</button>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/What we think') ? 'page' : undefined}>
					<PrismicButtonLink on:click={closeAllDropdowns} href="/what_we_think"
						>What we think</PrismicButtonLink
					>
				</li>
				<li>
					<div class="flex bg-black mt-4 rounded-full mx-auto mr-0 scale-75">
						<SocialLinks />
					</div>
				</li>
				<li>
					<div
						class=" border-2 group border-secondary w-fit top-full animate-S_fadeIn m-0 bg-white pt-6 right-0 gap-8 justify-end items-end min-w-[18rem] flex flex-col rounded-ee-2xl rounded-ss-2xl p-6"
					>
						<a on:click={close} href="/signup">Book a demo</a>
						<a href="/signup">contact sales</a>
						<a
							aria-current={$page.url.pathname.startsWith('/founder') ? 'page' : undefined}
							class=""
							href="/founder">Become a Partner</a
						>
						<a class="font-medium group-hover:animate-pulse duration-700" href="/login"
							><span class="text-brand font-Just_sans_medium"
								>Find out how much you could earn
							</span></a
						>
					</div>
				</li>
			</ul>

			<div>
				{#if openDropdownId === 1}
					<PopupShow id="dropdown1-menu" class="mb-4 items-start bg-white " bind:showPopup>
						<button
							on:click={closeAllDropdowns}
							class="flex flex-col md:flex-row md:gap-10 justify-between"
						>
							<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, whatWeDo)}
								{components}
							/>
						</button>
					</PopupShow>
				{/if}
				{#if openDropdownId === 2}
					<PopupShow id="dropdown2-menu" class="border-2 bg-white" bind:showPopup>
						<button
							on:click={closeAllDropdowns}
							class="flex flex-col md:flex-row md:gap-10 justify-between"
						>
							<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, whoWeAre)}
								{components}
							/>
						</button>
					</PopupShow>
				{/if}
				{#if openDropdownId === 3}
					<PopupShow
						id="dropdown3-menu"
						class="dropdown-menu h-fit overflow-auto bg-white"
						bind:showPopup
					>
						<button
							on:click={closeAllDropdowns}
							class="flex flex-col md:flex-row md:gap-10 justify-between"
						>
							<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, insightsAndTools)}
								{components}
							/>
						</button>
					</PopupShow>
				{/if}
			</div>
		</div>

		<!-- DesktopNav -->

		<ul class="hidden lg:flex h-full items-center gap-14">
			<!-- Dropdown 1 -->
			<li aria-current={$page.url.pathname.startsWith('/whatwedo') ? 'page' : undefined}>
				<button
					class="anchor-link dropdown-toggle flex items-center gap-2 relative"
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
						class="dropdown-menu animate-fadeInUp bg-background items-start border-none min-h-[20rem]"
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
						class="dropdown-menu animate-fadeInUp bg-background items-start min-h-[20rem]"
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
						class="dropdown-menu animate-fadeInUp bg-background items-start min-h-[20rem]"
					>
						<ul class="flex justify-between min-w-[600px]">
							<SliceZone
								slices={filterSlicesByHeadings(settings.data.slices, insightsAndTools)}
								{components}
							/>
						</ul>
					</div>
				{/if}
			</li>
			<li aria-current={$page.url.pathname.startsWith('/What we think') ? 'page' : undefined}>
				<PrismicButtonLink href="/what_we_think">What we think</PrismicButtonLink>
			</li>
			<li class="in-line flex ">
				<a
					id="cta-link"
					class="rounded-full px-8 py-3  opacity-0 md:text-sm lg:text-base bg-accent border transition-transform duration-300 hover:border-secondary "
					href="/signup">Request a demo</a
				>
				<div class="hidden lg:flex relative">
					<button on:mouseenter={() => toggleDropdown(4)}>
						<span class="text-2xl"><MenuOpenIcon /></span>
					</button>
					{#if openDropdownId === 4}
						<div
							class="absolute border-2 group border-secondary w-fit top-full animate-S_fadeIn m-0 bg-white pt-6 right-0 gap-6 justify-end items-end min-w-[18rem] flex flex-col rounded-ee-2xl rounded-ss-2xl p-6"
						>
							<a href="/signup">Book a demo</a>
							<a href="/signup">contact sales</a>
							<a
								aria-current={$page.url.pathname.startsWith('/founder') ? 'page' : undefined}
								class="hidden mb-1 lg:flex"
								href="/founder">Become a Partner</a
							>
							<a class="font-medium group-hover:animate-pulse duration-700" href="/login"
								><span class="text-brand font-Just_sans_medium"
									>Find out how much you could earn
								</span></a
							>
						</div>
					{/if}
				</div>
			</li>
		</ul>
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
	.menu-button {
		position: relative;
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
		@apply rounded-ss-3xl transition-colors hover:bg-accent duration-700 rounded-ee-3xl;
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
	.anchor-link {
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
