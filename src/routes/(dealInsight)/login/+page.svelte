<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import AnchorLinkFooter from '$lib/components/ReusableComponents/AnchorLinkFooter.svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import Google from '~icons/logos/google-icon';
	import Linkedin from '~icons/logos/linkedin-icon';
	import CopyWright from '~icons/ph/copyright-light';
	import Register from './Register.svelte';
	import clsx from 'clsx';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	
	import { errorMessage, login } from '../auth';
	import { string } from 'zod';
	import { dealInsightHandleInput, errorMessages } from '$lib/components/Forms/validation';
	import { goto } from '$app/navigation';
	import { errorMessagesLogin } from '../../../store/HomeStore';
	export let data;
	let email = '';
	let password = '';
	let isLoading: boolean = false;

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		isLoading = true;
		event.preventDefault();
		try {
			// Attempt to register
			await login(email, password);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			if (event.target != null) {
				(event.target as HTMLFormElement).reset();
			}
		} catch (error) {
			// Handle registration error
		} finally {
			isLoading = false;
		}
		// Close the form if registration is successful (errorMessage will be null)
		if (!errorMessage) {
			goto('/dealInsight')
		}
	}

	let showRegistrationForm = false;

	const handleOpenFormModal = () => {
		showRegistrationForm = true;
	};
	const closeOpenFormModal = () => {
		showRegistrationForm = false;
	};
	const options = {};
</script>

<SvelteToast {options} />
<svelte:head>
	<title>dealInsight</title>
	<meta name="Ndeal's dealInsight" content="Leading HR software" />
</svelte:head>

<PrismicImage class="absolute -z-10   h-full w-full" field={data.login.data.background_image} />
<div class="absolute flex-col -z-10 lg:z-auto md:px-4  md:flex-row inset-0 flex justify-between items-center w-full">
	<PrismicImage class=" h-80 w-auto" field={data.login.data.image} />
	<PrismicImage class=" h-80 w-auto" field={data.login.data.another_image} />
</div>

<Bounded >
	{#if showRegistrationForm}
		<div class="modal-overlay" on:click={closeOpenFormModal}>
			<div
				class={clsx('md:max-w-2xl h-fit md:w-full', showRegistrationForm ? 'animate-fadeInUp' : '')}
				on:click|stopPropagation
			>
				<Register bind:showRegistrationForm />
			</div>
		</div>
	{/if}
	<div
		class=" max-w-2xl z-50 px-4 py-8 text-white rounded-sm flex flex-col items-center bg-gradient-to-r from-primary via-primary to-slate-950/30 gap-4"
	>
		<PrismicImage class="h-10  w-auto object-cover" field={data.login.data.logo} />

		<div class="div relative flex flex-col md:flex-row">
			<div class="p-4 text-base prose prose-invert gap-4 flex md:w-[50%] flex-col">
				<p class="text-sm">
					By continuing,you indicate that you agree with Ndeal's
					<a class="link" href="/terms" target="_blank">Terms of Service</a> and
					<a class="link" href="/policy" target="_blank">Privacy Policy</a>.
				</p>

				<a
					class="p-3 border items-center text-gray-300 no-underline hover:text-primary hover:bg-gray-200 gap-4 flex border-gray-500"
					href=""><Google />Signin with Google</a
				>
				<a
					class="p-3 border text-gray-300 items-center no-underline hover:text-primary hover:bg-background gap-4 flex border-gray-500"
					href=""><Linkedin />Signin with Linkedin</a
				>
				<button
					on:click={handleOpenFormModal}
					class="bg-transparent rounded-full p-2 text-gray-300 hover:bg-gray-300/10"
					>Signup with email</button
				>
			</div>
			<div class="flex p-4 md:w-[50%] gap-4 flex-col">
				<div class="liner text-gray-300 text-lg font-Just_sans_medium">Login</div>
				<form on:submit|preventDefault={handleSubmit} action="">
					<div class="flex mt-4 flex-col w-full gap-2">
						<div class="form-group">
							<label for="email"> Email </label>
							<input
								id="email"
								bind:value={email}
								placeholder="email address"
								on:input={() => dealInsightHandleInput('email', email, errorMessagesLogin)}
								type="email"
								class="input-group"
								required
							/>
							{#if $errorMessagesLogin.email}
								<p class="error-text">{$errorMessagesLogin.email}</p>
							{/if}
						</div>
						<div class=" form-group">
							<label for="password"> Password </label>
							<input
								id="password"
								on:input={() => dealInsightHandleInput('password', password, errorMessagesLogin)}
								bind:value={password}
								placeholder="password"
								class="input-group"
								type="password"
								required
							/>
							{#if $errorMessagesLogin.password}
								<p class="error-text mt-1 leading-4">{$errorMessagesLogin.password}</p>
							{/if}
						</div>
						<div class="flex w-full my-4 items-center h-10 md:h-16 justify-between">
							<a href="" class="hover:underline text-sm text-gray-300">forgot password?</a>
							<button type="submit" class="rounded-sm p-2 text-gray-300 bg-primary hover:bg-black"
								>{#if isLoading}
									<div class="max-h-5 max-w-5 load"></div>
								{:else}
									Login
								{/if}</button
							>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="liner w-full p-2"></div>
		<div>
			<ul class="flex text-xs items-center gap-4">
				{#each data.settings.data.policies as item }
					<li>
						<AnchorLinkFooter class="anchor-link text-xs" field={item.policy_link}>
							{item.policy_label}
						</AnchorLinkFooter>
					</li>
				{/each}
				<span class="flex items-center gap-1"><CopyWright /> Ndeal Inc, 2024.</span>
			</ul>
		</div>
	</div>
</Bounded>

<style>
	.link {
		@apply no-underline hover:underline text-blue-700;
	}
	.form-group {
		margin-bottom: 0.2rem; /* Add some space between form groups */
		@apply flex h-20 flex-col text-gray-300;
	}

	.input-group {
		@apply bg-primary;
	}

	.div::after {
		content: '';
		position: absolute;
		height: 95%;
		bottom: 0;
		width: 0.07rem;
		left: 50%;
		background-color: var(--color-accent);
		@apply hidden md:flex;
	}

	.liner {
		position: relative;
	}
	.liner::after {
		content: '';
		position: absolute;
		height: 0.075rem;
		bottom: -0.2rem;
		width: 100%;
		left: 0;
		background-color: gray;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.error-text {
		@apply text-red-500 text-xs;
		
	}
</style>
