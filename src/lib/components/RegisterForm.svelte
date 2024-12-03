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
	import growthImage from '../images/growth.svg';
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
	import GoldText from './GoldText.svelte';
	import { API_URL, showSwitchableButton, userType, type UserType } from '../../store/HomeStore';
	import LoadingSpinner from './ReusableComponents/LoadingSpinner.svelte';

	// Form state

	const currentStep = writable(1);
	let isLoading = writable(false);

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
		event.preventDefault();
		isLoading.set(true);
		let success = false;
		let formData: Record<string, any> = {};

		const currentUserType: UserType = get(userType); // Get raw value from store

		try {
			if (currentUserType === 'Professional') {
				const data = get(professionalForm);
				formData = {
					first_name: data.step1.firstName,
					last_name: data.step1.lastName,
					email: data.step1.email,
					phone_number: data.step1.phoneNumber,
					organization_name: data.step2.organizationName,
					job_title: data.step2.jobTitle,
					query_response: data.step2.queryResponse
				};

				await submitForm('/signup/professional/', formData);
			} else if (currentUserType === 'Company') {
				const data = get(companyForm);
				formData = {
					first_name: data.step2.firstName,
					last_name: data.step2.lastName,
					email: data.step2.email,
					phone_number: data.step2.phoneNumber,
					number_of_employees: data.step1.numberOfEmployees,
					company_headquarters: data.step1.companyHeadquaters,
					company_website: data.step2.companyWebsite,
					industry: data.step2.industry
				};

				await submitForm('/signup/company/', formData);
			} else if (currentUserType === 'Partner') {
			}
			await new Promise((resolve) => setTimeout(resolve, 3000));
			success = true;
			console.log('Submission successful');
			isError.set({ 'login-successful': 'Welcome Aboard' }); // Clear any previous errors
		} catch (error: any) {
			console.error('Error submitting form data:', error.message || error);
			isError.set({ 'general-error': 'An error occurred. Please try again.' });
		} finally {
			isLoading.set(false);
			if (success) {
				dispatch('openFormSubmittedModal');
				event.target.reset();
				currentStep.set(1);
			}
		}
	};

	const submitForm = async (url: string, data: Record<string, any>) => {
		try {
			const response = await fetch(`${API_URL}${url}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			// Check if the response is not OK
			if (!response.ok) {
				const errorResponse = await response.json();

				// Handle specific HTTP statuses
				if (response.status === 400) {
					// Log validation error details for debugging
					console.error('400 Validation Error:', errorResponse);
					throw new Error(errorResponse.error || 'Validation error. Please check your input.');
				} else if (response.status === 500) {
					// Log server error
					console.error('500 Server Error:', errorResponse);
					throw new Error('Server error. Please try again later.');
				} else {
					// Log other errors
					console.error(`HTTP Status Code ${response.status}:`, errorResponse);
					throw new Error('An unexpected error occurred. Please try again.');
				}
			}

			// Return the response body if the request is successful
			return response.json();
		} catch (error: any) {
			// Log and rethrow error to be caught by the calling function
			console.error('Error submitting form data:', error.message || error);
			throw error;
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

<div class="flex items-center py-4 gap-4 flex-col m-auto w-full md:m-0 md:p-6">
	<div class=" mx-auto p-2 justify-center text-lg md:text-2xl font-semibold max-w-2xl text-center">
		{#if $userType === 'Company'}
			<div class="rounded-md bg-primary text-background p-4">Schedule a demo</div>
		{/if}
	</div>
	{#if $userType === 'Professional'}
		<div class="flex p-2 bg-slate-200 md:rounded-md gap-5 items-center justify-center w-full">
			<img src={growthImage} alt="" class="w-10 h-10" />
			<span class="text-2xl">|</span>
			<GoldText>200+ SIGNUPS</GoldText>
		</div>
	{/if}
	<!-- {#if $showSwitchableButton}
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
	{/if} -->

	<div
		class="transition-all duration-300 flex items-center justify-center h-full w-[90dvw] md:w-fit min-h-[400px]"
	>
		<div class="w-[90dvw] md:min-w-[500px] md:w-fit">
			{#if $userType === 'Professional'}
				<form on:submit={handleSubmit}>
					{#if $currentStep === 1}
						<div class="md:space-y-8 space-y-4 p-2">
							<div class="flex justify-between mt-4">
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
						<div class="space-y-4 md:space-y-8 p-4">
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
								<Button type="submit" disabled={$isLoading || success} className=" text-center"
									>{#if $isLoading}
										<span><LoadingSpinner /></span>
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
						<div class="flex flex-col gap-2 h-full justify-between">
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
							<div class="flex w-full justify-between gap-2">
								<div class="flex flex-col">
									<Input
										id="firstName"
										label="First Name"
										type="text"
										step="step2"
										field="firstName"
										formStore={companyForm}
									/>
									{#if $errorMessages.firstName}
										<p class="text-red-600 text-sm">{$errorMessages.firstName}</p>
									{/if}
								</div>
								<div class="flex flex-col">
									<Input
										id="lastName"
										label="Last Name"
										type="password"
										step="step2"
										field="lastName"
										formStore={companyForm}
									/>
									{#if $errorMessages.lastName}
										<p class="text-red-600 text-sm">{$errorMessages.lastName}</p>
									{/if}
								</div>
							</div>
							<div></div>
							<div class="flex w-full justify-between gap-2">
								<div class="flex flex-col gap-2">
									<Input
										id="email"
										label="Work Email"
										type="email"
										step="step2"
										field="email"
										formStore={companyForm}
									/>
									{#if $errorMessages.email}
										<p class="text-red-600 text-sm">{$errorMessages.email}</p>
									{/if}
								</div>
								<div class="flex flex-col">
									<Input
										id="phoneNumber"
										label="Phone Number"
										type="tel"
										step="step2"
										field="phoneNumber"
										formStore={companyForm}
									/>
									{#if $errorMessages.phoneNumber}
										<p class="text-red-600 text-sm">{$errorMessages.phoneNumber}</p>
									{/if}
								</div>
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
								<Select
									options={organizationNameOptions}
									placeholder="Industry you work with"
									className="absolute"
									bind:selected={$companyForm.step2.industry}
									on:select={(e) => handleInput(e, 'step2', 'industry', companyForm)}
								/>
							</div>
							<div class="flex gap-1 rounded-full border border-black justify-between">
								<!-- <Button
							type="button"
							onClick={goToPreviousStep}
							className="bg-white group   max-w-[20%] rounded-e-none "
							><span class="text-xl text-black group-hover:text-white"><Previous /></span></Button
						> -->
								<Button type="submit" disabled={$isLoading || success} className=" text-center"
									>{#if $isLoading}
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
	</div>
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
</style>
