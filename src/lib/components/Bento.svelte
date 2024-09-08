<script>
	import webp from '$lib/images/svelte-welcome.webp';
	import Bounded from './Bounded.svelte';
</script>

<Bounded>
	<div>
		<h4 class="mx-auto mt-6 max-w-md text-balance text-center">What is your name</h4>
	</div>

	<div class="mt-16 grid max-w-6xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
		<div
			class="glass-container p-4 row-span-3 grid grid-rows-subgrid gap-4 rounded-[5px] bg-gray-950/60 before:bg-gray-100/10 md:col-span-1"
		>
			<h3 class="text-2xl">What is your name</h3>
			<div class="max-w-md text-balance text-black">
				<p>What is your name</p>
			</div>
			<div class="max-h-36 w-auto">
				<img src={webp} alt="" />
			</div>
		</div>
		<div
			class="glass-container p-4 row-span-3 grid grid-rows-subgrid gap4 rounded-lg bg-gray-950/60 before:bg-gray-100/10 md:col-span-2"
		>
			<h3 class="text-2xl">What is your name</h3>
			<div class="max-w-md text-balance text-black">
				<p>What is your name</p>
			</div>
			<div class="max-h-36 w-auto">
				<img src={webp} alt="" />
			</div>
		</div>

		<div
			class="glass-container p-4 row-span-3 grid grid-rows-subgrid gap4 rounded-lg bg-gray-950/60 before:bg-gray-100/10 md:col-span-2"
		>
			<h3 class="text-2xl">What is your name</h3>
			<div class="max-w-md text-balance text-black">
				<p>What is your name</p>
			</div>
			<div class="max-h-36 w-auto">
				<img src={webp} alt="" />
			</div>
		</div>
		<div
			class="glass-container p-4 row-span-3 grid grid-rows-subgrid gap4 rounded-lg bg-gray-950/60 before:bg-gray-100/10 md:col-span-1"
		>
			<h3 class="text-2xl">What is your name</h3>
			<div class="max-w-md text-balance text-black">
				<p>What is your name</p>
			</div>
			<div class="max-h-36 w-auto">
				<img src={webp} alt="" />
			</div>
		</div>
	</div>

	<div class="mt-4 md:mt-8 flex flex-col max-w-4xl rounded-[5px]  p-10 bg-slate-400">
		<h4>
			Look for separation of concerns, single responsibility principle, and proper use of design
			patterns.
		</h4>
	</div>
</Bounded>
