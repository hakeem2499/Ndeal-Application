<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { ErrorMessages } from '$lib/components/Forms/validation';
	import StandardInput from '$lib/components/ReusableComponents/StandardInput.svelte';
	import { goto } from '$app/navigation'; // For redirecting after successful submission
    import image from '$lib/images/passwordsvg.svg';
	import { page } from '$app/stores';
	import { API_URL } from '../../../../../store/HomeStore.js';

	export let data;
	let isLoading: boolean = false;

	// Custom validation logic for password
	const validatePassword = (value: string): boolean => {
		if (!value) return false;
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		return regex.test(value);
	};

	interface FormData {
		password1: string;
		password2: string;
		uid: string;
		token: string;
	}

	let formData: FormData = {
		password1: '',
		password2: '',
		uid: '',
		token: ''
	};

	let formErrors: ErrorMessages = {
		password1: '',
		password2: ''
	};

	// Extract uid and token from URL parameters
	$: {
		formData.uid = $page.params.uid;
		formData.token = $page.params.token;
	}

	const validateForm = (): boolean => {
		let valid = true;

		// Validate password1
		if (!validatePassword(formData.password1)) {
			formErrors.password1 =
				'Password must be at least 8 characters long, include uppercase, lowercase, and a number.';
			valid = false;
		} else {
			formErrors.password1 = '';
		}

		// Validate password2
		if (formData.password1 !== formData.password2) {
			formErrors.password2 = 'Passwords do not match.';
			valid = false;
		} else {
			formErrors.password2 = '';
		}

		return valid;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (!validateForm()) return;

		isLoading = true;

		try {
			const response = await fetch(`${API_URL}/auth/password/reset/confirm/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					new_password1: formData.password1,
					new_password2: formData.password2,
					uid: formData.uid,
					token: formData.token
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				alert(errorData.message || 'Failed to reset password.');
			} else {
				alert('Password reset successful!');
				goto('/login'); // Redirect to login page
			}
		} catch (error) {
			console.error('Error during password reset:', error);
			alert('An error occurred. Please try again.');
		} finally {
			isLoading = false;
		}
	};
</script>

<Bounded class="h-screen bg-gray-100">
	<h1 class="text-xl text m-4 md:m-8 font-Just_sans_medium font-semibold">Reset your Password</h1>
	<div class="flex shadow-xl  md:max-h-[500px] justify-between max-w-4xl items-center  border-primary gap-0 w-full">
        <img src={image} class="hidden  md:flex" alt="A person holding password ">
		<form
			class="flex md:h-full md:min-h-[500px]   py-8 w-full max-w-md  h-[60dvh] p-4 flex-col items-center lg:justify-center justify-between gap-10 md:gap-16 mt-20"
			on:submit|preventDefault={handleSubmit}
		>
            
			<StandardInput
				type="password"
				label="new password"
				bind:value={formData.password1}
				required
				errorMessage={formErrors.password1}
				validator={validatePassword}
			/>
			<StandardInput
				type="password"
				label="confirm new password"
				bind:value={formData.password2}
				required
				errorMessage={formErrors.password2}
				validator={(value) => value === formData.password1}
			/>

			<button
				type="submit"
				class="bg-transparent w-full  hover:bg-secondary transition-colors duration-500 text-black font-bold py-2 px-4 rounded-md"
				disabled={isLoading}
			>
				{isLoading ? 'Loading...' : 'Submit'}
			</button>
		</form>
	</div>
</Bounded>
