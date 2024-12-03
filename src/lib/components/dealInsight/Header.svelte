<script lang="ts">
	import Arrow from '~icons/ph/caret-down-bold';
	import Logo from './Logo.svelte';
	import Home from './Home.svelte';
	import Following from './Following.svelte';
	import Join from './Join.svelte';
	import Topics from './Topics.svelte';
	import Notification from './Notification.svelte';
	import Post from '~icons/ph/note-pencil-fill';
	import Ask from '~icons/ph/question-mark-fill';
	import { createEventDispatcher } from 'svelte';

	let isDropdown = false;

	const dispatch = createEventDispatcher();

    const openPostModal = () => {
		dispatch('openPostModal');
	};
    const openPostModalQuestion = () => {
		dispatch('openPostModalQuestion');
	};

	function handleDropdown(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		isDropdown = !isDropdown;
	}
</script>

<header class="sticky  w-full md:h-20 top-0 bg-primary md:items-center">
	<nav
		class="mx-auto flex-col md:flex-row flex max-w-6xl justify-between py-0 md:py-4 font-medium items-center"
	>
		<div class="flex justify-between p-2 px-4 md:p-0 md:px-0 items-center w-full md:w-fit">
			<button on:click={openPostModal} class="md:hidden"><span class="text-accent "><Post /></span></button>
			<a class=" hover:opacity-80" href="/dealInsight">
				<Logo />
			</a>
			<button on:click={openPostModalQuestion} class="md:hidden"><span class="text-accent"><Ask /></span></button>
		</div>
		<div class="flex w-full mx-auto lg:gap-10 justify-between  lg:justify-center items-center">
			<a href="/dealInsight" class="p-2"><Home /></a>
			<a href="/" class="p-2"><Following /></a>
			<a href="/" class="p-2"><Join /></a>
			<a href="/" class="p-2"><Topics /></a>
			<a href="/" class="p-2"><Notification /></a>
			<div class=" hidden md:flex w-fit gap-1">
				<button class="h-10 md:text-xs lg:text-base px-4 rounded-s-full bg-secondary"
					>Share <span class="font-semibold italic text-[#00592e]">Insights</span> on Topics</button
				>
				<button
					on:click={handleDropdown}
					class="p-2 px-4 rounded-e-full relative hover:bg-orange-700 focus:bg-orange-700 bg-secondary"
					><Arrow />
					{#if isDropdown}
						<div
							class="rounded-md animate-flipInY right-0 min-w-44 -bottom-24 flex flex-col gap-4 text-background max-w-lg bg-primary px-6 py-2 absolute"
						>
							<button on:click={openPostModal} class="inline-flex items-center gap-2"
								><span class="text-xl text-accent"><Post /></span>Create Feed</button
							>
							<button on:click={openPostModalQuestion} class="inline-flex items-center gap-2"
								><span class="text-xl text-accent"><Ask /></span>Ask</button
							>
						</div>
					{/if}
				</button>
			</div>
		</div>
	</nav>
</header>
