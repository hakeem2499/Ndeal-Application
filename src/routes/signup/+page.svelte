<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import GoldText from '$lib/components/GoldText.svelte';
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	import ButtonDiv from '$lib/components/ReusableComponents/ButtonDiv.svelte';
	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { userType, type UserType } from '../../store/HomeStore.js';
	import Button from '$lib/components/ReusableComponents/Button.svelte';
	import Back from '~icons/ph/arrow-left-fill';
	import PopupShow from '$lib/components/ReusableComponents/PopupShow.svelte';
	export let data;
	
	let showSignupForm: boolean = false;
	let showPopup: boolean = false;
	console.log('🚀 ~ showSignupForm:', showSignupForm);
	function handleUserTypeButtonClick(usertype: any) {
		userType.set(usertype);
		showSignupForm = true;
		showPopup = true;
	}
	function closeUserTypeButtonClick() {
		showSignupForm = false;
		showPopup = false;
	}
</script>

<div class="lg:min-h-screen flex-col h-full lg:flex-row flex">
	<Bounded class="h-full bg-gradient-to-b max-md:from-secondary max-md:to-background  lg:bg-[#191719] lg:w-1/2">
		<PrismicImage class="h-fit w-full" field={data.signup.data.image} />
		<div class="space-y-4 py-4 h-full">
			<h1
				class="w-fit rounded-lg text-xl text-center text-balance text-pimary lg:text-secondary md:text-2xl lg:text-4xl max-w-6xl leading-1"
			>
				<PrismicText class="w-20 h-20" field={data.signup.data.heading} />
			</h1>

			<div
				class="prose prose-invert text-primary lg:text-secondary text-balance text-center text-base md:text-lg mt-4 max-w-4xl"
			>
				<PrismicText field={data.signup.data.subheading} />
			</div>
		</div>
	</Bounded>
	<div class="lg:w-1/2 flex relative flex-col items-center h-full gap-16 justify-center pt-16">
		{#if showSignupForm}
			<div class="hidden lg:flex">
				<Button
					className=" max-w-10 absolute left-4  top-0 md:left-20 hover:bg-transparent bg-transparent"
					onClick={closeUserTypeButtonClick}
				>
					<span class="text-primary text-3xl"><Back /></span>
				</Button>
				<div class="  my-auto p-4">
					<RegisterForm />
				</div>
			</div>
			<PopupShow bind:showPopup class="animate-S_fadeIn bg-secondary lg:hidden">
				<Button
					className=" max-w-10 absolute left-4  top-0 md:left-20 hover:bg-transparent bg-transparent"
					onClick={closeUserTypeButtonClick}
				>
					<span class="text-primary text-3xl"><Back /></span>
				</Button>
				<RegisterForm />
			</PopupShow>
		{:else}
			<div class="flex flex-col w-full gap-4 items-center">
				{#each data.signup.data.subsection as item}
					<h3 class="text-center text-2xl md:text-3xl text-balance">
						<PrismicText field={item.heading} />
					</h3>
					<p
						class="italic bg-gradient-to-b text-center from-yellow-900 to-orange-700 bg-clip-text text-xl text-transparent"
					>
						<PrismicText field={item.body} />
					</p>
				{/each}
			</div>
			<div class="text-xl text-center">
				<PrismicText field={data.signup.data.question} />
			</div>
			<div class="w-full">
				<div
					class="grid gap-8 md:grid-cols-3 md:gap-4 max-w-[90%] mx-auto justify-items-center w-fit"
				>
					{#each data.signup.data.buttons as item}
						<ButtonDiv onClick={() => handleUserTypeButtonClick(item.usertype)}>
							<div slot="Image">
								<PrismicImage
									class="h-fit  max-h-66 w-fit "
									field={item.image}
								/>
							</div>
							<div slot="header">
								<PrismicText field={item.header} />
							</div>
							
						</ButtonDiv>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
