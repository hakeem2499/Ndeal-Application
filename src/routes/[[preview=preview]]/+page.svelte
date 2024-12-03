<script lang="ts">

	import { onMount } from 'svelte';

	import CookieComponent from '$lib/components/CookieComponent.svelte';

	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	
	export let data;
		onMount(async () => {
			
			toast.push({
				component: {
					src: CookieComponent, // where src is a Svelte component
					props: {
						title: 'Cookie Consent'
					},
					sendIdTo: 'toastId' // send toast id to toastId prop
				},
				dismissable: false,
				initial: 0,
				theme: {
					'--toastPadding': '0',
					'--toastMsgPadding': '0',
					'--toastContainerBottom': '8rem',
					' --toastContainerLeft': 'calc(50vw - 8rem)'
				}
			});
		}); // Placeholder for data fetching
</script>

<svelte:head>
	<title>Ndeal</title>
	<meta name="Ndeal" content="Leading HR software" />
</svelte:head>

 

<SliceZone slices={data.slices} {components} />




<style>
	.sectioned-layer {
		background-image: url('/src/lib/images/nnnoise.svg');
	}
	.wave-two {
		fill: #171717;
	}
</style>
