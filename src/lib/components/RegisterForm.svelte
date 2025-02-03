<script lang="ts">
	import { writable, get } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import {
		allFieldsValidCompany,
		allFieldsValidProfessional,
		areAllFieldsValid,
		errorMessagesCompany,
		errorMessagesProfessional,
		validFieldsStoreCompany,
		validFieldsStoreProfessional
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
	import { createEventDispatcher, onMount } from 'svelte';
	import { isError } from '$lib/validation';
	import GoldText from './GoldText.svelte';
	import {
		API_URL,
		COUNTRY_CODES_API,
		showSwitchableButton,
		STATES_API,
		submitForm,
		userType,
		type UserType
	} from '../../store/HomeStore';
	import { type Options } from '../../store/contents';
	import LoadingSpinner from './ReusableComponents/LoadingSpinner.svelte';
	import Relate from './ReusableComponents/Relate.svelte';
	import { goto } from '$app/navigation';

	// Form state

	const currentStep = writable(1);
	let isLoading = writable(false);

	interface CountriesInterface {
		name: string;
		code: string;
		dial_code: string;
	}
	interface States {
		name: string;
		state_code: string;
	}
	// country and states options requests
	let countries: CountriesInterface[] = [];
	let states: States[] = [];

	// Fetch country codes on mount
	onMount(async () => {
		const response = await fetch(COUNTRY_CODES_API);
		const data = await response.json();
		countries = data.data; // List of countries with codes.
		console.log('🚀 ~ onMount ~ countries:', countries);


	});
	console.log('🚀 ~ onMount ~ allFieldsValidCompany:', allFieldsValidCompany);

	// Fetch states based on selected country
	async function fetchStates(country: string) {
		const response = await fetch(STATES_API, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ country })
		});
		const data = await response.json();
		console.log('🚀 ~ fetchStates ~ data:', data);
		states = data.data.states || []; // List of states for the selected country
		console.log('🚀 ~ fetchStates ~ states:', states);
	}

	// Handle country selection
	function handleCountryChange(e: Event) {
		try {
			const target = e.target as HTMLInputElement | null;
			if (target) {
				$companyForm.step1.selectedCountry = target.value;
				const countryDetails = countries.find(
					(c: any) => c.name === $companyForm.step1.selectedCountry
				);
				$companyForm.step2.selectedCode = countryDetails?.dial_code || ''; // Set dial code
				fetchStates($companyForm.step1.selectedCountry); // Fetch states for the selected country
			}
		} catch (error) {
			console.error(error);
		}
	}

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
			selectedCountry: '',

			selectedState: ''
		},
		step2: {
			firstName: '',
			lastName: '',
			email: '',
			selectedCode: '',
			phoneNumber: '',
			companyWebsite: '',
			industry: ''
		}
	};

	// Form validation
	// Track Valid fields and error messages

	const professionalForm = writable({ ...defaultProfessionalForm });
	const companyForm = writable({ ...defaultCompanyForm });

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
					phone_number: data.step2.selectedCode + data.step2.phoneNumber,
					number_of_employees: data.step1.numberOfEmployees,
					company_headquarters: data.step1.selectedCountry + '-' + data.step1.selectedState,
					company_website: 'https://' + data.step2.companyWebsite,
					industry: data.step2.industry
				};

				await submitForm('/signup/company/', formData);
			} else if (currentUserType === 'Partner') {
			}
			await new Promise((resolve) => setTimeout(resolve, 3000));
			success = true;
			console.log('Submission successful');
			goto('/signup-confirmation?success=true');
		} catch (error: any) {
			console.error('Error submitting form data:', error.message || error);
			isError.set({ 'general-error': 'An error occurred. Please try again.' });
			dispatch('openFormSubmittedModal');
		} finally {
			isLoading.set(false);
			if (success) {
				event.target.reset();
				currentStep.set(1);
			}
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

<div class="flex items-center py-4 gap-4 flex-col m-auto w-full md:m-0 md:px-6">
	<div
		class=" mx-auto p-2 md:p-0 justify-center text-lg md:text-2xl flex flex-col items-center gap-4 max-w-2xl text-center"
	>
		{#if $userType === 'Company'}
			<Relate />
			<p class="font-poppins text-xl">Schedule a 30 minutes demo with expert Q&A</p>
		{/if}
	</div>
	{#if $userType === 'Professional'}
		<Relate />
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
										validFieldsStore={validFieldsStoreProfessional}
										errorMessagesStore={errorMessagesProfessional}
									/>
									{#if $errorMessagesProfessional.firstName}
										<p class="error-text">{$errorMessagesProfessional.firstName}</p>
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
										validFieldsStore={validFieldsStoreProfessional}
										errorMessagesStore={errorMessagesProfessional}
									/>
									{#if $errorMessagesProfessional.lastName}
										<p class="error-text">{$errorMessagesProfessional.lastName}</p>
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
									validFieldsStore={validFieldsStoreProfessional}
									errorMessagesStore={errorMessagesProfessional}
								/>
								{#if $errorMessagesProfessional.email}
									<p class="error-text">{$errorMessagesProfessional.email}</p>
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
									validFieldsStore={validFieldsStoreProfessional}
									errorMessagesStore={errorMessagesProfessional}
								/>
								{#if $errorMessagesProfessional.phoneNumber}
									<p class="error-text">{$errorMessagesProfessional.phoneNumber}</p>
								{/if}
							</div>

							<Button
								className="bg-transparent"
								onClick={() => goToNextStep()}
								disabled={!$allFieldsValidProfessional}>Next</Button
							>
						</div>
					{/if}

					{#if $currentStep === 2}
						<div class="space-y-4 md:space-y-8 p-4">
							<div>
								<Select
									id="organizationName"
									options={organizationNameOptions}
									placeholder="Industry you work with"
									className="absolute"
									bind:selected={$professionalForm.step2.organizationName}
								/>
							</div>
							<div>
								<Select
									id="jobTitle"
									options={jobTitlesOptions}
									placeholder="what is your job Title"
									bind:selected={$professionalForm.step2.jobTitle}
								/>
							</div>
							<div>
								<Select
									id="queryResponseOptions"
									options={queryResponseOptions}
									placeholder="Do You think Ndeal can improve Nigeria's work compensation? "
									bind:selected={$professionalForm.step2.queryResponse}
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
									disabled={$isLoading || success}
									className="border-none text-center"
									>{#if $isLoading}
										<span class="w-full mx-auto"><LoadingSpinner /></span>
									{:else}
										Book
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
									id="numberOfEmployees"
									options={companySizeOptions}
									placeholder="Number of Employees "
									bind:selected={$companyForm.step1.numberOfEmployees}
								/>
							</div>
							<div class="mt-4">
								<div class="space-y-4 md:space-y-6 border border-slate-500/50 p-1 md:p-4">
									<p>Company Location</p>

									<select
										id="country"
										bind:value={$companyForm.step1.selectedCountry}
										on:change={handleCountryChange}
										class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent bg-background focus:ring-indigo-500 sm:text-sm"
									>
										<option value="" disabled selected>Select country</option>
										{#each countries as country}
											<option value={country.name}>{country.name}</option>
										{/each}
									</select>

									<select
										id="state"
										bind:value={$companyForm.step1.selectedState}
										disabled={!states.length}
										class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent bg-background focus:ring-indigo-500 sm:text-sm"
									>
										<option value="" disabled selected>Select state</option>
										{#each states as state}
											<option value={state.name}>{state.name}</option>
										{/each}
									</select>
								</div>
							</div>

							<Button onClick={goToNextStep}>Next</Button>
						</div>
					{/if}

					{#if $currentStep === 2}
						<div class="space-y-0 md:space-y-4 px-2 md:p-4">
							<div class="flex w-full justify-between gap-2">
								<div class="flex flex-col">
									<Input
										id="firstName"
										label="First Name"
										type="text"
										step="step2"
										field="firstName"
										formStore={companyForm}
										validFieldsStore={validFieldsStoreCompany}
										errorMessagesStore={errorMessagesCompany}
									/>
									{#if $errorMessagesCompany.firstName}
										<p class="error-text">{$errorMessagesCompany.firstName}</p>
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
										validFieldsStore={validFieldsStoreCompany}
										errorMessagesStore={errorMessagesCompany}
									/>
									{#if $errorMessagesCompany.lastName}
										<p class="error-text">{$errorMessagesCompany.lastName}</p>
									{/if}
								</div>
							</div>

							<div class="flex w-full flex-col md:flex-row justify-between">
								<div class="flex md:w-[35%] flex-col gap-2">
									<Input
										id="email"
										label="Work Email"
										type="email"
										step="step2"
										field="email"
										formStore={companyForm}
										validFieldsStore={validFieldsStoreCompany}
										errorMessagesStore={errorMessagesCompany}
									/>
									{#if $errorMessagesCompany.email}
										<p class="error-text">{$errorMessagesCompany.email}</p>
									{/if}
								</div>
								<div class="flex flex-col">
									<div class="flex w-full justify-end items-center">
										<select
											id="dialCode"
											bind:value={$companyForm.step2.selectedCode}
											class="mb-4 w-24 rounded-md border-none bg-background focus:border-none focus:ring-0 sm:text-sm"
										>
											<option value="" disabled selected>Select your dial code</option>
											{#each countries as country}
												<option value={country.dial_code}>{country.dial_code}</option>
											{/each}
										</select>
										<Input
											className="w-[80%]"
											id="phoneNumber"
											label="Phone Number"
											type="tel"
											step="step2"
											field="phoneNumber"
											formStore={companyForm}
											validFieldsStore={validFieldsStoreCompany}
											errorMessagesStore={errorMessagesCompany}
										/>
									</div>
									{#if $errorMessagesCompany.phoneNumber}
										<p class="error-text">{$errorMessagesCompany.phoneNumber}</p>
									{/if}
								</div>
							</div>

							<div class="flex flex-col">
								<Input
									id="companyWebsite"
									label="company website"
									type="text"
									step="step2"
									field="companyWebsite"
									formStore={companyForm}
									validFieldsStore={validFieldsStoreCompany}
									errorMessagesStore={errorMessagesCompany}
								/>
								{#if $errorMessagesCompany.companyWebsite}
									<p class="error-text">{$errorMessagesCompany.companyWebsite}</p>
								{/if}
							</div>
							<div>
								<Select
									id="industry"
									options={organizationNameOptions}
									placeholder="Industry you work with"
									className="absolute"
									bind:selected={$companyForm.step2.industry}
								/>
							</div>
							<div class="md:flex">
								<Button
									type="button"
									onClick={goToPreviousStep}
									className="bg-transparent   max-w-[20%]  "
									><span class="text-xl text-black"><Previous /></span></Button
								>
								<Button
									type="submit"
									disabled={$isLoading || success || !$allFieldsValidCompany}
									className="border-none  py-4 text-xl  text-center"
									>{#if $isLoading}
										<span class="inline-flex load"></span>
									{:else}
										schedule
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
	.error-text {
		@apply text-xs md:text-sm ml-2 text-red-500;
	}
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
