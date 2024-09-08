<script lang="ts">
	import { writable, get } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import StartIcon from '~icons/ph/bell-simple-ringing-fill';
	import FinishedIcon from '~icons/ph/shield-check-fill';
	import Input from './ReusableComponents/Input.svelte';
	import Select from './ReusableComponents/Select.svelte';
	import clsx from 'clsx';
	import Button from './ReusableComponents/Button.svelte';
	import Previous from '~icons/ph/arrow-left-bold';
	import { queryResponseOptions, jobTitlesOptions, organizationNameOptions, companySizeOptions, companyHeadquatersOptions } from '../../store/contents';

	// Form state
	const userType = writable('Professional'); // 'Professional' or 'Company'
	const currentStep = writable(1);
	const progressValue = writable(0);
	let formChecker: boolean = false;
	let isLoading: boolean = false;
	let errorMessage: String = '';

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

	const professionalForm = writable({ ...defaultProfessionalForm });
	const companyForm = writable({ ...defaultCompanyForm });

	// Define the structure for the configuration object
	interface InputConfig {
		steps: {
			[key: string]: string[]; // Maps step names to arrays of field names
		};
	}

	interface ProgressConfig {
		totalFields: number;
	}

	interface FormConfig {
		inputConfig: InputConfig;
		progressConfig: ProgressConfig;
	}

	function handleInput(
		e: Event,
		step: string,
		field: string,
		formStore: Writable<any>,
		config: FormConfig
	) {
		try {
			const target = e.target as HTMLInputElement | null;

			if (target) {
				// Update the form value if the target exists
				formStore.update((currentForm) => {
					currentForm[step][field] = target.value;
					return currentForm;
				});
			} else {
				// Log an error if the target is null but continue with the progress update
				console.error(
					'Event target is null, skipping value update but continuing progress update.'
				);
			}

			// Always call updateProgress to ensure the progress bar reflects the current state
			updateProgress(formStore, config.progressConfig);
		} catch (error) {
			console.error(error);
		}
	}

	function updateProgress(formStore: Writable<any>, config: ProgressConfig) {
		const form = get(formStore);

		const filledCount = Object.keys(form)
			.flatMap((step) => Object.values(form[step]))
			.filter((value) => value !== '').length;

		progressValue.set(filledCount / config.totalFields);
		console.log('Progress value:', filledCount / config.totalFields);
		const formProgressValue = filledCount / config.totalFields;
		console.log('🚀 ~ updateProgress ~ formProgressValue:', formProgressValue);
		if (formProgressValue === 1) {
			formChecker = true;
		}
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

	const professionalFormConfig: FormConfig = {
		inputConfig: professionalInputConfig,
		progressConfig: {
			totalFields: 7
		}
	};
	const companyFormConfig: FormConfig = {
		inputConfig: companyInputConfig,
		progressConfig: {
			totalFields: 8
		}
	};

	// Helper functions to handle form submission
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		let formData: any;

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

			const result = await response.json();
			console.log('Submission successful:', result);
			// Handle success, e.g., show a notification or redirect
		} catch (error) {
			console.error('Error submitting form data:', error);
			console.log('something is up');
			// Handle the error, e.g., show an error notification
		}
	};

	const goToNextStep = () => {
		currentStep.update((n) => n + 1);
	};

	const goToPreviousStep = () => {
		currentStep.update((n) => n - 1);
	};

	const resetFormAndStep = (newType: string) => {
		currentStep.set(1);
		if (newType === 'Professional') {
			professionalForm.set({ ...defaultProfessionalForm });
			companyForm.set({ ...defaultCompanyForm }); // Clear company form when switching to Professional
		} else {
			companyForm.set({ ...defaultCompanyForm });
			professionalForm.set({ ...defaultProfessionalForm }); // Clear Professional form when switching to company
		}
	};

	userType.subscribe((value) => resetFormAndStep(value));
</script>

<div class="flex flex-col gap-4 max-w-[500px] mx-auto p-4 md:p-8">
	<div class=" mx-auto bg-primary p-4 justify-center rounded-full text-white max-w-60">
		{#if $userType === 'Professional'}
			<span
				class="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent text-2xl"
				>Save a seat</span
			>
		{/if}
		{#if $userType === 'Company'}
			<span
				class="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent text-2xl"
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

	<div class="flex flex-col">
		<div class="flex justify-center">
			<div class="rounded-full border border-slate-950 p-1">
				<div class="flex text-xs font-semibold leading-5">
					<button
						on:click={() => userType.set('Professional')}
						class="w-auto rounded-full focus:text-white focus-within:bg-green-900 px-3 py-1 text-black focus:outline-none"
						class:text-white={$userType === 'Professional'}
						class:bg-green-900={$userType === 'Professional'}
						>Professional
					</button>
					<button
						on:click={() => userType.set('Company')}
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
				<div class="space-y-4">
					<div class="flex gap-2 mt-4">
						<Input
							id="firstName"
							label="First Name"
							bind:value={$professionalForm.step1.firstName}
							on:input={(e) =>
								handleInput(e, 'step1', 'firstName', professionalForm, professionalFormConfig)}
						/>

						<Input
							id="lastName"
							label="Last Name"
							type="text"
							bind:value={$professionalForm.step1.lastName}
							on:input={(e) =>
								handleInput(e, 'step1', 'lastName', professionalForm, professionalFormConfig)}
						/>
					</div>

					<div>
						<Input
							id="email"
							label="email address"
							type="email"
							bind:value={$professionalForm.step1.email}
							on:input={(e) =>
								handleInput(e, 'step1', 'email', professionalForm, professionalFormConfig)}
						/>
					</div>
					<div>
						<Input
							id="phoneNumber"
							label="Phone Number"
							type="tel"
							bind:value={$professionalForm.step1.phoneNumber}
							on:input={(e) =>
								handleInput(e, 'step1', 'phoneNumber', professionalForm, professionalFormConfig)}
						/>
					</div>
					<Button onClick={goToNextStep}>Next</Button>
				</div>
			{/if}

			{#if $currentStep === 2}
				<div class="space-y-4">
					<div>
						<Select
							options={organizationNameOptions}
							placeholder="Industry you work with"
							bind:selected={$professionalForm.step2.organizationName}
							on:select={(e) =>
								handleInput(
									e,
									'step1',
									'organizationName',
									professionalForm,
									professionalFormConfig
								)}
						/>
					</div>
					<div>
						<Input
							id="jobTitle"
							label="Job Title"
							type="text"
							bind:value={$professionalForm.step2.jobTitle}
							on:input={(e) =>
								handleInput(e, 'step1', 'jobTitle', professionalForm, professionalFormConfig)}
						/>
					</div>
					<div>
						<Input
							id="queryResponse"
							label="Do you think Ndeal can play a key role in improving fair compensation and work ethics in Nigeria?"
							type="text"
							bind:value={$professionalForm.step2.queryResponse}
							on:input={(e) =>
								handleInput(e, 'step1', 'queryResponse', professionalForm, professionalFormConfig)}
						/>
					</div>
					<div class="flex justify-center">
						<Button
							type="button"
							onClick={goToPreviousStep}
							className="bg-gray-600 w-[20%] rounded-e-none "
							><span class="text-xl"><Previous /></span></Button
						>
						<Button
							type="submit"
							className="rounded-s-none w-[80%] text-center"
							>Submit</Button
						>
					</div>
				</div>
			{/if}
		</form>
	{/if}

	{#if $userType === 'Company'}
		<form on:submit={handleSubmit}>
			{#if $currentStep === 1}
				<div class="space-y-4">
					<div class="mt-4">
						<Input
							id="numberOfEmployees"
							label="Number of Employees"
							type="text"
							bind:value={$companyForm.step1.numberOfEmployees}
							on:input={(e) =>
								handleInput(e, 'step1', 'numberofEmployees', companyForm, companyFormConfig)}
						/>
					</div>
					<div class="mt-4">
						<Input
							id="companyHeadquaters"
							label="company Headquaters"
							type="text"
							bind:value={$companyForm.step1.companyHeadquaters}
							on:input={(e) =>
								handleInput(e, 'step1', 'companyHeadquaters', companyForm, companyFormConfig)}
						/>
					</div>

					<Button onClick={goToNextStep}>Next</Button>
				</div>
			{/if}

			{#if $currentStep === 2}
				<div class="space-y-4">
					<div class="flex gap-2">
						<Input
							id="firstName"
							label="First Name"
							type="text"
							bind:value={$companyForm.step2.firstName}
							on:input={(e) => handleInput(e, 'step2', 'firstName', companyForm, companyFormConfig)}
						/>

						<Input
							id="lastName"
							label="Last Name"
							type="password"
							bind:value={$companyForm.step2.lastName}
							on:input={(e) => handleInput(e, 'step2', 'lastName', companyForm, companyFormConfig)}
						/>
					</div>
					<div></div>
					<div class="flex gap-2">
						<Input
							id="email"
							label="Work Email"
							type="email"
							bind:value={$companyForm.step2.email}
							on:input={(e) => handleInput(e, 'step2', 'email', companyForm, companyFormConfig)}
						/>

						<Input
							id="phoneNumber"
							label="Phone Number"
							type="tel"
							bind:value={$companyForm.step2.phoneNumber}
							on:input={(e) =>
								handleInput(e, 'step2', 'phoneNumber', companyForm, companyFormConfig)}
						/>
					</div>

					<div>
						<Input
							id="companyWebsite"
							label="company website"
							type="text"
							bind:value={$companyForm.step2.companyWebsite}
							on:input={(e) =>
								handleInput(e, 'step2', 'companyWebsite', companyForm, companyFormConfig)}
						/>
					</div>
					<div>
						<Input
							id="industry"
							label="Industry"
							type="text"
							bind:value={$companyForm.step2.industry}
							on:input={(e) => handleInput(e, 'step2', 'industry', companyForm, companyFormConfig)}
						/>
					</div>
					<div class="flex justify-between">
						<Button
							type="button"
							onClick={goToPreviousStep}
							className="bg-gray-500 w-[20%] rounded-e-none "
							><span class="text-xl"><Previous /></span></Button
						>
						<Button
							type="submit"
							className="rounded-s-none w-[80%] text-center"
							>Submit</Button
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
</style>
