<script>
	import { SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';

	export let data;
</script>

<div class="bg-primary">
	<SliceZone slices={data.page.data.slices} {components} />
</div>
