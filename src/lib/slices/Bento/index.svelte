<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText, PrismicText, PrismicLink } from '@prismicio/svelte';
	import GoldText from '$lib/components/GoldText.svelte';
	import Heading2 from '$lib/components/ReusableComponents/Heading2.svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	import clsx from 'clsx';
	import ButtonLinkBlack from '$lib/components/ReusableComponents/ButtonLinkBlack.svelte';

	export let slice: Content.BentoSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<PrismicRichText
		field={slice.primary.heading}
		components={{ em: GoldText, heading2: Heading2 }}
	/>
	<div class="mx-auto mt-6 max-w-md text-balance text-center prose prose-lg">
		<PrismicRichText field={slice.primary.body} />
	</div>

	<div class="mt-16 grid max-w-8xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
		{#each slice.primary.four_divisions as item}
			<div
				class={clsx(
					'glass-container row-span-3 grid grid-rows-subgrid gap-4  rounded-lg  p-4 md:p-10  before:bg-gray-100/10',
					item.wide ? 'md:col-span-2 lg:px-16 bg-slate-200' : 'md:col-span-1 bg-accent'
				)}
			>
				<h3 class="text-2xl md:text-3xl text-balance">
					<PrismicText field={item.title} />
				</h3>
				<div class="max-w-4xl text-balance prose prose-lg text-primary">
					<PrismicRichText field={item.body} />
					{#if item.wide}
						<ButtonLinkBlack field={item.link}>{item.link_label}</ButtonLinkBlack>
					{/if}
				</div>
				<PrismicImage field={item.image} class={clsx('rounded-lg shadow-xl border-4 max-h-84 w-auto', item.wide ? '' : 'my-auto')} />
			</div>
		{/each}
	</div>
</Bounded>
