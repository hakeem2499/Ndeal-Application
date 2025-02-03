<script lang="ts">
	export let id = 'textarea';
	export let label: string = 'Your Message';
	export let placeholder: string = 'Enter your message here...';
	export let value: string = '';
	export let rows: number = 4;
	export let cols: number = 50;
	export let disabled: boolean = false;

	// Event dispatcher for input changes
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const value = event.target as HTMLInputElement;
		dispatch('input', value);
	}
</script>

<div class="textarea-container bg-transparent ring-0 text-primary  w-full">
	<label for={id}>{label}</label>
	<textarea {id} {placeholder} {rows} {cols} {disabled} bind:value on:input={handleInput}
	></textarea>
</div>

<style>
	.textarea-container {
		margin-bottom: 1rem;
		color: var(--color-primary);
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		margin-left: 0.5rem;
        color:var(--color-primary);
	}

	textarea {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		@apply border-2 rounded-none border-gray-400/70 duration-700  focus:ring-0 transition-all focus:border-l-transparent focus:border-b-transparent focus:border-r-transparent  focus:border-t-primary;
		
		background-color: transparent;
		resize: vertical;
	}

	textarea:disabled {
		background-color: transparent;
		cursor: not-allowed;
	}
	
</style>
