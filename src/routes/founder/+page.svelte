<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { PageData } from './$types';
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	export let data: PageData;
</script>

<div class="bg-image  md:justify-between lg:justify-start justify-center flex flex-col md:flex-row" style="background-image: url('/src/lib/images/nnnoise.svg');">
	<div class="flex  flex-col">
		<Bounded class="flex flex-col w-full md:w-[25dvw] bg-['url('/src/lib/images/nnnoise.svg')']  h-full relative text-white min-h-[50dvh] md:flex-1 md:bg-primary" >
			<h2>what is your name</h2>
			<p>how old are you</p>
			<div
				class="lg:w-[480px] md:hidden max-w-[480px] w-full md:w-[50dvw] p-2 glass-container bg-background rounded-[5px] h-fit"
			>
				<RegisterForm />
			</div>
		</Bounded>
		
	</div>
	<div>
		<Bounded class=" hidden md:flex   lg:translate-x-[50%] lg:top-[50%]   lg:left-[50%] ">
			<h1 class="text-center">Sign In as a Contractor</h1>
			<div
				class="lg:w-[480px] max-w-[480px] w-full md:w-[50dvw] p-2  bg-background rounded-[5px] h-fit" 
			>
				<RegisterForm />
			</div>
			<div>
				<h1 class="h2">this is a review</h1>
			</div>
		</Bounded>
	</div>
</div>
