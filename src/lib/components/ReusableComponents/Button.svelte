<script lang="ts">
	import clsx from 'clsx';

	// Define the button types explicitly as a union of the valid values
	export let type: 'button' | 'submit' | 'reset' = 'button'; // default to 'button'
	export let disabled: boolean | undefined = undefined;

	export let className: string | undefined = undefined; // Allow customization of class names

	/** Click handler function */
	export let onClick: () => void = () => {}; // Event handler type
</script>

<button
	{type}
	on:click={onClick}
	class={clsx(
		" font-Just_sans_medium h-12 items-center text-lg text-center  w-full rounded   py-3 ",
		className
	)}
	disabled = {disabled}
>
	<slot />
</button>
