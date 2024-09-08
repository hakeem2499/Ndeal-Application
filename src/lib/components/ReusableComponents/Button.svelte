<script lang="ts">
	import clsx from 'clsx';

	// Define the button types explicitly as a union of the valid values
	export let type: 'button' | 'submit' | 'reset' = 'button'; // default to 'button'

	export let className: string | undefined = undefined; // Allow customization of class names

	/** Click handler function */
	export let onClick: () => void = () => {}; // Event handler type
</script>

<button
	{type}
	on:click={onClick}
	class={clsx(
		"bg-primary hover:bg-black w-full text-white py-2 px-4 rounded-full",
		className
	)}
>
	<slot />
</button>
