<script lang="ts">
	import { page } from '$app/stores';
	import AnchorLinkFooter from './ReusableComponents/AnchorLinkFooter.svelte';
	import SocialLinks from './SocialLinks.svelte';
	import CopyWright from '~icons/ph/copyright-light';
	import { PrismicLink } from '@prismicio/svelte';
	// Import the type for SettingsDocument from Prismic
	import type { Content } from '@prismicio/client';

	// Define the prop with the correct type
	export let settings: Content.SettingsDocument;
</script>

<footer>
	<div class="flex flex-col py-20  gap-4 text-sm bg-[#171717] text-[#f1efe7] items-center">
		<nav class=" grid  grid-cols-2 w-[90dvw] gap-4 md:w-full mx-auto justify-items-between md:grid-cols-3">
			<div class="flex md:items-center flex-col">
				<ul class="flex flex-col p-2 gap-4">
					<h5 class="text-2xl font-semibold md:text-4xl">
						<span class="text-green-900 ">N</span>deal.
					</h5>
					<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
						<AnchorLinkFooter href="/">privacy policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
						<AnchorLinkFooter href="/about">cookie policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter href="/sverdle">Terms of service</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter href="/sverdle">Blog</AnchorLinkFooter>
					</li> -->
					{#each settings.data.policies_navigation as item (item.policy_label)}
						<li>
							<AnchorLinkFooter class="anchor-link" field={item.policy_link}>
								{item.policy_label}
							</AnchorLinkFooter>
						</li>
					{/each}
				</ul>
			</div>
			<div class="flex md:items-center  flex-col">
				<ul class="flex flex-col  p-2 gap-4">
					<h5 class="text-xl md:text-3xl">Resources</h5>
					<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
						<AnchorLinkFooter href="/">privacy policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
						<AnchorLinkFooter href="/about">cookie policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter href="/sverdle">Terms of service</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter href="/sverdle">Blog</AnchorLinkFooter>
					</li> -->
					<!-- {#each settings.data.grouped_navigation as item (item.nav_link)}
						<li>
							<AnchorLinkFooter field={item.nav_link}>
								{item.nav_label}
							</AnchorLinkFooter>
						</li>
					{/each} -->
				</ul>
			</div>
			<div class="flex md:items-center flex-col">
				<ul class="flex flex-col p-2 gap-4">
					<h5 class="text-xl md:text-3xl">Legal</h5>
					<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
						<AnchorLinkFooter href="/">privacy policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
						<AnchorLinkFooter href="/about">cookie policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter href="/sverdle">Terms of service</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter href="/sverdle">Blog</AnchorLinkFooter>
					</li> -->
					{#each settings.data.policies_navigation as item (item.policy_label)}
						<li>
							<AnchorLinkFooter class="anchor-link" field={item.policy_link}>
								{item.policy_label}
							</AnchorLinkFooter>
						</li>
					{/each}
				</ul>
			</div>
		</nav>
		<div class="flex flex-col justify-between"></div>

		<SocialLinks />
		<span class="flex mt-4 items-center gap-1"
			><CopyWright /> copyright 2024. All rights reserved</span
		>
	</div>
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
