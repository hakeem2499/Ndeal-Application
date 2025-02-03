<script>
	import { showSwitchableButton, userType } from '../../store/HomeStore';
	import Bounded from './Bounded.svelte';
	import Button from './ReusableComponents/Button.svelte';
	import Newsletter from './ReusableComponents/Newsletter.svelte';
	import Back from '~icons/ph/arrow-left-fill';
	import PopupShow from '$lib/components/ReusableComponents/PopupShow.svelte';
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	import RegistrationSection from './RegistrationSection.svelte';
	import { createEventDispatcher } from 'svelte';
	import clsx from 'clsx';

	let showForm = false;
	let showPopup = false;

	const handleOpenFormModalProfessional = () => {
		showForm = true;
		showSwitchableButton.set(false);
		userType.set('Professional');
		showPopup = true;
	};
	const handleOpenFormModalCompany = () => {
		showForm = true;
		showPopup = true; // Show popup when form is open
		showSwitchableButton.set(false);
		userType.set('Company');
	};
	const closeOpenFormModal = () => {
		showForm = false;
	};
</script>

{#if showForm}
	<div class="hidden md:flex">
		<div class="modal-overlay" on:click={closeOpenFormModal}>
			<div class={clsx(showForm ? 'animate-flipInY' : 'animate-flipOutY')} on:click|stopPropagation>
				<RegistrationSection bind:showForm />
			</div>
		</div>
	</div>
	<div class="modal-mobile">
		<PopupShow bind:showPopup class="animate-S_fadeIn z-100  bg-secondary md:hidden">
			<Button
				className=" max-w-10 absolute  left-4  top-0 md:left-20 hover:bg-transparent bg-transparent"
				onClick={closeOpenFormModal}
			>
				<span class="text-primary text-3xl"><Back /></span>
			</Button>
			<RegisterForm />
		</PopupShow>
	</div>
{/if}

<div class="spikes relative w-full md:px-10 md:py-10 bg-secondary h-fit lg:min-h-[700px]">
	<Bounded class="   gap-10">
		<div class="flex flex-col items-center lg:w-[70dvw] md:gap-12 gap-6">
			<div class="lg:max-w-[50dvw] space-y-8">
				<h3 class="text-3xl md:text-5xl">
					Transform Your Workforce with Equitable Solutions for Growth
				</h3>
				<p class="text-pretty">
					Join us in creating a workplace where fair compensation and employee well-being drive
					success. Sign up for our newsletter or book a demo to see how our tailored HR solutions
					can empower your team and elevate your business.
				</p>
				<Button
					onClick={handleOpenFormModalCompany}
					className="w-max text-sm lg:text-lg bg-primary text-background hover:opacity-80 transition-opacity duration-300   inline-flex px-5 rounded-sm ">Book a demo</Button
				>
				<Button
					onClick={handleOpenFormModalProfessional}
					className="w-max text-sm lg:text-lg border border-primary hover:bg-primary hover:text-background transition-all duration-300  inline-flex px-5 rounded-sm ">Save a seat</Button
				>
			</div>
		</div>
	</Bounded>
	<div class="cta-div py-8 relative">
		<Newsletter />
	</div>
</div>

<style>
	.cta-div::before,
	.cta-div::after {
		content: '';
		position: absolute;
		height: 0.125rem;

		left: 0;
		width: 100%;
		background-color: #b8b4ae;
	}
	.cta-div::after {
		bottom: 0;
		margin-top: 30px;
		@apply mb-8 md:mb-0;
	}
	.cta-div::before {
		top: 0;
	}
	.spikes {
		--spike-width: 100px;
		--spike-height: 10px;
		--spike-color: var(--color-primary);
	}
	.spikes::before,
	.spikes::after {
		content: '';
		position: absolute;
		width: 90%;
		height: var(--spike-height);
		background-image: url('src/lib/images/svg-path.svg');
		background-repeat: no-repeat;
		background-size: 100% 100%; /* Ensures full width and height */
		mask-type: luminance; /* Cross-browser */
	}

	.spikes::before {
		top: 0;
	}
	.spikes::after {
		bottom: 0;
		transform: rotate(0.5turn);
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

	.modal-mobile {
		z-index: 1000;
		position: fixed;
	}
</style>
