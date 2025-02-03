<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import ThankYouSvg from '$lib/components/ThankYouSvg.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	let success: boolean = false;

	$: {
		const param = new URLSearchParams($page.url.search).get('success');
		success = param === 'true';
	}
</script>

<Bounded>
	{#if success}
		<div class="flex flex-col gap-4 bg-secondary p-4 md:p-16 md:gap-8">
			<div class="flex gap-2 max-w-md text-inherit items-center">
				<h1 class="font-Just_sans_medium text-3xl md:text-5xl text-center text text-balance">
					Welcome Aboard
				</h1>

				<ThankYouSvg />
			</div>
			<div class="prose prose-lg text-pretty text-primary">
				<span class="block text-lg">Lets Get Started!</span> We’re excited you’re here! You’ve just
				taken an important step toward transforming your HR processes. We’re here to help make
				things easier for you. <span class="block">💡 Here’s what happens next:</span> One of our
				team members will get in touch with you shortly to schedule a demo that’s tailored to your
				needs. We’ll show you how Ndeal can make your HR operations smoother and more efficient.
				<strong
					>Please keep an eye on your inbox for an email with more details on what’s coming next!</strong
				>
			</div>
			<SocialLinks />
		</div>
	{:else}
		<h1>Invalid Route</h1>
		<a href="/">Go to homepage</a>
	{/if}
</Bounded>
