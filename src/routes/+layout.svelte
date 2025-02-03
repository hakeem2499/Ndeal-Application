<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	import { writable } from 'svelte/store';
	// import { initLenis } from '../store/HomeStore';
	let isLoading = writable(true);
	const options = {
		reversed: true,
		intro: { y: 192 }
	};

	onMount(() => {
		// Simulate page loading
		setTimeout(() => {
			isLoading.set(false); // Hide loading spinner after 1 seconds
		}, 1000); // Simulated loading time
	});
</script>

<div class="wrap">
	<SvelteToast {options} />
</div>
<svelte:head>
	<title>{$page.data.title}</title>
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}
	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
	{/if}
	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<div class="app">
	{#if $isLoading}
		<Bounded class="min-h-screen">
			<div class="spinner"></div>
			<!-- Add a loading spinner here -->
		</Bounded>
	{:else}
		<main>
			<slot />
		</main>
	{/if}
</div>

<style>
	.wrap {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 0.5rem;
		--toastContainerLeft: auto;
		--toastWidth: 100%;
		--toastMinHeight: 2rem;
		--toastPadding: 0 0.5rem;
		font-size: 0.875rem;
	}
	@media (min-width: 40rem) {
		.wrap {
			--toastContainerRight: 15%;
			--toastContainerLeft: 15%;
			--toastWidth: 100%;
		}
	}
</style>
