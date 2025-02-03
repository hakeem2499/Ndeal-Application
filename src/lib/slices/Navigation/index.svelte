<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import ButtonLinkBlack from '$lib/components/ReusableComponents/ButtonLinkBlack.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import CheckList from '~icons/material-symbols/select-check-box';

	export let slice: Content.NavigationSlice;
</script>

<Bounded
	class="bg-accent"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="flex w-full gap-4 flex-col lg:flex-row items-center justify-between">
		<div class="flex mx-auto ml-0 gap-6 justify-start flex-col items-start">
			<h2 class=" text-3xl md:text-4xl text-balance w-full">
				<PrismicText field={slice.primary.heading} />
			</h2>
			<p class="prose prose-base w-full">
				<PrismicText field={slice.primary.body} />
			</p>

			<ul class="space-y-4">
				<PrismicText class="prose prose-invert" field={slice.primary.subheading} />
				{#each slice.primary.access_to as point}
					<li>
						<div class=" text-pretty">
							<p class="prose gap-2 items-start inline-flex ">
								<span><CheckList class="text-lg  text-green-700 text-nowrap w-auto h-auto" /></span>
								<PrismicText field={point.points} />
							</p>
						</div>
					</li>
				{/each}
			</ul>

			<ButtonLinkBlack href="/signup"  field={slice.primary.link}>{slice.primary.label}</ButtonLinkBlack>
		</div>
		<div class="w-full h-auto">
			<PrismicImage field={slice.primary.image} />
		</div>
	</div>
</Bounded>
