<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';
	import { handleInput, type ErrorMessages, type ValidFields } from '../Forms/validation';
	import type { Writable } from 'svelte/store';

	// Props
	export let id: string | undefined = undefined;
	export let label: string = '';
	export let type: string = 'text'; // Dynamic type
	export let value: string = '';
	export let placeholder: string = ' ';
	export let className: string = '';
	export let labelClass: string = '';
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let required: boolean = false;
	export let minLength: number | undefined = undefined;
	export let maxLength: number | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let customValidityMessage: string = '';
	export let step: string;
	export let field: string;
	export let formStore: Writable<any>;
	export let validFieldsStore: Writable<ValidFields>;
	export let errorMessagesStore: Writable<ErrorMessages>;

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// const handleInput = (event: Event) => {
	//     const target = event.target as HTMLInputElement;
	//     if (target) {
	//         value = target.value;
	//         console.log('🚀 ~ handleInput ~ target:', target);
	//         console.log('🚀 ~ handleInput ~ valueForinput:', value);
	//         validateInput(target);
	//         dispatch('input', value);
	//     } else {
	//         console.error('Target is null');
	//     }
	// };

	function onInput(event: Event) {
		handleInput(event, step, field, formStore, validFieldsStore, errorMessagesStore);
		dispatch('input', event);
	}

	const handleBlur = (event: FocusEvent) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		dispatch('blur', event);
	};

	const handleFocus = (event: FocusEvent) => {
		dispatch('focus', event);
	};

	const validateInput = (inputElement: HTMLInputElement) => {
		if (customValidityMessage) {
			inputElement.setCustomValidity(customValidityMessage);
		}

		inputElement.reportValidity();
	};
</script>

<div class="relative h-24">
	{#if type === 'text' || 'email'}
		<input
			{id}
			type="text"
			bind:value
			{placeholder}
			{disabled}
			{readonly}
			{required}
			minlength={minLength}
			maxlength={maxLength}
			{pattern}
			class={clsx(
				'peer mt-2 w-full h-16 rounded-e-xl md:rounded-e-3xl border-0 focus-within:bg-transparent focus:bg-transparent border-b focus:border-b-2 bg-transparent border-gray-400 focus:border-gray-200 focus:ring-0 p-2', // Added padding
				className
			)}
			on:input={onInput}
			on:blur={handleBlur}
			on:focus={handleFocus}
			{...$$restProps}
		/>
	{:else if type === 'number'}
		<input
			{id}
			type="number"
			bind:value
			{placeholder}
			{disabled}
			{readonly}
			{required}
			minlength={minLength}
			maxlength={maxLength}
			{pattern}
			class={clsx(
				'peer mt-2 w-full   border-0 border-b focus:border-b-2 bg-transparent border-primary focus:border-black focus:ring-0',
				className
			)}
			on:input={onInput}
			on:blur={handleBlur}
			on:focus={handleFocus}
			{...$$restProps}
		/>
	{:else if type === 'password'}
		<input
			{id}
			type="password"
			bind:value
			{placeholder}
			{disabled}
			{readonly}
			{required}
			minlength={minLength}
			maxlength={maxLength}
			{pattern}
			class={clsx(
				'peer mt-2 w-full border-0 border-b focus:border-b-2 bg-background border-primary focus:border-black focus:ring-0 p-2', // Added padding
				className
			)}
			on:input={onInput}
			on:blur={handleBlur}
			on:focus={handleFocus}
			{...$$restProps}
		/>
	{/if}

	<label
		for={id}
		class={clsx(
			'pointer-events-none absolute left-0  transform translate-y-2 md:-translate-y-[70%] text-sm text-black opacity-75 transition-all duration-300 ease-in-out peer-placeholder-shown:top-2/3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 md:peer-focus:top-6 peer-focus:text-[0.75rem] peer-focus:text-gray-800 px-2',
			labelClass
		)}
	>
		{label}
	</label>
</div>

<style>
	input:focus {
		outline: none !important;
	}
</style>
