<script lang="ts">
	import { writable } from 'svelte/store';
	import { dealInsightHandleInput, errorMessages } from '../../../lib/components/Forms/validation'; // Import validation utilities
	import { register, errorMessage } from '../auth';
	import { errorMessagesRegister } from '../../../store/HomeStore';

	let displayname: string = '';
	let email: string = '';
	let password1: string = '';
	let password2: string = '';
	let isLoading: boolean = false;

	export let showRegistrationForm = false;

	async function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
		isLoading = true;
		event.preventDefault();

		// Validate inputs before registration
		const isDisplaynameValid = dealInsightHandleInput('displayname', displayname, errorMessagesRegister);
		const isEmailValid = dealInsightHandleInput('email', email, errorMessagesRegister);
		const isPassword1Valid = dealInsightHandleInput('password', password1, errorMessagesRegister);
		const isPassword2Valid = dealInsightHandleInput('password', password2, errorMessagesRegister);

		// Check if passwords match
		if (password1 !== password2) {
			errorMessages.update((current) => ({
				...current,
				password: 'Passwords do not match'
			}));
		} else {
			errorMessages.update((current) => ({
				...current,
				password: ''
			}));
		}

		if (isDisplaynameValid && isEmailValid && isPassword1Valid && password1 === password2) {
			try {
				await register(displayname, email, password1, password2);
				// Optional: Add a slight delay for UX
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Reset form on successful registration
				if (event.target != null) {
					(event.target as HTMLFormElement).reset();
				}
				showRegistrationForm = false;
			} catch (error) {
				// Handle registration error (handled by errorMessage)
			} finally {
				isLoading = false;
			}
		} else {
			isLoading = false;
		}
	}

	function closeOpenForm() {
		showRegistrationForm = false;
	}
</script>

{#if showRegistrationForm}
	<div class="bg-black p-6 md:px-0 flex md:py-8 md:w-full w-[90dvw] h-fit flex-col relative items-center">
		<button
			on:click={closeOpenForm}
			class="absolute text-lg text-background hover:text-gray-300 top-6 right-6 md:right-10"
			>X</button
		>

		<form class="w-full h-full md:p-10" on:submit|preventDefault={handleSubmit}>
			<div class="flex mt-4 items-center flex-col w-full gap-2">
				<div class="flex w-full gap-4 flex-col md:flex-row justify-between">
					<div class="form-group">
						<label for="displayname">Name</label>
						<input
							id="displayname"
							bind:value={displayname}
							on:input={() => dealInsightHandleInput('displayname', displayname, errorMessagesRegister)}
							placeholder="What would you like to be called?"
							type="text"
							class="input-group"
							required
						/>
						{#if $errorMessagesRegister.displayname}
							<p class="error-text">{$errorMessagesRegister.displayname}</p>
						{/if}
					</div>
					<div class="form-group">
						<label for="email">Email</label>
						<input
							id="email"
							bind:value={email}
							on:input={() => dealInsightHandleInput('email', email, errorMessagesRegister)}
							placeholder="Email address"
							type="email"
							class="input-group"
							required
						/>
						{#if $errorMessagesRegister.email}
							<p class="error-text">{$errorMessagesRegister.email}</p>
						{/if}
					</div>
				</div>
				<div class="form-group">
					<label for="password1">Password</label>
					<input
						id="password1"
						bind:value={password1}
						on:input={() => dealInsightHandleInput('password', password1, errorMessagesRegister)}
						placeholder="Enter password"
						class="input-group"
						type="password"
						required
					/>
					{#if $errorMessagesRegister.password}
						<p class="error-text">{$errorMessagesRegister.password}</p>
					{/if}
				</div>
				<div class="form-group">
					<label for="password2">Confirm Password</label>
					<input
						id="password2"
						bind:value={password2}
						on:input={() => dealInsightHandleInput('password', password2, errorMessagesRegister)}
						placeholder="Confirm password"
						class="input-group"
						type="password"
						required
					/>
					{#if $errorMessagesRegister.password}
						<p class="error-text">{$errorMessagesRegister.password}</p>
					{/if}
				</div>
				<div class="flex flex-col md:flex-row w-full h-20 md:h-10 items-center justify-between">
					<button
						disabled={isLoading}
						type="submit"
						class="rounded-sm p-2 w-full md:w-fit text-gray-300 bg-primary bg-blue-900 hover:bg-black"
					>
						{#if isLoading}
							<div class="max-h-5 max-w-5 load"></div>
						{:else}
							Register
						{/if}
					</button>
					<button
						on:click={closeOpenForm}
						type="button"
						class="hover:underline text-sm text-gray-300"
					>
						Already have an account? Login
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}

<style>
	.form-group {
		margin-bottom: .5rem;
		@apply flex flex-col h-24 text-gray-300 w-full;
	}

	.input-group {
		@apply focus:text-background text-background focus:bg-gray-800 bg-primary p-2 rounded-sm;
	}

	.error-text {
		@apply text-red-500;
		font-size: 0.875rem;
	}
</style>
