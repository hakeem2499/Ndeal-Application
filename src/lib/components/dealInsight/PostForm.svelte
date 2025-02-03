<script lang="ts">
	import { writable } from 'svelte/store';
	import { addPost } from '../../../store/InsightStore';
	import { goto } from '$app/navigation';
	import clsx from 'clsx';
	import ImageIcon from '~icons/ph/images-fill';
	import { PostType } from '../../../store/InsightStore';
	import Dot from '~icons/ph/dot-bold';
	import { errorMessages, successMessage } from '$lib/toast';
	import LoadingSpinner from '../ReusableComponents/LoadingSpinner.svelte';

	let title = writable<string>('');
	let description = writable<string>('');
	let errorMessage = writable('');
	let isSubmitting = writable(false);
	let tags = writable<string>('');
	let image: File | null = null;
	let showInvalidMessage = writable<boolean>(false);
	let fileInput: HTMLInputElement; // Define a reference for the file input
	export let showForm: boolean = false; // To show the form

	const validFields = () => {
		return $title.length > 4 && $description.length > 10;
	};

	function triggerFileInput() {
		fileInput.click(); // Programmatically click the file input
	}

	interface Section {
		title: string;
		content: string;
	}

	async function handleSubmit() {
		// Reset previous error message
		errorMessage.set('');

		// Validate form fields
		if (!validFields()) {
			showInvalidMessage.set(true);
			return;
		}

		const tagArray = $tags.split(',').map((tag) => tag.trim());

		// Indicate that the form is being submitted
		isSubmitting.set(true);

		try {
			// Add a delay to simulate processing time
			await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay

			// Add the post (with error handling)
			await addPost({
				title: $title,
				description: $description,
				image: image || null, // Ensure image is either null or a file object
				tags: tagArray
			});

			// Success: Show success message and redirect
			console.log('Post created successfully!');
			// Example: Navigate to a new page or show a success message
			setTimeout(() => {
				goto('/dealInsight'); // Delay navigation slightly to ensure smooth UX
				
			}, 500);
		} catch (error) {
			// Handle errors gracefully
			console.error('Error creating post:', error);
			errorMessage.set('Failed to create post. Please try again later.');
		} finally {
			// Reset the loading state after submission
			isSubmitting.set(false);
		}
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		image = target.files?.[0] ?? null;
	}

	function handleQuestionSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		throw new Error('Function not implemented.');
	}

	const questionTips: Section[] = [
		{
			title: 'Search first',
			content: "Ensure your question hasn't been asked already."
		},
		{ title: 'Keep it concise', content: 'Ask short, direct questions.' },
		{ title: 'Proofread', content: 'Double-check grammar, spelling, and punctuation.' },
		{ title: 'Be specific', content: 'Provide relevant context and details.' },
		{ title: 'Use clear language', content: 'Avoid jargon and ambiguity.' }
	];
</script>

{#if showForm}
	<div
		class=" bg-primary rounded-md justify-between glass-container p-2 pt-16 md:pt-10 h-screen md:h-[600px] md:px-0 flex md:w-[700px] w-[100dvw] flex-col items-center"
	>
		<div class="flex gap-1 py-2 items-center justify-between w-full">
			<button
				on:click={() => PostType.set('Share Insight')}
				class={clsx(
					'w-1/2  border-0 h-12 py-4 mb-0 rounded-sm  text-background',
					$PostType === 'Share Insight'
						? 'border-b-4 border-brand'
						: 'hover:bg-gray-300/10 border-b border-gray-600/40'
				)}
				>Share Insight
			</button>
			<button
				on:click={() => PostType.set('Ask a Question')}
				class={clsx(
					'w-1/2 border-0 h-12 mb-0 py-4 rounded-sm text-background',
					$PostType === 'Ask a Question'
						? 'border-b-4 border-brand'
						: 'hover:bg-gray-300/10 border-b border-gray-600/40'
				)}
				>Ask a Question
			</button>
		</div>
		{#if $PostType === 'Share Insight'}
			<!-- content here -->

			<form class="form-element" on:submit|preventDefault={handleSubmit}>
				<div class="my-4 md:my-2">
					<input
						class="w-full text-white bg-slate-800/60 rounded-md focus:border focus:border-gray-300/60 focus:ring-0 border-0 appearance-none"
						type="text"
						placeholder="Enter a title"
						aria-label="Title"
						bind:value={$title}
					/>
				</div>

				<div class="mb-4">
					<textarea
						class="w-full h-[60dvh] md:h-auto md:min-h-60 border-0 border-t focus:border-t-2 bg-primary border-gray-400 focus:border-teal-500 focus:ring-0 p-2"
						placeholder="Share something informative"
						bind:value={$description}
					></textarea>
				</div>
				<div class="mb-4">
					<input
						class="form-input-element"
						type="text"
						placeholder="Tags (comma-separated)"
						bind:value={$tags}
					/>
				</div>
				<div class="flex items-center border-t pt-2 border-gray-600/40 justify-between">
					<div>
						<input type="file" bind:this={fileInput} class="sr-only" on:change={handleFileChange} />
						<button on:click={triggerFileInput}>
							<span class="text-3xl cursor-pointer"><ImageIcon /></span>
						</button>
					</div>

					<button
						disabled={!validFields && $isSubmitting}
						type="submit"
						class={clsx(
							'bg-brand h-10  text-secondary font-semibold px-4 rounded-full border border-secondary'
						)}
					>
						{#if $isSubmitting}
							<span><LoadingSpinner /></span>
						{:else}
							Share Post
						{/if}
					</button>
				</div>
				<!-- {#if $showInvalidMessage}
				<p class="text-red-500 text-xs mb-2">
					Please fill out all fields correctly before submitting.
				</p>
			{/if} -->
			</form>
		{/if}
		{#if $PostType === 'Ask a Question'}
			<div class="flex flex-col h-full w-full">
				<div class="flex flex-col gap-4 p-4 glass-container bg-black font-poppins list-items">
					<div class="font-semibold font-Just_sans_medium text-secondary text-base">
						Best Practices to Get Quick and Accurate answers :
					</div>
					<ul>
						{#each questionTips as item}
							<li class="text-sm flex prose prose-invert gap-1 md:items-center text-gray-400 mb-2">
								<span class="font-semibold text-lg"><Dot /></span>
								{item.content}
							</li>
						{/each}
					</ul>
				</div>

				<form
					on:submit|preventDefault={handleQuestionSubmit}
					action=""
					class="form-element mt-4 items-end"
				>
					<div class="w-full h-full">
						<textarea
							placeholder="Start you question with 'Why', 'What' or 'When"
							class="form-input-element"
						></textarea>
					</div>

					<button
						disabled={!validFields}
						type="submit"
						class={clsx(
							'bg-brand h-10 text-secondary w-full md:w-auto font-semibold px-4 rounded-full border border-secondary'
						)}
					>
						Ask Question
					</button>
				</form>
			</div>
		{/if}
	</div>
{/if}

<style>
	.form-input-element {
		@apply border-0 w-full  border-b focus:border-b-2 bg-primary hover:border-teal-900 border-gray-400 focus:border-teal-900 focus:ring-0;
	}
	.form-element {
		@apply text-background h-full w-full md:justify-between flex flex-col px-4;
	}
</style>
