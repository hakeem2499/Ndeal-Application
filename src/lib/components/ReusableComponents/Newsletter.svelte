<script lang="ts">
	import clsx from 'clsx';
	import RightArrow from '~icons/subway/right-arrow';
	import Button from './Button.svelte';

	let email: string = '';
	let errorPrompt: string = '';
	let isLoading: boolean = false;
	let successMessage: string = '';
	let submissionTimeout: any;
	let isEmailTouched: boolean = false; // Track if the user has interacted with the input

	$: {
		if (email && isEmailTouched && !validateEmail(email)) {
			errorPrompt = 'Please enter a valid email address';
		} else {
			errorPrompt = '';
		}
	}

	// Function to sanitize email input
	const sanitizeInput = (input: string): string => {
		return input.replace(/[^a-zA-Z0-9.@_-]/g, '');
	};

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	};

	// Throttle submission to avoid multiple rapid requests
	const throttleSubmission = (fn: Function, event: SubmitEvent, delay: number) => {
		clearTimeout(submissionTimeout);
		submissionTimeout = setTimeout(() => fn(event), delay);
	};

	// Send email function with correct event typing
	const sendEmail = async (event: SubmitEvent) => {
		event.preventDefault();
		
		if (!validateEmail(email)) {
			errorPrompt = 'Please enter a valid email address';
			return;
		}

		isLoading = true;
		errorPrompt = '';
		successMessage = '';

		const sanitizedEmail = sanitizeInput(email);

		const formData = { email: sanitizedEmail };

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const errorBody = await response.text();
				console.error('HTTP Status Code:', response.status);
				console.error('Response Body:', errorBody);
				throw new Error('Failed to submit form data');
			}

			// On success
			successMessage = 'Subscription successful! Check your email for confirmation.';
			email = ''; // Reset email input
			isEmailTouched = false; // Reset interaction tracking
		} catch (error) {
			console.error('Error submitting form data:', error);
			errorPrompt = 'There was an issue submitting your request. Please try again later.';
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex lg:p-6 flex-col items-center md:items-start justify-center gap-8 mb-10 md:mb-0 md:gap-2 lg:gap-16 h-full md:flex-row">
	<h4 class="text-2xl font-Orlean  px-4 md:px-2 md:pt-6 md:w-[50dvw] lg:w-full md:text-4xl max-w-3xl">
		Get the latest insights on today's world of work delivered straight to your inbox.
	</h4>

	<form class="flex flex-col pt-4 mt-2 gap-1" on:submit|preventDefault={(event) => throttleSubmission(sendEmail, event, 1000)}>
		<div class="self-start max-h-14">
			<div class="flex gap-4 min-w-[300px] md:min-w[350px] lg:min-w-[500px] flex-1 py-2 items-center">
				<input
					bind:value={email}
					type="email"
					placeholder="Enter a valid email"
					class={clsx(
						'peer mt-2 w-full border-b-2 border-r-transparent border-l-transparent border-t-transparent bg-transparent rounded-sm hover:border-b-black px-2 py-3 focus:outline-offset-0 focus:outline-0 focus:border-none focus:outline-none',
						validateEmail(email) ? 'focus:border-green-700' : ' focus:border-rose-500'
					)}
					disabled={isLoading}
					on:input={() => {
						isEmailTouched = true;
						errorPrompt = '';
						successMessage = '';
					}}
				/>

				<Button className="rounded-none mt-2 max-w-fit p-4 bg-background" type="submit" disabled={isLoading}>
					<span>
						<RightArrow
							class={clsx(
								'tranform duration-200',
								validateEmail(email) ? 'rotate-0' : '-rotate-45'
							)}
						/>
					</span>
				</Button>
			</div>
			{#if errorPrompt}
				<p class="text-xs duration-400 text-red-600">{errorPrompt}</p>
			{/if}
			{#if successMessage}
				<p class="text-xs duration-400 text-green-600">{successMessage}</p>
			{/if}
		</div>
	</form>
</div>
