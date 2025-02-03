<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'; // To access route parameters
	import { API_URL } from '../../store/HomeStore';
	import Bounded from '$lib/components/Bounded.svelte';

	

	let loading = true; // Loading state
	let errorMessage = ''; // Error message for display
	let key = ''; // The verification key from the URL

	// Extract the verification key from the URL
	$: key = $page.url.searchParams.get('key') ?? ''; // Use nullish coalescing to assign an empty string if null

	async function verifyEmail() {
		if (!key) {
			errorMessage = 'Invalid or missing verification key.';
			loading = false;
			return;
		}

		try {
			// Send the verification key to the backend
			const response = await fetch(`${API_URL}/auth/registration/verify-email/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ key })
			});

			const result = await response.json();

			if (response.ok) {
				// Redirect to a confirmation success page
				goto('/confirm-email?verified=true');
			} else {
				// Handle server error response
				errorMessage = result?.detail || 'Email verification failed. Please try again.';
				goto('/confirm-email?verified=false');
			}
		} catch (error) {
			// Handle network or unexpected errors
			errorMessage = 'An error occurred while verifying your email. Please try again later.';
			console.error('Error verifying email:', error);
			goto('/confirm-email?verified=false');
		} finally {
			loading = false;
		}
	}

	// Automatically verify the email when the page loads
	onMount(() => {
		verifyEmail();
	});
</script>

<Bounded>
	{#if loading}
		<p>Verifying your email, please wait...</p>
	{:else if errorMessage}
		<p class="error">{errorMessage}</p>
	{:else}
		<p>Email verified successfully! Redirecting...</p>
	{/if}
</Bounded>

<style>
	.error {
		color: red;
		font-weight: bold;
	}
</style>
