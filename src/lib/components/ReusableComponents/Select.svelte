<!-- SelectFilter.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Define a type for the options
   type Option = {
    value: string;
    label: string;
  };

  // Props
  export let options: Option[] = []; // Array of Option objects
  export let selected: string = ''; // Selected option's value
  export let placeholder: string = 'Search...'; // Placeholder for the search input

  let searchQuery: string = ''; // The query used for filtering
  let showSelect: boolean = false; // Whether to show the select dropdown
  let selectedOptionLabel: string = ''; // To track the label of the selected option

  // Dispatch event to notify parent of the selected value
  const dispatch = createEventDispatcher<{ select: string }>();

  // Filter options based on the search query
  $: filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selection of an option
  function handleSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    selected = target.value;

    // Find the selected option and set the corresponding label
    const selectedOption = options.find(option => option.value === selected);
    if (selectedOption) {
      selectedOptionLabel = selectedOption.label;
      searchQuery = ''; // Clear the search query after selection
    }

    // Hide the select element after an option is selected
    showSelect = false;
    dispatch('select', selected);
  }

  // Show the select dropdown when the input is focused
  function handleFocus() {
    showSelect = true;
    searchQuery = ''; // Clear the search query when focusing
  }

  // When typing in the input field, use `searchQuery` for filtering
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    selectedOptionLabel = ''; // Clear the selected option label when user types
  }
</script>

<div>
  <!-- Input for filtering options or displaying selected label -->
  <input
    type="text"
    value={selectedOptionLabel || searchQuery} 
    class="peer mt-2 w-full border-b-2 border-r-background border-l-background border-t-background bg-background rounded-sm hover:border-b-black px-2 py-3 focus:border-none focus:outline-none"
    {placeholder}
    on:focus={handleFocus}
    on:input={handleInput}
  />

  <!-- Select element, only shown when the input is focused or query is changing -->
  {#if showSelect}
    <select
      class="mt-2 w-full bg-transparent border-t border-gray-300 rounded-sm px-2 py-3 focus:outline-none"
      on:change={handleSelect}
      bind:value={selected}
      size={Math.min(filteredOptions.length, 5)}
    >
      <option disabled selected value="">-- Select an industry --</option>
      {#each filteredOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {/if}
</div>

<style>
  .search-input {
    transition: border-color 0.2s ease-in-out;
  }

  select {
    max-height: 200px;
    overflow-y: auto;
  }
</style>
