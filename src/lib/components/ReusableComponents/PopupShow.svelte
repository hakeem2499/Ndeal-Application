<script lang="ts">
	import clsx from 'clsx';

	export let showPopup: boolean = false;
	export let tag = 'div';
	/** @type {string | undefined} */
	let className = undefined;
	export { className as class };
</script>

{#if showPopup}
	<!-- content here -->
	<svelte:element this={tag} {...$$restProps} class={clsx('inset-0 fixed w-full z-100 bg-primary h-full', className)}>
		<div class="mx-auto flex h-full p-4 gap-8 mt-10   flex-col items-center">
			<slot />
		</div>
	</svelte:element>
{/if}
