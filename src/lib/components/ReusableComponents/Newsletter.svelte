<script lang="ts">
	import clsx from 'clsx';
	import RightArrow from '~icons/subway/right-arrow';
	import Button from './Button.svelte';

	let email: string = '';
	let errorPrompt: string = '';

	$: {
		if (email && !validateEmail(email)) {
			errorPrompt = 'Please enter a valid email address';
		} else {
			errorPrompt = '';
		}
	}

	const validateEmail = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	};

	function sendEmail(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		throw new Error('Function not implemented.');
	}
</script>

<div class="inline-flex">
	<form class="flex flex-col mb-2 gap-1" on:submit|preventDefault={sendEmail}>
		<div class="flex gap-4">
			<input
				bind:value={email}
				type="email"
				placeholder="Enter a valid email"
				class={clsx(
					'peer mt-2 w-full border-b-2  border-r-transparent  border-l-transparent border-t-transparent  bg-transparent rounded-sm hover:border-b-black  px-2 py-3 focus:outline-offset-0 focus:outline-0 focus:border-none focus:outline-none',
					validateEmail(email) ? 'focus:border-green-700' : ' focus:border-rose-500'
				)}
			/>

			<Button className="rounded-none mt-2  max-w-fit p-4 bg-background" type="submit"
				><span><RightArrow class={clsx('tranform duration-200', validateEmail(email) ? 'rotate-0' : '-rotate-45')} /></span></Button
			>
		</div>
		{#if !validateEmail(email)}
			<p class="text-xs duration-400  text-red-600">{errorPrompt}</p>
		{/if}
	</form>
</div>
