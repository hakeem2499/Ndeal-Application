<script lang="ts">
	import clsx from "clsx";
	import { PostType } from "../../../store/InsightStore";
	import PostForm from "./PostForm.svelte";
    import Cancel from '~icons/ph/x-thin';
	import { createEventDispatcher } from "svelte";
    

	export let showForm: boolean = false;
    
	function closePostForm() {
		showForm = false;
	}
</script>

{#if showForm}
	<div class="modal-overlay" on:click={closePostForm}>
		<div
			class={clsx('relative h-fit md:max-w-5xl', showForm ? 'animate-fadeInUp' : '')}
			on:click|stopPropagation
		>
			<PostForm bind:showForm />
			<button on:click={closePostForm} class="absolute left-4 top-3 md:top-4"
				><span class="md:text-2xl text-xl text-white"><Cancel /></span></button
			>
		</div>
	</div>
{/if}

<style>
    .modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
</style>