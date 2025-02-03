<script lang="ts">
	import { get, writable } from 'svelte/store';
	import StandardInput from './StandardInput.svelte';
	import { submitForm } from '../../../store/HomeStore';
	import TextArea from './TextArea.svelte';
	import { fade } from 'svelte/transition';

	type Contact = {
		FirstName: string;
		LastName: string;
		Email: string;
		Message: string;
	};

	// State for pop-up message
	let showPopup = false;
	let popupMessage = '';
	let popupType: 'success' | 'error' = 'success';

	// Function to show pop-up message
	function showPopupMessage(message: string, type: 'success' | 'error') {
		popupMessage = message;
		popupType = type;
		showPopup = true;

		// Hide the pop-up after 3 seconds
		setTimeout(() => {
			showPopup = false;
		}, 3000);
	}

	let isLoading: boolean = false;
	const defaultContactForm: Contact = {
		FirstName: '',
		LastName: '',
		Email: '',
		Message: ''
	};

	const ContactForm = writable({ ...defaultContactForm });

	// Reactive check for form validity
	$: isFormValid =
		$ContactForm.FirstName.trim() !== '' &&
		$ContactForm.LastName.trim() !== '' &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($ContactForm.Email) && // Email validation
		$ContactForm.Message.trim() !== '';

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault(); // Prevent the default form submission
		isLoading = true; // Set loading state to true

		try {
			// Get the current form data from the store
			const data = get(ContactForm);

			// Prepare the form data for submission
			const formData = {
				first_name: data.FirstName,
				last_name: data.LastName,
				email: data.Email,
				message: data.Message
			};

			// Submit the form data to the backend
			const response = await submitForm(`/contact/`, formData);
			// Show success pop-up
			showPopupMessage('Submitted successfully!', 'success');

			// Reset the form to its default state after successful submission
			ContactForm.set(defaultContactForm);

			// Log the response from the server (optional)
			console.log('Form submitted successfully:', response);
		} catch (error) {
			// Handle any errors that occur during submission
			console.error('Form submission failed:', error);
		} finally {
			// Reset the loading state regardless of success or failure
			isLoading = false;
		}
	};
</script>

<div class=" p-1 md:p-2 flex flex-col md:flex-row md:items-start items-center  md:justify-between gap-4">
	<div class="flex flex-col  p-4 max-w-xl lg:w-1/2 lg:gap-4  gap-2">
		<h4 class="text-primary  text-3xl md:text-4xl  md:mt-8 max-w-lg">
			Let's Take the First Step Together
		</h4>
		<p class="lg:text-lg">Complete the form and an Ndeal expert will contact you shortly.</p>
	</div>
    
	<form class="w-full lg:w-1/2 text-background" on:submit={handleSubmit}>
		<div class="flex flex-col items-center justify-between gap-4">
			<div class="flex w-full items-center gap-2">
				<StandardInput
					type="text"
					label="First Name"
					required={true}
					bind:value={$ContactForm.FirstName}
					validator={(val) => val.length > 0}
				/>
				<StandardInput
					type="text"
					label="Last Name"
					bind:value={$ContactForm.LastName}
					required={true}
					validator={(val) => val.length > 0}
				/>
			</div>
			<StandardInput
				type="email"
				label="Email"
				bind:value={$ContactForm.Email}
				required={true}
				validator={(val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)}
			/>
			<div class="flex flex-col w-full gap-2">
				<TextArea
					label="Message"
					placeholder="Send us a message"
					bind:value={$ContactForm.Message}
				/>
			</div>
			<button
				class="bg-transparent py-2 md:px-8 px-4 mx-auto mr-0 text-primary border border-black hover:bg-black rounded-full disabled:opacity-80 disabled:cursor-not-allowed"
				type="submit"
				disabled={!isFormValid || isLoading}
			>
				{isLoading ? 'Submitting...' : 'Send Message'}
			</button>
		</div>
	</form>

	<!-- Pop-up Message -->
	{#if showPopup}
		<div
			class="fixed bottom-4 right-4 p-4 rounded-md text-primary {popupType === 'success'
				? 'bg-green-900/90 '
				: 'bg-red-500'}"
			transition:fade
		>
			{popupMessage}
		</div>
	{/if}
</div>

<style>
	.fade {
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.fade-enter {
		opacity: 0;
		transform: translateY(20px);
	}

	.fade-leave {
		opacity: 1;
		transform: translateY(0);
	}
</style>
