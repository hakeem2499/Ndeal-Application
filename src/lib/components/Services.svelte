<script>
	import { writable } from 'svelte/store';
	import Bounded from './Bounded.svelte';
	import ButtonLink from './ButtonLink.svelte';
    import Image from '$lib/images/heroimage.webp';
    import Icon from '~icons/ph/hourglass-high-bold'

	const serviceType = writable('Hiring'); //Hiring, payroll, compliance or whateer
	serviceType.subscribe((value) => {
		console.log('🚀 ~ value:', value);
		return value;
	});
</script>

<Bounded class="relative bg-accent">
	<div class="flex max-w-md flex-col">
		<div class="flex justify-center">
			<div class="rounded-[5px] border border-slate-950 ">
				<div class="flex    text-xs lg:text-lg font-semibold leading-5">
					<button
						on:click={() => serviceType.set('Hiring')}
						class="w-auto rounded-[5px] focus:text-white transition-all duration-500 focus-within:bg-green-900 hover:text-gray-700  md:px-8   lg:px-16 lg:py-4 px-1 py-1 text-black focus:outline-none"
						class:text-white={$serviceType === 'Hiring'}
						class:bg-green-900={$serviceType === 'Hiring'}
						>Hiring
					</button>
					<button
						on:click={() => serviceType.set('Training')}
						class="rounded-[5px] px-2 focus:text-white py-1 transition-all duration-500 focus-within:bg-green-900 text-black  md:px-8  lg:px-16 focus:outline-none"
						class:bg-green-900={$serviceType === 'Training'}
						class:text-white={$serviceType === 'Training'}
						>Training
					</button>
					<button
						on:click={() => serviceType.set('Compliance')}
						class="rounded-[5px] px-2 focus:text-white py-1 transition-all duration-500 focus-within:bg-green-900  md:px-8  text-black lg:px-16 focus:outline-none"
						class:bg-green-900={$serviceType === 'Compliance'}
						class:text-white={$serviceType === 'Compliance'}
						>Compliance
					</button>
					<button
						on:click={() => serviceType.set('Payroll')}
						class="rounded-[5px] px-2 focus:text-white py-1 transition-all duration-500 focus-within:bg-green-900 md:px-8  text-black lg:px-16 focus:outline-none"
						class:bg-green-900={$serviceType === 'Payroll'}
						class:text-white={$serviceType === 'Payroll'}
						>Payroll
					</button>
					<button
						on:click={() => serviceType.set('Software')}
						class="rounded-[5px] px-2 focus:text-white py-1 transition-all duration-500 focus-within:bg-green-900 md:px-8  text-black lg:px-16 focus:outline-none"
						class:bg-green-900={$serviceType === 'Software'}
						class:text-white={$serviceType === 'Software'}
						>Software
					</button>
				</div>
			</div>
		</div>
	</div>

	{#if $serviceType === 'Hiring'}
		<div
			class="relative mt-16 grid items-center gap-8 rounded-xl border  border-violet-600/20 bg-gradient-to-br  from-gray-400/15 to-bg-primary/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12"
		>
        

			<div>
				<div class="w-fit rounded-lg bg-violet-800 p-4 text-3xl">
					<Icon />
				</div>

				<h3 class="mt-6 text-2xl font-normal">How are you</h3>

				<div class="prose prose-invert text-inherit mt-4 max-w-xl">
					<p>This setup provides a dynamic, multi-step signup form where users can choose to sign up as a worker or a company. Each form has two steps to collect the necessary information. TailwindCSS is used for styling, and Svelte's reactivity system manages the form state.</p>
				</div>

				<ButtonLink iconCheck={true}  class="mt-6">Learn More</ButtonLink>
			</div>

			<img
				src={Image}
				class="shadow-2xl lg:col-span-2 lg:pt-0  lg:-order-1 lg:translate-x-[-15%]"
				alt=""
			/>
		</div>
	{/if}
</Bounded>
