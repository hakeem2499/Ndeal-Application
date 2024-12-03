<script lang="ts">
	export let tag: string = 'button';
    export let onClick: () => void = () => {}; // Event handler type
</script>

<svelte:element
	this={tag}
    on:click={onClick}
	{...$$restProps}
	class="row-span-3 grid font-Just_sans_medium rounded-t-xl hover:bg-black bg-primary grid-rows-subgrid hover:ring ring-slate-900 max-w-sm gap-4 group hover:shadow-2xl  hover:scale-105 transition-all duration-300"
>
	
	<div class="h-40 w-auto rounded-xl bg-slate-300 bg-cover bg-center shadow-md">
		<slot name="Image">
			<img
				class="h-full w-full rounded-lg object-cover"
				src="https://via.placeholder.com/640x480"
				alt="Button "
			/>
		</slot>
	</div>
	<div
		class="-mt-8 w-[10/12]  md:p-2 flex flex-col  items-center gap-2 overflow-hidden rounded-sm border-2 border-transparent  bg-primary shadow-lg transition-colors group-hover:bg-black"
	>
		<span
			class=" text-center text-xs md:text-sm  font-semibold text-slate-100 transition-colors group-hover:text-slate-50"
			><slot name="header"></slot></span
		>
		<span class=" md:text-sm max-w-md w-fit text-xs text-slate-100 p-2 transition-colors group-hover:text-slate-200"
			><slot name="body"></slot></span
		>
	</div>
</svelte:element>
