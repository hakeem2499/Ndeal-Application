<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import clsx from 'clsx';
	import { openDropdown } from '../../../store/HomeStore'; // Import the shared store

	type Option = {
		value: string;
		label: string;
	};

	export let id: string; // Unique identifier for this select
	export let className: string | undefined = undefined;
	export let options: Option[] = [];
	export let selected: string = '';
	export let placeholder: string = 'Search...';

	let searchQuery: string = '';
	let selectedOptionLabel: string = '';
	let showSelect = false;

	const dispatch = createEventDispatcher<{ select: string }>();

	$: filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Handle opening and closing the dropdown
	function toggleDropdown() {
		openDropdown.update((current) => (current === id ? null : id)); // Toggle current dropdown
	}

	// Close dropdown if another one is opened
	$: openDropdown.subscribe((current) => {
		showSelect = current === id;
	});

	// Handle option selection
	function handleSelect(value: string) {
		selected = value;
		const selectedOption = options.find((option) => option.value === selected);
		if (selectedOption) {
			selectedOptionLabel = selectedOption.label;
		}
		openDropdown.set(null); // Close the dropdown after selection
		searchQuery = ''; // Clear the search query
		dispatch('select', selected);
	}

	// Handle input change
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchQuery = target.value;
		selectedOptionLabel = ''; // Reset label when user types
	}
</script>

<div class="relative flex h-20 justify-center" role="combobox" aria-expanded={showSelect}>
	<!-- Input Field -->
	<input
		type="text"
		value={selectedOptionLabel || searchQuery}
		class="peer mt-2 w-full rounded-e-xl md:rounded-e-full border-0 focus-within:bg-transparent focus:bg-transparent border-b focus:border-b-2 bg-transparent border-gray-400 focus:border-gray-200 focus:ring-0 p-2"
		{placeholder}
		aria-label="Search options"
		on:focus={toggleDropdown}
		on:input={handleInput}
	/>

	<!-- Select Dropdown -->
	{#if showSelect}
		<div
			class={clsx(
				'absolute top-full right-0 z-40 w-full max-w-md bg-white rounded-md py-3 shadow-lg transition-all duration-300',
				className
			)}
		>
			{#if filteredOptions.length > 0}
				<ul class="w-full bg-transparent outline-none ring-0 border-none max-h-48 overflow-y-auto">
					{#each filteredOptions as option}
						<li
							class="p-2 hover:bg-gray-100 cursor-pointer"
							on:click={() => handleSelect(option.value)}
						>
							{option.label}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="p-2 text-gray-500 text-sm text-center">No options found</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.search-input {
		transition: border-color 0.2s ease-in-out;
	}

	ul {
		scrollbar-width: none;
	}

	ul::-webkit-scrollbar {
		display: none;
	}
</style>