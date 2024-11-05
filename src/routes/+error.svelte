<script lang="ts" context="module">

	export function load({ error, status }: { error: Error | null; status: number }) {
		return { error, status };
	}
</script>

<script lang="ts">
	export let status: number;
	export let error: Error | null;
</script>

<svelte:head>
	<title>{status} - Something went wrong</title>
</svelte:head>

<section class="error-page h-screen w-[100%]">
	<h1>{status}</h1>
	<p>
		{#if status === 404}
			Oops! The page you’re looking for doesn’t exist.
		{:else if status === 500}
			Something went wrong on our end. Please try again later.
		{:else}
			An unexpected error occurred: {error?.message ||
				'Try Refreshing the page or re-enter an authorized page route.'}
		{/if}
	</p>

	<a href="/">Go back to the homepage</a>
</section>

<style>
	.error-page {
		text-align: center;
		margin-top: 5rem;
		display: flex;
		flex-direction: column;
		gap: 10;
	}

	h1 {
		font-size: 4rem;
		color: #ff6347;
	}

	p {
		font-size: 1.5rem;
		color: #333;
	}

	a {
		font-size: 1.25rem;
		color: #007bff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
