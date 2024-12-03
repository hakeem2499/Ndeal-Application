<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/dealInsight/Footer.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Header from '$lib/components/dealInsight/Header.svelte';
	import PostFormSection from '$lib/components/dealInsight/PostFormSection.svelte';
	import { PostType } from '../../../store/InsightStore';
	let showForm: boolean = false;
	function handleShowForm() {
		showForm = true;
		PostType.set('Share Insight');
	}
	function handleShowFormQuestion() {
		showForm = true;
		PostType.set('Ask a Question');
	}

	const options = {intro: { y: -64 }, duration: 2000 };
</script>

<div class="wrap">
	<SvelteToast {options} />
</div>
<div class="h-full min-h-[100dvh] w-full bg-black">
	<main>
		<Header on:openPostModal={handleShowForm} on:openPostModalQuestion={handleShowFormQuestion} />
		<slot />
	</main>
</div>
<PostFormSection bind:showForm />

<style>
	.wrap {
	  --toastContainerTop: 0.5rem;
	  --toastContainerRight: 0.5rem;
	  --toastContainerBottom: auto;
	  --toastContainerLeft: 0.5rem;
	  --toastWidth: 100%;
	  --toastMinHeight: 2rem;
	  --toastPadding: 0 0.5rem;
	  font-size: 0.875rem;
	}
	@media (min-width: 40rem) {
	  .wrap {
		--toastContainerRight: auto;
		--toastContainerLeft: calc(50dvw - 8rem);
		--toastWidth: 40rem;
	  }
	}
  </style>
