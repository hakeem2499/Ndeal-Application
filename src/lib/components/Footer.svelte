<script>
	import { page } from '$app/stores';
	import AnchorLinkFooter from './ReusableComponents/AnchorLinkFooter.svelte';
	import SocialLinks from './SocialLinks.svelte';
	import CopyWright from '~icons/ph/copyright-light';
</script>

<footer>
	<div class="flex flex-col text-sm  bg-[#171717] text-[#f1efe7]  items-center">
		<div class="flex flex-col justify-between  md:mx-auto md:flex-row md:space-x-8  items-center">
            <span class="flex items-center gap-1"><CopyWright/> copyright 2024. All rights reserved</span>
			<nav class="justify-center flex">
				<ul class="flex flex-col items-center p-2 md:flex-row gap-8">
					<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
						<AnchorLinkFooter   href="/">privacy policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
						<AnchorLinkFooter  href="/about">cookie policy</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter  href="/sverdle">Terms of service</AnchorLinkFooter>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
						<AnchorLinkFooter href="/sverdle">Blog</AnchorLinkFooter>
					</li>
				</ul>
			</nav>
		</div>

		<SocialLinks />
	</div>
</footer>
