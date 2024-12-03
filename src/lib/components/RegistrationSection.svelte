<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Bounded from './Bounded.svelte';
	import RegisterForm from './RegisterForm.svelte';
	
	import FormSubmitted from './FormSubmitted.svelte';
	import Button from './ReusableComponents/Button.svelte';

	export let showForm = false;

	let showModal = false;

	const handleOpenFormSubmittedModal = () => {
		showModal = true;
	};

	
</script>

{#if showForm}
	

	<Bounded>
		<FormSubmitted bind:showModal />
		<!-- <button on:click={handleOpenFormSubmittedModal}>open</button> -->
		<div
			class=" border border-primary bg-secondary min-w-fit mx-auto max-w-md rounded-md md:rounded-md h-fit shadow-xl"
		>
			<RegisterForm on:openFormSubmittedModal={handleOpenFormSubmittedModal} />
		</div>
	</Bounded>
{/if}
