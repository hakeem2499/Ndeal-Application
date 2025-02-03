<script>
	export let title = 'Cookies Notice';
	export let toastId;
	import { toast } from '@zerodevx/svelte-toast'; // Ensure you import toast from the correct library if used
	import Bounded from './Bounded.svelte';
	import Button from './ReusableComponents/Button.svelte';
	import { consentStatus, sendCookieConsent } from '../../store/HomeStore';

	const acceptCookies = () => {
		sendCookieConsent('accepted');
		console.log('Cookies accepted');
		toast.pop(toastId); // Dismiss the toast
	};
	const rejectCookies = () => {
		sendCookieConsent('rejected');
		console.log('Cookies accepted');
		toast.pop(toastId); // Dismiss the toast
	};

	const customizeCookies = () => {
		sendCookieConsent('customized');
		console.log('Navigating to cookie settings...');
		toast.pop(toastId); // Dismiss the toast
	};
</script>

{#if $consentStatus === 'none'}
	<div
		class="max-w-full p-4 flex bg-background glass-container text-primary text-base flex-col items-center rounded-md"
	>
		<div>{title}</div>
		<div class="flex flex-col gap-2 md:gap-8 items-center justify-center w-full">
			<p class="prose prose-lg text-center text-sm md:text-base">
				We use cookies to enhance your experience, analyze site usage, and ensure optimal
				functionality. By continuing, you consent to our cookie policy.
			</p>
			<div class="md:w-full max-w-[80dvw] mx-auto justify-center flex gap-10">
				<Button
					className="md:px-8 p-2 w-fit border border-slate-500  transition-colors duration-300 hover:bg-accent hover:border-primary md:max-w-60"
					onClick={acceptCookies}>Accept</Button
				>
				<Button className="md:px-8  w-fit md:max-w-60  hover:bg-secondary " onClick={rejectCookies}
					>Reject</Button
				>
				<Button
					className="md:px-8 p-2 w-fit md:max-w-60 border-b border-primary  hover:bg-secondary "
					onClick={customizeCookies}>Customize</Button
				>
			</div>
		</div>
	</div>
{/if}
