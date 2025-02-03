<script lang="ts">
	export let tag: string = 'button';
    export let onClick: () => void = () => {}; // Event handler type
</script>

<svelte:element
	role="button"
	tabindex="0"
	this={tag}
    on:click={onClick}
	{...$$restProps}
	class="flex flex-col  aspect-square min-h-40 lg:min-h-52 border border-secondary hover:border-accent  font-Just_sans_medium  hover:bg-black bg-primary grid-rows-subgrid   max-w-sm md:gap-4 group hover:shadow-2xl  hover:scale-[1.015] transition-all duration-300"
>
	
	<div class="lg:max-w-40 h-fit w-auto p-4 pt-0 rounded-xl md:rounded-l-none md:rounded-t-none bg-white bg-cover bg-center shadow-md">
		<slot name="Image">
			<img
				class="h-full  w-full rounded-lg object-cover"
				
				alt="Button "
			/>
		</slot>
	</div>
	<div
		class=" p-2  gap-2 "
	>
		<span
			class=" text-sm font-poppins md:text-base text-background font-semibold"
			><slot name="header"></slot></span
		>
		
	</div>
</svelte:element>
