<script lang="ts">
	import { page } from '$app/stores';
	import Cancel from '~icons/ph/x-thin';
	import { goto } from '$app/navigation';
	import Bounded from '$lib/components/Bounded.svelte';
	import Button from '$lib/components/ReusableComponents/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import PopupInputForm from '$lib/components/ReusableComponents/PopupInputForm.svelte';
	import clsx from 'clsx';
	import type { Api } from '../../store/HomeStore';

	let api: Api = '/auth/registration/resend-email/'

	let isVerified = false;
	let isProcessing = false;
	let hasNavigated = false;
	let showEmailForm: boolean = false;
	

	$: {
		const param = new URLSearchParams($page.url.search).get('verified');
		isVerified = param === 'true';
	}

	function proceedToLogin() {
		if (hasNavigated) return;
		hasNavigated = true;
		isProcessing = true;
		goto('/login');
	}

	const dispatch = createEventDispatcher();

	function handleResendEmail(): void {
		showEmailForm = true;
	}

	function closePostForm() {
		showEmailForm = false;
	}
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
	{#if showEmailForm}
		<div class="modal-overlay" on:click={closePostForm}>
			<div
				class={clsx('relative h-fit md:max-w-5xl', showEmailForm ? 'animate-S_fadeIn' : '')}
				on:click|stopPropagation
			>
				<PopupInputForm className="bg-white" {api} {showEmailForm} />
				<button on:click={closePostForm} class="absolute left-4 top-3 md:top-4"
					><span class="md:text-2xl text-xl text-primary"><Cancel /></span></button
				>
			</div>
		</div>
	{/if}
	<Bounded class="h-full shadow-2xl min-h-60 w-full max-w-4xl">
		{#if isVerified}
			<h1 class="text-2xl p-4 font-bold font-Just_sans_medium text-green-900">verified</h1>
			<p class="mt-4 font-Just_sans_medium text-xs text-gray-900">You can now proceed to login.</p>
			<Button
				className="mt-6  max-w-40  text-white rounded "
				onClick={proceedToLogin}
				disabled={isProcessing}
			>
				{isProcessing ? 'Processing...' : 'Go to Login'}
			</Button>
		{:else}
			<h1 class="text-2xl font-Just_sans_medium font-bold text-red-600">
				Email verification failed
			</h1>
			<p class="mt-4 text-gray-700">Please check the link or try again.</p>
			<Button
				className="mt-4  bg-transparent hover:bg-transparent text-black underline hover:text-blue-800"
				onClick={handleResendEmail}
				><span class="text-black"> Request a new confirmation email </span>
			</Button>
		{/if}
	</Bounded>
</main>

<style>
	button {
		transition:
			background-color 0.3s ease,
			opacity 0.3s ease;
	}
	button:hover {
		cursor: pointer;
	}
	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	main {
		background-color: #f3f4f6;
	}
	h1 {
		font-size: 2.25rem;
		margin-bottom: 1rem;
	}
	p {
		font-size: 1.125rem;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
</style>
