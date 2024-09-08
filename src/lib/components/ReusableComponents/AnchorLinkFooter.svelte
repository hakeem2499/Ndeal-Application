<script lang="ts">
	import clsx from 'clsx';

	// Define the props
	export let tag: string = 'a'; // Default to anchor tag
	export let href: string = '#'; // Default link URL
	export let target: string = '_self'; // Default target (_self opens in the same tab)
	export let rel: string | undefined = undefined; // Rel attribute (will be auto set for target="_blank")
	export let className: string | undefined = undefined; // Additional classes for customization
	export { className as class };

	// Automatically set 'rel' attribute for target="_blank" for security reasons
	if (target === '_blank' && !rel) {
		rel = 'noopener noreferrer';
	}

	// Dynamic props type depending on the tag
	let dynamicProps: any = { ...$$restProps };

	if (tag === 'a') {
		dynamicProps.href = href;
		dynamicProps.target = target;
		dynamicProps.rel = rel;
	}
</script>

<svelte:element
	this={tag}
	{...dynamicProps}
	class={clsx('anchor-link  duration-300  relative inline-flex gap-3 items-center h-fit w-fit  ', className)}
>
	<slot />
	
</svelte:element>

<style>
	.anchor-link::after {
        content: '';
        position: absolute;
        height: 2px;
        left: 0;
        bottom: -0.5rem;
        width: 100%;
        background: white;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 500ms ease;
	}
    .anchor-link:hover::after{
        transform: scaleX(1);
    }

    

    @media (prefers-reduced-motion: reduce) {
		.anchor-link {
			/* Remove transitions or reduce their duration */
			transition: none;
		}
	}
</style>
