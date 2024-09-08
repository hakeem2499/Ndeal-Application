<script lang="ts">
	import clsx from 'clsx';
	import Next from '~icons/ph/paper-plane-right-fill';

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
	class={clsx('anchor-link  duration-300 group relative inline-flex gap-2 items-center h-fit w-fit  ', className)}
>
	<slot />
	<Next class="group-hover:translate-x-1 duration-700 group-hover:text-orange-300 " />
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
