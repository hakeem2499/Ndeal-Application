<!-- <script lang="ts">
	import { onMount } from 'svelte';

	let player: YT.Player | undefined;
	let videoId: string = 'dQw4w9WgXcQ'; // Replace with your YouTube video ID
	let showModal: boolean = false; // State to control modal visibility

	// Function to load the YouTube API
	function loadYouTubeAPI(): Promise<void> {
		return new Promise((resolve) => {
			if (window.YT) {
				resolve();
			} else {
				const tag = document.createElement('script');
				tag.src = 'https://www.youtube.com/iframe_api';
				const firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

				window.onYouTubeIframeAPIReady = () => resolve();
			}
		});
	}

	// Function to initialize the player
	async function initPlayer(): Promise<void> {
		await loadYouTubeAPI();
		player = new YT.Player('player', {
			videoId,
			events: {
				onReady: onPlayerReady
			}
		});
	}

	// Function to handle player ready event
	function onPlayerReady(event: YT.PlayerEvent): void {
		console.log('Player is ready');
	}

	// Function to play the video
	function playVideo(): void {
		if (player) {
			player.playVideo();
		}
	}

	// Show the modal and initialize the player
	function openModal() {
		showModal = true;
		initPlayer();
	}

	// Close the modal and stop the video
	function closeModal() {
		showModal = false;
		if (player) {
			player.stopVideo();
		}
	}

	// Initialize the player when the component is mounted
	onMount((): void => {
		// Player initialization will happen when the modal opens
	});
</script>

<div>
	<!-- Play Button -->
	<!-- <button
		class="button p-4 border-2  border-primary rounded-[5px] text-primary hover:text-white  text-lg md:text-xl "
		on:click={openModal}
		><span></span>
		Watch a video
		<span></span>
	</button>
</div>

{#if showModal}
	<!-- Modal Overlay -->
	<!-- <div class="modal-overlay" on:click={closeModal}>
		<!-- Modal Content -->
		<!-- <div class="modal-content" on:click|stopPropagation>
			<div id="player" style="width: 100%; height: 100%;"></div>
			<button class="close-button" on:click={closeModal}>Close</button>
		</div>
	</div> --> -->
<!-- {/if} -->

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
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		width: 80%;
		max-width: 720px;
		height: 400px;
	}

	/* Close button */
	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: var(--color-primary);
		color: white;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		cursor: pointer;
	}

	.close-button:hover {
		background-color: var(--color-primary);
	}

	
</style>
