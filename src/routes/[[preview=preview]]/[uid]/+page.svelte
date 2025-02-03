<script>
	import { SliceZone, PrismicText, PrismicRichText } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Bounded from '$lib/components/Bounded.svelte';
	import CTASection from '$lib/components/CTASection.svelte';
	import clsx from 'clsx';

	export let data;
</script>

{#if data.page.data.displayheading}
	<Bounded>
		<div class="flex gap-4 w-full flex-col">
			<div
				class={clsx(
					'diagonal w-full p-8 mb-10 h-40 relative flex flex-col items-center text-center'
				)}
			>
				<h1 class="font text-3xl mb-0 md:text-5xl font-medium">
					<PrismicText field={data.page.data.title} />
				</h1>
				<p class="max-w-xl">
					<PrismicText field={data.page.data.description} />
				</p>
			</div>
			{#each data.page.data.sections as item}
				<h2 class="font-poppins text-2xl">
					<PrismicText field={item.heading} />
				</h2>

				<p class="w-full">
					<PrismicRichText field={item.description} />
				</p>
			{/each}
		</div>
	</Bounded>
{/if}

<SliceZone slices={data.page.data.slices} {components} />

{#if data.page.data.displayheading}
	<div class="w-full">
		<CTASection />
	</div>
{/if}

<style>
	.diagonal {
		--skew-angle: -2deg;
		--background: linear-gradient(
			45deg,
			var(--color-primary),
			#c471ed,
			var(--color-accent)
		); /* Adjust the gradient colors as needed */
		position: relative;
		isolation: isolate;
	}

	.diagonal::after {
		content: '';
		background: var(--background);
		position: absolute;
		z-index: -1;
		inset: 0;
		transform: skewY(var(--skew-angle));
	}
</style>
