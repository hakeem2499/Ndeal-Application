<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';

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

	// Event dispatcher
	const dispatch = createEventDispatcher();

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		value = target.value;
		validateInput(target);
		dispatch('input', value);
	};

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
				'peer mt-2 w-full border-b-2 border-r-background  border-l-background border-t-background  bg-background rounded-sm hover:border-b-black  px-2 py-3 focus:border-none focus:outline-none',
				className
			)}
			on:input={handleInput}
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
				'peer mt-2 w-full rounded-sm hover:border-primary hover:border-1 focus:border-1 px-2 py-3 focus:border-primary focus:outline-none',
				className
			)}
			on:input={handleInput}
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
				'peer mt-2 w-full rounded-sm hover:border-primary hover:border-1 focus:border-none px-2 py-3  focus:outline-none',
				className
			)}
			on:input={handleInput}
			on:blur={handleBlur}
			on:focus={handleFocus}
			{...$$restProps}
		/>
	{/if}

	<label
		for={id}
		class={clsx(
			'pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-black opacity-75 transition-all duration-300 ease-in-out peer-placeholder-shown:top-2/3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[30%] peer-focus:text-[0.7rem] peer-focus:text-gray-800 px-2',
			labelClass
		)}
	>
		{label}
	</label>
</div>
