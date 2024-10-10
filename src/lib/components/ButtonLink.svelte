<script lang="ts">
	import Icon from '~icons/ph/arrow-square-right'
	import clsx from 'clsx';

	export let tag: keyof HTMLElementTagNameMap = 'a'; // Ensure tag is a valid HTML tag
	export let iconCheck: boolean = false; // Prop to control whether the icon should be rendered
	export let href: string = '#';
	export let target: string = '_self';
	export let rel: string | undefined = undefined;

	if (target === '_blank' && !rel) {
		rel = 'noopener noreferrer';
	}

	/** @type {string | undefined} */
	let className = undefined;
	export { className as class };

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
	class={clsx(
		'relative inline-flex gap-2 items-center group h-fit  w-fit rounded-5px border border-gray-950 bg-transparent px-4 py-2 text-black active:bg-black active:text-orange-300 outline-none ring-orange-300 transition-colors hover:border-violet-100/20 hover:text-orange-300 hover:bg-black focus:ring-2',
		className
	)}
>
	<slot />
	{#if !iconCheck}
		<Icon class="text-black   group-hover:text-orange-300 duration-500  group-hover:translate-x-2  text-xl mr-2" />
	{/if}
</svelte:element>
