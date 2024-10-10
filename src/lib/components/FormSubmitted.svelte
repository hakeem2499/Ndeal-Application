<script>
	import { isError } from '$lib/validation';
	import { onMount } from 'svelte';
	import Button from './ReusableComponents/Button.svelte';

	export let showModal = false;
	const closeShowModal = () => {
		showModal = false;
		console.log("🚀 ~ closeShowModal ~ showModal:", showModal)
	};

    onMount(()=> {
        console.log("mounting")
    });
</script>

{#if showModal}
    <div class="modal-overlay" on:click={closeShowModal}>
        <!-- Modal Content -->
        <div class="modal-content w-[90%] md:w-[25%] bg-[#c6c9d1] transition-opacity duration-300" on:click|stopPropagation>
            <div id="player " class="flex rounded-lg items-center justif-center bg-slate-900  text-white" style="width: 100%; height: 100%;">
                {#if $isError['login-successful']}
                    <p class="error p-4 text-green-700 text-balance ">{$isError['login-successful']}</p>
                {/if}
                {#if $isError['user-exists']}
                    <p class="error p-4 text-orange-700">{$isError['user-exists']}</p>
                {/if}
                
                {#if $isError['general-error']}
                    <p class="error px-4 text-red-700">{$isError['general-error']}</p>
                {/if}
                {#if $isError['network-error']}
                    <p class="error text-red-700">{$isError['network-error']}</p>
                {/if}
            </div>
            <button class="close-button hover:text-white hover:bg-slate-900 text-accent" on:click={closeShowModal}>X</button>
        </div>
    </div>
{/if}

<style>
	/* Modal overlay */
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

	/* Modal content */
	.modal-content {
		position: relative;
		padding: 20px;
		border-radius: 8px;
		max-width: 720px;
		height: 300px;
	}


	.close-button {
		position: absolute;
		top: 20px;
		right: 20px;
		background-color: transparent;
		
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		cursor: pointer;
	}

	.close-button:hover {
		background-color: var(--color-primary);
	}

    .error{
        @apply text-2xl  mx-auto text-center ;
    }
</style>
