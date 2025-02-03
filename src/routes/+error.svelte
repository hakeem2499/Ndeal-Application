<script lang="ts" context="module">
	export function load({ error, status }: { error: Error | null; status: number }) {
		return { props: { error, status } };
	}
</script>

<script lang="ts">
	export let status: number;
	export let error: Error | null;
</script>

<svelte:head>
	<title>{status} - Something went wrong</title>
</svelte:head>

<section
	class="error-page"
	style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1rem; padding: 1rem;"
>
	<!-- <h1 style="font-size: 4rem; color: #ff6347;">{status}</h1> -->
	<p style="font-size: 1.5rem; color: #333;">
		{#if status === 404}
			Oops! The page you’re looking for doesn’t exist.
		{:else if status === 500}
			Something went wrong on our end. Please try again later.
		{:else}
			Oops! Something went wrong. We're on it!
		{/if}
	</p>

	<a href="/" style="font-size: 1.25rem; color: #007bff; text-decoration: none;">
		Go back to the homepage
	</a>
</section>

<style>
	a:hover {
		text-decoration: underline;
	}
</style>
