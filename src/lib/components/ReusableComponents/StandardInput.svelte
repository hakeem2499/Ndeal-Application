<script lang="ts">
	import type { InputType } from '../../../store/HomeStore';

	export let type: InputType;
	export let label: string = ''; // Label for the input field
	export let value: string = ''; // Value bound to input
	export let placeholder: string = ''; // Placeholder text for the input
	export let errorMessage: string = ''; // Error message to show below the input
	export let required: boolean = false; // Whether the input is required
	export let validator: (val: string) => boolean = (val) => true; // Custom validator function

	let isValid: boolean = true; // Track if the input is valid
	let inputValue: string = value;
	let showPassword: boolean = false; // Toggle for password visibility
	let isFocused: boolean = false; // Track if the input is focused

	// Revalidate when the input value changes
	$: {
		validateInput();
		value = inputValue; // Emit value change to parent
	}

	// Validate the input value
	function validateInput() {
		isValid = validator(inputValue);
		if (required && !inputValue.trim()) {
			isValid = false;
			switch (type) {
				case 'email':
					errorMessage = `Enter a  valid ${label} .`;
					break;
				case 'text':
					errorMessage = `${label} is required.`;
					break;
				case 'password':
					errorMessage = `${label} must be at least 8 characters long and must contain letters, numbers, and special characters.`;
					break;
				default:
					errorMessage = `${label} is required.`;
					break;
			}
		}
	}

	// Handle input changes
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
	}

	// Toggle password visibility
	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	// Determine input type for password field
	$: passwordInputType = showPassword ? 'text' : 'password';
</script>

<div class="flex flex-col w-full h-16">
	<div class="form-group">
		<div class="input-container  {isFocused || inputValue ? 'focused' : ''}">
			{#if label}
				<label for={label} class="input-label">{label}</label>
			{/if}
			{#if type === 'password'}
				<div class="relative">
					<input
						id={label}
						type="password"
						{placeholder}
						bind:value={inputValue}
						on:input={handleInput}
						on:focus={() => (isFocused = true)}
						on:blur={() => (isFocused = false)}
						class="input-group {isValid ? '' : 'input-error'}"
						{required}
					/>
					<button type="button" on:click={togglePasswordVisibility} class="toggle-password">
						{#if showPassword}
							<span>🙈</span> <!-- Icon for hidden password -->
						{:else}
							<span>👁️</span> <!-- Icon for visible password -->
						{/if}
					</button>
				</div>
			{:else if type === 'email'}
				<input
					id={label}
					type="email"
					{placeholder}
					bind:value={inputValue}
					on:input={handleInput}
					on:focus={() => (isFocused = true)}
					on:blur={() => (isFocused = false)}
					class="input-group {isValid ? '' : 'input-error'}"
					{required}
				/>
			{:else}
				<input
					id={label}
					type="text"
					{placeholder}
					bind:value={inputValue}
					on:input={handleInput}
					on:focus={() => (isFocused = true)}
					on:blur={() => (isFocused = false)}
					class="input-group {isValid ? '' : 'input-error'}"
					{required}
				/>
			{/if}
		</div>
	</div>
	{#if !isValid && errorMessage}
		<p class="error-message {isFocused ? 'opacity-100' : 'opacity-0'}">{errorMessage}</p>
	{/if}
</div>

<style>
	.form-group {
		margin-bottom: 5px;
		width: 100%;
		position: relative;
	}

	.input-container {
		position: relative;
	}

	.input-label {
		position: absolute;
		top: 50%;
		left: 12px;
		transform: translateY(-50%);
		font-size: 14px;
		color: var(--color-primary);
		background: transparent;
		padding: 0 4px;
		transition: all 0.2s ease;
		pointer-events: none;
	}

	.input-container.focused .input-label,
	.input-container:has(input:not(:placeholder-shown)) .input-label {
		top: 0;
		font-size: 12px;
		color: var(--color-primary);
		transform: translateY(0);
	}

	.input-group {
		width: 100%;
		padding: 12px;
		border: 1px solid var(--color-primary);
		border-radius: 4px;
		font-size: 14px;
		color:var(--color-primary);
	}

	.input-group.input-error {
		border-color: #020617;
	}
	.input-group.input-error:focus {
		border-color: var(--color-accent);
	}

	.toggle-password {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		font-size: 20px;
		color: #666;
	}

	.toggle-password:hover {
		color: #007bff;
	}

	.error-message {
		font-size: 12px;
		color: #e74c3c;
		
	}
</style>
