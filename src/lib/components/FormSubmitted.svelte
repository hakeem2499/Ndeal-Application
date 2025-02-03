<script>
	import { isError } from '$lib/validation';
	import { onMount } from 'svelte';
	import Button from './ReusableComponents/Button.svelte';
	import ThankYouSvg from './ThankYouSvg.svelte';
	import ErrorAlert from './ErrorAlert.svelte';
	import SocialLinks from './SocialLinks.svelte';

	export let showModal = false;
	const closeShowModal = () => {
		showModal = false;
		console.log('🚀 ~ closeShowModal ~ showModal:', showModal);
	};

	onMount(() => {
		console.log('mounting');
	});
</script>

{#if showModal}
	<div class="modal-overlay" on:click={closeShowModal}>
		<!-- Modal Content -->
		<div
			class="modal-content glass-container w-[90%] max-w-md h-fit bg-[#171717]/95 transition-opacity duration-300"
			on:click|stopPropagation
		>
			<div
				id="player "
				class="flex text-sm text-balance gap-2 md:gap-4 md:text-base flex-col p-16 lg:px-10 rounded-lg items-center justify-center text-white"
				style="width: 100%; height: 100%;"
			>
				{#if $isError['login-successful']}
					<div class="flex gap-2 items-center">
						<h5 class="error font-semibold text-green-700 text-balance">
							{$isError['login-successful']}
						</h5>
						<ThankYouSvg />
					</div>
					<div class="prose prose-lg text-pretty text-gray-300">
						<span class="block text-lg">Lets Get Started!</span> We’re excited you’re here! You’ve
						just taken an important step toward transforming your HR processes. We’re here to help
						make things easier for you. <span class="block">💡 Here’s what happens next:</span> One of
						our team members will get in touch with you shortly to schedule a demo that’s tailored to
						your needs. We’ll show you how Ndeal can make your HR operations smoother and more efficient.
						Keep an eye on your inbox for an email with more details on what’s coming next!
					</div>
					<SocialLinks />
				{/if}
				{#if $isError['user-exists']}
					<p class="error text-orange-700">{$isError['user-exists']}</p>
					<ErrorAlert />
				{/if}

				{#if $isError['general-error']}
					<p class="error text-red-700">{$isError['general-error']}</p>
					<ErrorAlert />
				{/if}
				{#if $isError['network-error']}
					<p class="error text-red-700">{$isError['network-error']}</p>
					<ErrorAlert />
				{/if}
			</div>
			<button
				class="close-button hover:text-white hover:bg-slate-900 text-accent"
				on:click={closeShowModal}>X</button
			>
		</div>
	</div>
{/if}

<style>
	/* Modal overlay */
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

	/* Modal content */
	.modal-content {
		position: relative;
		padding: 20px;
		border-radius: 8px;
		max-width: 720px;
	}

	.close-button {
		position: absolute;
		top: 20px;
		right: 20px;
		background-color: transparent;

		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		cursor: pointer;
	}

	.close-button:hover {
		background-color: var(--color-primary);
	}

	.error {
		@apply text-2xl md:text-2xl   mx-auto text-center;
	}
</style>
