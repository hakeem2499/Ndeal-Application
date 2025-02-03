<script lang="ts">
	import type { Content } from '@prismicio/client';
	import AnchorLinkFooter from "../ReusableComponents/AnchorLinkFooter.svelte";
	import { PrismicLink } from '@prismicio/svelte';

	// Define the prop with the correct type
	export let settings: Content.SettingsDocument;
</script>

<div class="grid max-w-40 grid-cols-2">
	{#each settings.data.policies as item (item.policy_label)}
		<li>
			<PrismicLink class="text-gray-900 hover:underline no-underline text-sm" field={item.policy_link}>
				{item.policy_label}
			</PrismicLink>
		</li>
	{/each}
</div>
