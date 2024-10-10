<script lang="ts">
	import { writable, get } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import {
		allFieldsValid,
		defaultValidFields,
		errorMessages,
		formChecker,
		handleInput,
		progressValue,
		updateProgress,
		validFields
	} from './Forms/validation';
	import StartIcon from '~icons/ph/bell-simple-ringing-fill';
	import FinishedIcon from '~icons/ph/shield-check-fill';
	import Input from './ReusableComponents/Input.svelte';
	import Select from './ReusableComponents/Select.svelte';
	import clsx from 'clsx';
	import Button from './ReusableComponents/Button.svelte';
	import Previous from '~icons/ph/arrow-left-bold';
	import {
		queryResponseOptions,
		jobTitlesOptions,
		organizationNameOptions,
		companySizeOptions,
		companyHeadquatersOptions
	} from '../../store/contents';
	import { createEventDispatcher } from 'svelte';
	import { isError } from '$lib/validation';

	// Form state
	export const userType = writable('Professional'); // 'Professional' or 'Company'
	const currentStep = writable(1);
	let isLoading: boolean = false;

	let success: boolean = false;
	const dispatch = createEventDispatcher();
	// Form data state

	const defaultProfessionalForm = {
		step1: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: ''
		},
		step2: {
			organizationName: '',
			jobTitle: '',
			queryResponse: ''
		}
	};

	const defaultCompanyForm = {
		step1: {
			numberOfEmployees: '',
			companyHeadquaters: ''
		},
		step2: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			companyWebsite: '',
			industry: ''
		}
	};

	// Form validation
	// Track Valid fields and error messages

	const professionalForm = writable({ ...defaultProfessionalForm });
	const companyForm = writable({ ...defaultCompanyForm });

	// Define the structure for the configuration object
	interface InputConfig {
		steps: {
			[key: string]: string[]; // Maps step names to arrays of field names
		};
	}

	function getProgressColor(progressValue: number) {
		if (progressValue < 0.2) {
			return '#dcfce7'; // Red for low progress
		} else if (progressValue < 0.4) {
			return '#86efac';
		} else if (progressValue < 0.6) {
			return '#4ade80';
		} else if (progressValue < 0.8) {
			return '#22c55e';
		} else {
			return 'green'; // Green for high progress
		}
	}

	//Checking if form fields are field for both company and professional form

	const professionalInputConfig: InputConfig = {
		steps: {
			step1: ['firstName', 'lastName', 'email', 'phoneNumber'],
			step2: ['jobTitle', 'organizationName', 'queryResponse']
		}
	};

	const companyInputConfig: InputConfig = {
		steps: {
			step1: ['numberOfEmployees', 'companyHeadquaters'],
			step2: ['firstName', 'lastName', 'email', 'phoneNumber', 'companyWebsite', 'industry']
		}
	};

	// Helper functions to handle form submission
	const handleSubmit = async (event: any) => {
		type FormData = {
			[key: string]: any;
		};
		event.preventDefault();
		isLoading = true;
		success = false;
		let formData: FormData = {};

		const type = get(userType);

		if (type === 'Professional') {
			const data = get(professionalForm);
			formData = {
				firstName: data.step1.firstName,
				lastName: data.step1.lastName,
				email: data.step1.email,
				phoneNumber: data.step1.phoneNumber,
				userType: 'Professional',
				Professional: {
					jobTitle: data.step2.jobTitle,
					organizationName: data.step2.organizationName,
					queryResponse: data.step2.queryResponse
				}
			};
		} else if (type === 'Company') {
			const data = get(companyForm);
			formData = {
				firstName: data.step2.firstName,
				lastName: data.step2.lastName,
				email: data.step2.email,
				phoneNumber: data.step2.phoneNumber,
				userType: 'Company',
				Company: {
					companySize: data.step1.numberOfEmployees,
					companyLocation: data.step1.companyHeadquaters,
					companyWebsite: data.step2.companyWebsite,
					industry: data.step2.industry
				}
			};
		} else if (type === 'Admin') {
			// const data = get(adminForm); // Assuming adminForm exists
			// formData = {
			//     ...data.step1, // Assuming Admin form also has step1 fields
			//     ...data.step2, // Assuming Admin form also has step2 fields
			//     userType: 'Admin',
			// };
		}

		console.log('Form Data:', formData);

		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				console.error('HTTP Status Code:', response.status);
				console.error('Response Body:', await response.text());
				throw new Error('Failed to submit form data');
			}

			await new Promise((resolve) => setTimeout(resolve, 2000));

			isLoading = false;
			if (response.ok) {
				const result = await response.json();
				console.log('Submission successful:', result);
				success = true;
				isError.set({ 'login-successful': 'You are now a Ndeal Pioneeer' });
			} else {
				const errorData = await response.json();
				if (response.status === 400 && errorData.error === 'User already exists') {
					isError.set({ 'user-exists': 'User already exists. Please use a different email.' });
				} else {
					isError.set({ 'general-error': 'An error occurred. Please try again.' });
				}
				console.error('Error submitting form data:', errorData);
			}

			dispatch('openFormSubmittedModal');

			event.target.reset();
			currentStep.set(1);
		} catch (error) {
			console.error('Error submitting form data:', error);
			isError.set({ 'network-error': 'An error occurred. Please try again.' });
			isLoading = false;
			event.target.reset();
			dispatch('openFormSubmittedModal');
		} finally {
			isLoading = false;
			success = false;
		}
	};

	const goToNextStep = () => {
		currentStep.update((n) => n + 1);
	};

	const goToPreviousStep = () => {
		currentStep.update((n) => n - 1);
	};

	const resetFormAndStep = (newType: string) => {
		console.log('Resetting form and step');
		currentStep.set(1);
		validFields.set({ ...defaultValidFields });

		console.log('Valid fields reset:', defaultValidFields);

		if (newType === 'Professional') {
			professionalForm.set({ ...defaultProfessionalForm });
			companyForm.set({ ...defaultCompanyForm }); // Clear company form when switching to Professional
			console.log('Switched to Professional:', defaultProfessionalForm);
		} else {
			companyForm.set({ ...defaultCompanyForm });
			professionalForm.set({ ...defaultProfessionalForm }); // Clear Professional form when switching to company
			console.log('Switched to Company:', defaultCompanyForm);
		}
	};

	userType.subscribe((value) => resetFormAndStep(value));
	function handleClick() {
		userType.update((value) => {
			resetFormAndStep(value);
			return value;
		});
	}
</script>

<div class="flex flex-col gap-4 max-w-md mx-auto md:w-full w-[80dvw]  p-2">
	<div class=" mx-auto  px-2 justify-center  text-white max-w-60">
		{#if $userType === 'Professional'}
			<span
				class="bg-gradient-to-b from-orange-500 to-yellow-900 bg-clip-text italic text-transparent text-2xl"
				>Save a seat</span
			>
		{/if}
		{#if $userType === 'Company'}
			<span
				class="bg-gradient-to-b from-yellow-900 to-primary bg-clip-text not-italic text-transparent text-2xl"
				>Schedule a demo</span
			>
		{/if}
	</div>

	<div class="flex items-center justify-between w-full">
		<StartIcon class={clsx(formChecker ? 'hidden' : 'text-red-600')} />
		<progress
			class="w-full duration-300 h-1 rounded-lg bg-gray-200"
			style={`--progress-color: ${getProgressColor($progressValue)}`}
			value={$progressValue}
			max="1"
		/>
		<FinishedIcon class={clsx(formChecker ? 'text-green-900' : '')} />
	</div>

	<div class="flex w-full flex-col">
		<div class="flex justify-center">
			<div class="rounded-full border border-slate-950 p-1">
				<div class="flex text-xs font-semibold leading-5">
					<button
						on:click={() => {
							userType.set('Professional');
							handleClick();
						}}
						class="w-auto rounded-full focus:text-white focus-within:bg-green-900 px-3 py-1 text-black focus:outline-none"
						class:text-white={$userType === 'Professional'}
						class:bg-green-900={$userType === 'Professional'}
						>Professional
					</button>
					<button
						on:click={() => {
							userType.set('Company');
							handleClick();
						}}
						class="rounded-full px-3 focus:text-white py-1 text-black focus-within:bg-green-900 focus:outline-none"
						class:bg-green-900={$userType === 'Company'}
						class:text-white={$userType === 'Company'}
						>Company
					</button>
				</div>
			</div>
		</div>
	</div>

	{#if $userType === 'Professional'}
		<form on:submit={handleSubmit}>
			{#if $currentStep === 1}
				<div class="space-y-4 p-2 md:p-4">
					<div class="flex gap-2 mt-4">
						<div class="flex flex-col">
							<Input
								id="firstName"
								label="First Name"
								step="step1"
								field="firstName"
								formStore={professionalForm}
							/>
							{#if $errorMessages.firstName}
								<p class="text-red-600 text-sm">{$errorMessages.firstName}</p>
							{/if}
						</div>
						<div class="flex flex-col">
							<Input
								id="lastName"
								label="Last Name"
								type="text"
								step="step1"
								field="lastName"
								formStore={professionalForm}
							/>
							{#if $errorMessages.lastName}
								<p class="text-red-600 text-sm">{$errorMessages.lastName}</p>
							{/if}
						</div>
					</div>

					<div>
						<Input
							id="email"
							label="email address"
							type="email"
							step="step1"
							field="email"
							formStore={professionalForm}
						/>
						{#if $errorMessages.email}
							<p class="text-red-600 text-sm">{$errorMessages.email}</p>
						{/if}
					</div>
					<div>
						<Input
							id="phoneNumber"
							label="Phone Number"
							type="tel"
							step="step1"
							field="phoneNumber"
							formStore={professionalForm}
						/>
						{#if $errorMessages.phoneNumber}
							<p class="text-red-600 text-sm">{$errorMessages.phoneNumber}</p>
						{/if}
					</div>
					<Button onClick={() => goToNextStep()} disabled={!$allFieldsValid}>Next</Button>
				</div>
			{/if}

			{#if $currentStep === 2}
				<div class="space-y-4 p-4">
					<div>
						<Select
							options={organizationNameOptions}
							placeholder="Industry you work with"
							className="absolute"
							bind:selected={$professionalForm.step2.organizationName}
							on:select={(e) => handleInput(e, 'step1', 'organizationName', professionalForm)}
						/>
					</div>
					<div>
						<Select
							options={jobTitlesOptions}
							placeholder="what is your job Title"
							bind:selected={$professionalForm.step2.jobTitle}
							on:select={(e) => handleInput(e, 'step1', 'jobTitle', professionalForm)}
						/>
					</div>
					<div>
						<Select
							options={queryResponseOptions}
							placeholder="Do You think Ndeal can improve Nigeria's work compensation? "
							bind:selected={$professionalForm.step2.queryResponse}
							on:select={(e) => handleInput(e, 'step1', 'queryResponse', professionalForm)}
						/>
					</div>
					<div class="flex gap-1 justify-center">
						<!-- <Button
							type="button"
							onClick={goToPreviousStep}
							className="bg-gray-600 max-w-[20%] rounded-e-none "
							><span class="text-xl"><Previous /></span></Button
						> -->
						<Button
							type="submit"
							disabled={isLoading || success}
							className="min-w-[80%] text-center"
							>{#if isLoading}
								<span class="inline-flex load"></span>
							{:else if success}
								<span
									class="inline-flex items-center gap-x-1 rounded-full bg-green-600/20 px-2.5 py-1 text-sm font-semibold leading-5 text-green-600"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
										<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
										<path d="M9 12l2 2l4 -4"></path>
									</svg>
									Success
								</span>
							{:else}
								submit
							{/if}</Button
						>
					</div>
				</div>
			{/if}
		</form>
	{/if}

	{#if $userType === 'Company'}
		<form on:submit={handleSubmit}>
			{#if $currentStep === 1}
				<div class="space-y-4 p-2 md:p-4">
					<div class="mt-4">
						<Select
							options={companySizeOptions}
							placeholder="Number of Employees "
							bind:selected={$companyForm.step1.numberOfEmployees}
							on:select={(e) => handleInput(e, 'step1', 'numberOfEmployees', companyForm)}
						/>
					</div>
					<div class="mt-4">
						<Select
							options={companyHeadquatersOptions}
							placeholder="Company's Location "
							bind:selected={$companyForm.step1.companyHeadquaters}
							on:select={(e) => handleInput(e, 'step1', 'numberOfEmployees', companyForm)}
						/>
					</div>

					<Button onClick={goToNextStep}>Next</Button>
				</div>
			{/if}

			{#if $currentStep === 2}
				<div class="space-y-4 p-2 md:p-4">
					<div class="flex gap-2">
						<Input
							id="firstName"
							label="First Name"
							type="text"
							step="step2"
							field="firstName"
							formStore={companyForm}
						/>

						<Input
							id="lastName"
							label="Last Name"
							type="password"
							step="step2"
							field="lastName"
							formStore={companyForm}
						/>
					</div>
					<div></div>
					<div class="flex gap-2">
						<Input
							id="email"
							label="Work Email"
							type="email"
							step="step2"
							field="email"
							formStore={companyForm}
						/>

						<Input
							id="phoneNumber"
							label="Phone Number"
							type="tel"
							step="step2"
							field="phoneNumber"
							formStore={companyForm}
						/>
					</div>

					<div>
						<Input
							id="companyWebsite"
							label="company website"
							type="text"
							step="step2"
							field="companyWebsite"
							formStore={companyForm}
						/>
					</div>
					<div>
						<Input
							id="industry"
							label="Industry"
							type="text"
							step="step2"
							field="industry"
							formStore={companyForm}
						/>
					</div>
					<div class="flex gap-1 rounded-full border border-black justify-between">
						<!-- <Button
							type="button"
							onClick={goToPreviousStep}
							className="bg-white group   max-w-[20%] rounded-e-none "
							><span class="text-xl text-black group-hover:text-white"><Previous /></span></Button
						> -->
						<Button
							type="submit"
							disabled={isLoading || success}
							className="min-w-[80%] text-center"
							>{#if isLoading}
								<span class="inline-flex load"></span>
							{:else if success}
								<span
									class="inline-flex items-center gap-x-1 rounded-full bg-green-600/20 px-2.5 py-1 text-sm font-semibold leading-5 text-green-600"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
										<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
										<path d="M9 12l2 2l4 -4"></path>
									</svg>
									Success
								</span>
							{:else}
								submit
							{/if}</Button
						>
					</div>
				</div>
			{/if}
		</form>
	{/if}
</div>

<style>
	progress::-webkit-progress-value {
		background-color: var(--progress-color);
	}
	progress::-moz-progress-bar {
		background-color: var(--progress-color);
	}
	progress::-ms-fill {
		background-color: var(--progress-color);
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	.load {
		width: 30px;
		height: 30px;
		margin: auto 0;
		border: solid 0.4rem #8822aa;
		border-radius: 50%;
		border-bottom-color: transparent;
		-webkit-transition: all 0.5s ease-in;
		-webkit-animation-name: rotate;
		-webkit-animation-duration: 1s;
		-webkit-animation-iteration-count: infinite;
		-webkit-animation-timing-function: linear;

		transition: all 0.5s ease-in;
		animation-name: rotate;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
</style>
