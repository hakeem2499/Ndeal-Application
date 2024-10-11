<script lang="ts">
	import { page } from '$app/stores';
	import AnchorLinkFooter from './ReusableComponents/AnchorLinkFooter.svelte';
	import SocialLinks from './SocialLinks.svelte';
	import CopyWright from '~icons/ph/copyright-light';
	import { PrismicLink } from '@prismicio/svelte';
	// Import the type for SettingsDocument from Prismic
	import type { Content } from '@prismicio/client';
	import PrismicButtonLink from './ReusableComponents/PrismicButtonLink.svelte';

	// Define the prop with the correct type
	export let settings: Content.SettingsDocument;
</script>

<footer>
	<div class="flex flex-col py-10 gap-4 text-sm bg-[#171717] text-[#f1efe7] items-center">
		<div
			class="flex flex-col-reverse justify-between md:mx-auto md:flex-row md:space-x-8 items-center"
		>
			<nav class="justify-center flex">
				<ul class="flex flex-col items-center p-2 md:flex-row gap-8">
					<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
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
					</li>
					{#each settings.data.policies_navigation as item (item.policy_label)}
						<li>
							<PrismicButtonLink class="anchor-link" field={item.policy_link}>
								{item.policy_label}
							</PrismicButtonLink>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<SocialLinks />
		<span class="flex mt-4 items-center gap-1"><CopyWright /> copyright 2024. All rights reserved</span>
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
    .anchor-link:hover::after{
        transform: scaleX(1);
    }

    

    @media (prefers-reduced-motion: reduce) {
		.anchor-link {
			/* Remove transitions or reduce their duration */
			transition: none;
		}
	}
</style>