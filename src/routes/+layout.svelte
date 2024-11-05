<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { PrismicPreview } from '@prismicio/svelte/kit';

	
</script>

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
	<Header settings={$page.data.settings} />

	<main>
		<slot />
	</main>

	<Footer settings={$page.data.settings} />
</div>

