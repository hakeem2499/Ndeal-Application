<script lang="ts">
	import Icon from '~icons/ph/arrow-right-light';
	import clsx from 'clsx';
	import { PrismicLink } from '@prismicio/svelte';

	export let iconCheck: boolean = false; // Prop to control whether the icon should be rendered

	export let target: string = '_self';
	export let rel: string | undefined = undefined;

	if (target === '_blank' && !rel) {
		rel = 'noopener noreferrer';
	}

	/** @type {string | undefined} */
	let className = undefined;
	export { className as class };
</script>

<PrismicLink
	field={$$restProps.field}
	document={$$restProps.document}
	{...$$restProps}
	class={clsx(' group inline-flex  w-fit h-fit items-center', className)}
>
	<span class="inline-flex items-center justify-center gap-2 gradient-border-button">
		<slot />
		{#if !iconCheck}
			<Icon
				class="text-accent   group-hover:text-orange-100 duration-500  group-hover:translate-x-2 text-sm  md:text-xl mr-2"
			/>
		{/if}
	</span>
</PrismicLink>

<style>
	.gradient-border-button {
		@apply text-xs md:text-base px-2 py-1  md:py-2 md:px-4;
		color: var(--color-accent); /* Text color */
		background-color: white; /* Button background */
		border-radius: 9999px; /* Rounded corners */
		position: relative;
		width: 100%;
		z-index: 1;
		cursor: pointer;
		transition: color 0.4s ease;
		background-clip: padding-box; /* Ensures the background doesn’t cover the border */
	}

	.gradient-border-button::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(45deg, #ff6a00, #057828); /* Gradient border */
		z-index: -1;
		border-radius: 9999px; /* Match button's border radius */
	}

	.gradient-border-button::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--color-primary); /* Button background color */
		z-index: -1;
		border-radius: 9999px;
	}

	.gradient-border-button:hover {
		color: #ff6a00; /* Text color on hover */
	}

	.gradient-border-button:focus {
		outline: none; /* Remove focus outline */
	}
</style>
