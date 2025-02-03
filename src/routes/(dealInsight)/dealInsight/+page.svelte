<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { PageData } from './$types';
	import {
		PostStore,
		fetchPosts,
		upvotePost,
		addComment,
		type Post,
		PostType
	} from '../../../store/InsightStore';
	import { onMount } from 'svelte';
	import { get, type Writable } from 'svelte/store';
	import PostIcon from '~icons/ph/note-pencil-fill';
	import Ask from '~icons/ph/question-mark-fill';
	import Pen from '~icons/material-symbols/edit-outline';
	import PostForm from '$lib/components/dealInsight/PostForm.svelte';
	import { clsx } from 'clsx';
	export let data;
	import Cancel from '~icons/ph/x-thin';
	import Bounded from '$lib/components/Bounded.svelte';
	import LoadingSpinner from '$lib/components/ReusableComponents/LoadingSpinner.svelte';

	let selectedTag: string = '';
	let newComment: string = '';
	let showForm: boolean = false;
	let isLoading: boolean = true; // Loading state

	function handleShowForm() {
		showForm = true;
		PostType.set('Share Insight');
	}
	function handleShowFormQuestion() {
		showForm = true;
		PostType.set('Ask a Question');
	}
	function closePostForm() {
		showForm = false;
	}

	onMount(async () => {
		try {
			isLoading = true; // Set loading state
			await fetchPosts(); // Fetch posts asynchronously
		} catch (error) {
			console.error('Failed to fetch posts:', error);
		} finally {
			isLoading = false; // Reset loading state
		}
	});
	console.log('🚀 ~ onMount ~ fetchPosts:', fetchPosts);

	// Get filtered posts from PostStore
	const posts: Writable<Post[]> = PostStore;

	// Filtered posts by selected tag
	$: filteredPosts = selectedTag
		? get(posts).filter((post) => post.tags.includes(selectedTag))
		: get(posts);

	// Create a list of unique tags from posts
	$: uniqueTags = Array.from(new Set(get(PostStore).flatMap((PostStore) => PostStore.tags)));

	function handleUpvote(postId: number) {
		upvotePost(postId);
	}

	async function handleAddComment(postId: number) {
		if (newComment.trim()) {
			await addComment(postId, newComment.trim());
			newComment = ''; // Clear input after adding
		}
	}
</script>

{#if showForm}
	<div class="modal-overlay" on:click={closePostForm}>
		<div
			class={clsx('relative h-fit md:max-w-5xl', showForm ? 'animate-S_fadeIn' : '')}
			on:click|stopPropagation
		>
			<PostForm bind:showForm />
			<button on:click={closePostForm} class="absolute left-4 top-3 md:top-4"
				><span class="md:text-2xl text-xl text-white"><Cancel /></span></button
			>
		</div>
	</div>
{/if}

<div class="flex justify-start mx-auto px-4 py-2 max-w-6xl gap-4">
	<div class="md:flex md:w-[15%] gap-2 flex-col hidden">
		<div class="flex mt-8 gap-2 flex-col">
			{#each uniqueTags as tag}
				<button class="btn" on:click={() => (selectedTag = tag)}>{tag}</button>
			{/each}
			<button class="btn" on:click={() => (selectedTag = '')}>ALL</button>
		</div>
		<div>
			<ul class="lg:flex flex-col max-w-36 hidden m-auto gap-2 text-xs">
				{#each data.settings.data.policies as item (item.policy_label)}
					<li>
						<PrismicLink
							class="text-slate-400 no-underline hover:underline text-xs"
							field={item.policy_link}
						>
							{item.policy_label}
						</PrismicLink>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	{#if isLoading}
		<Bounded>
			<div class="w-full flex flex-col justify-center items-center">
				<LoadingSpinner />
			</div>
		</Bounded>
	{:else}
		<!-- Post section -->
		<div class=" flex flex-col h-full items-center w-full gap-4 justify-center mx-auto md:w-[70%]">
			<div
				class="flex flex-col min-w-max w-full mx-auto border rounded-sm md:p-4 p-2 border-slate-700"
			>
				<button on:click={handleShowForm} class="flex group items-center gap-2 py-4 w-full">
					<span
						class="rounded-full border-slate-700 border h-10 w-12 flex items-center justify-center"
						>E</span
					>
					<span
						class="w-full group-hover:border-teal-700 text-xs md:text-base rounded-full border py-2 pl-4 text-start text-gray-300 border-slate-700"
						>What would you like to share</span
					>
				</button>

				<div
					class="flex items-center text-xs md:text-sm max-w-[80dvw] justify-center md:gap-4 md:w-full"
				>
					<button
						on:click={handleShowForm}
						class="div bg-transparent rounded-full items-center inline-flex gap-2 p-2 text-gray-300 hover:bg-gray-300/10"
						><span class=" text-teal-700"><PostIcon /></span>Contribute Expertise</button
					>
					<button
						on:click={handleShowFormQuestion}
						class="div bg-transparent rounded-full items-center gap-2 inline-flex p-2 text-gray-300 hover:bg-gray-300/10"
						><span class=" text-teal-700"><Ask /></span>Ask</button
					>
					<a
						href="/answer"
						class=" bg-transparent rounded-full items-center gap-2 inline-flex p-2 md:px-4 text-gray-300 hover:bg-gray-300/10"
						><span class=" text-teal-700"><Pen /></span>Answer</a
					>
				</div>
			</div>
			<div class="space-y-4 flex flex-col w-full">
				{#each $PostStore as post}
					<div
						class="bg-primary border-2 border-slate-900 rounded-sm p-4 shadow-sm hover:shadow-md transition-shadow"
					>
						<div class="flex flex-col-reverse items-center gap-4">
							<!-- Post Image -->
							<img
								src={post.image}
								alt={post.title}
								class="w-full max-h-80 object-contain rounded-lg flex-shrink-0"
							/>

							<!-- Post Content -->
							<div class="prose prose-invert flex-1">
								<div class="mb-2">
									<h3 class="text-lg font-bold text-secondary">{post.title}</h3>
									<p class="text-sm text-secondary">{post.description}</p>
								</div>

								<!-- Tags -->
								<div class="flex flex-wrap gap-2 mt-2">
									{#each post.tags as tag}
										<span class="text-sm text-teal-700">#{tag}</span>
									{/each}
								</div>

								<!-- Actions -->
								<div class="flex items-center gap-2 mt-4">
									<!-- <a href="/films/{film.id}" class="text-sm text-blue-500 hover:underline">View Details</a>
					  <button 
						on:click={() => handleDelete(film.id)} 
						class="text-sm text-red-500 hover:underline"
					  >
						Delete
					  </button> -->
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<div class="hidden md:flex md:w-[15%]"></div>
</div>

<style>
	.btn {
		@apply md:px-4 w-fit text-sm  bg-secondary rounded-sm;
	}

	.div {
		position: relative;
		@apply px-6;
	}
	.div::after {
		content: '';
		position: absolute;
		height: 60%;
		width: 0.02rem;
		left: 100%;
		bottom: 2;
		background-color: gray;
		margin-left: 0.5rem;
	}

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
		index: 1000;
	}
</style>
