<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';
	import {handleInput} from '../Forms/validation';
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
		handleInput(event, step, field, formStore);
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

<div class="relative">
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
				'peer mt-2 w-full bg-transparent border-0 border-b focus:border-b-2  border-primary focus:border-black focus:ring-0',
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
				'peer mt-2 w-full border-0 border-b focus:border-b-2 bg-background border-primary focus:border-black focus:ring-0',
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
			'pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-black opacity-75 transition-all duration-300 ease-in-out peer-placeholder-shown:top-2/3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[30%] peer-focus:text-[0.7rem]  peer-focus:text-gray-800 px-2',
			labelClass
		)}
	>
		{label}
	</label>
</div>
<style>
	input:focus{
		outline: none !important;
	}
</style>