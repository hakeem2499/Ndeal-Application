<script>
	import clsx from 'clsx';
	import { PrismicLink } from '@prismicio/svelte';

	/** @type {string | undefined} */
	let className = undefined;
	export { className as class };
</script>

<PrismicLink
	field={$$restProps.field}
	document={$$restProps.document}
	{...$$restProps}
	on:click
	class={clsx(
		'anchor-link  duration-300 cursor-pointer  relative inline-flex gap-3 items-center h-fit w-fit  ',
		className
	)}
	><span class="anchor-link"><slot /> </span>
</PrismicLink>

<style>
	.anchor-link::after {
		content: '';
		position: absolute;
		height: 2px;
		left: 0;
		bottom: -0.25rem;
		width: 100%;
		background: var(--color-accent);
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 200ms ease;
	}
	.anchor-link:hover::after {
		transform: scaleX(1);
	}

	@media (prefers-reduced-motion: reduce) {
		.anchor-link {
			/* Remove transitions or reduce their duration */
			transition: none;
		}
	}
</style>
