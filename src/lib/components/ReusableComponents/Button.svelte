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
		"bg-primary h-12 items-center text-lg text-center hover:bg-black w-full text-white py-3 rounded-full",
		className
	)}
	disabled = {disabled}
>
	<slot />
</button>
