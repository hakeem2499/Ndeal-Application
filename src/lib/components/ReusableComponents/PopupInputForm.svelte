<script lang="ts">
	import { errorMessages, successMessage } from '$lib/toast';
	import { API_URL, type Api } from '../../../store/HomeStore';
	import StandardInput from './StandardInput.svelte';
    
    export let api: Api; // API endpoint to use
	export let showEmailForm: boolean = false;
    export let className: string | undefined = undefined
	interface FormData {
		email: string;
	}

	let formData: FormData = {
		email: ''
	};

	let formErrors: FormData = {
		email: ''
	};

	// Custom validation logic for email
	const validateEmail = (value: string): boolean => {
		if (!value) return false;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(value);
	};

	async function handleSubmit(event: Event, endpoint:Api) {
		event.preventDefault();

		// Example of custom validation on form submission
		if (!validateEmail(formData.email)) {
			formErrors.email = 'Please enter a valid email address.';
		} else {
			formErrors.email = '';
		}

        

		// If no errors, proceed with form submission
		if (!formErrors.email) {
			try {
				// Send the verification key to the backend
				const response = await fetch(`${API_URL}${endpoint}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData)
				});

				const result = await response.json();

				if (response.ok) {
					successMessage('Email verification ');
				} else {
					// Handle server error response
					errorMessages('There is an error sending verification, Try again');
				}
			} catch (error) {
				// Handle network or unexpected errors
				errorMessages('There is an error sending verification, Try again');
				console.error('Error verifying email:', error);
			}
		}
	}
</script>

{#if showEmailForm}
	<form class="{className}" on:submit={(e) => handleSubmit(e, api)}>
		<StandardInput
            type="email"
			label="Please enter your Email"
			bind:value={formData.email}
			required
			errorMessage={formErrors.email}
			validator={validateEmail}
		/>

		<button type="submit" class="submit-button">send</button>
	</form>
{/if}

<style>
	form {
		width: 320px;
		@apply flex flex-col md:w-[400px] mx-auto items-center gap-6  justify-center;
		height: fit-content;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding-block: 2rem;
	}

	.submit-button {
		padding: 5px 20px;
		@apply bg-transparent hover:text-white border border-brand hover:bg-gray-900/20 transition-colors duration-300 rounded-md;
		color: inherit;
        margin-bottom: 1rem;
		font-size: 16px;
		cursor: pointer;
		width: 80%;
		margin-top: 20px;
	}
</style>
