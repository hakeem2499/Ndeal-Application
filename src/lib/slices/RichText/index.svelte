<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Label from './Label.svelte';
	import Bounded from '$lib/components/Bounded.svelte';

	export let slice: Content.RichTextSlice;
</script>

<Bounded>
	<div class="prose prose-lg prose-slate prose-invert w-full">
		<PrismicRichText field={slice.primary.content} />
	</div>
</Bounded>
