<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import CookieComponent from '$lib/components/CookieComponent.svelte'; // Import CookieComponent
	import Bounded from '$lib/components/Bounded.svelte'; // Import Loading Spinner
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices/index.js';
	import { writable } from 'svelte/store';
	import { consentStatus, hasAcceptedCookies } from '../../store/HomeStore.js';
	import SliderLogo from '$lib/components/SliderLogo.svelte';

	export let data;

	// Loading state to show a spinner

	const hasUserConsented = () => {
		const consentStatus = localStorage.getItem('cookieConsentStatus');
		return consentStatus && consentStatus !== 'none'; // If the user has given consent (accepted, rejected, or customized)
	};

	// Check localStorage for the user's cookie consent on page load
	onMount(async () => {
		// Call this function when the page loads to decide whether to show the banner
		if (!hasUserConsented()) {
			// Show the cookie consent banner if consent has not been given
			showCookieToast();
		} else {
			// Optionally, you can do something based on the existing consent (e.g., adjust UI)
			console.log('Consent already given:', localStorage.getItem('cookieConsentStatus'));
		}
	});

	// Function to show the CookieComponent via toast
	const showCookieToast = () => {
		toast.push({
			component: {
				src: CookieComponent,
				props: {
					title: 'Cookie Consent' // Title for the Cookie Notie
				},

				sendIdTo: 'toastId'
			},
			dismissable: false, // Prevent the toast from being dismissed manually
			initial: 0, // Initial opacity (start invisible)
			theme: {
				'--toastPadding': '0',
				'--toastMsgPadding': '0',
				'--toastContainerBottom': '8rem', // Position the toast at the bottom
				'--toastContainerLeft': 'calc(50vw - 8rem)' // Position it horizontally at center
			}
		});
	};
</script>

<svelte:head>
    <title>Ndeal | Leading HR Solutions and Automation in Nigeria and Globally</title>
    <meta name="description" content="Ndeal revolutionizes HR with advanced recruitment, talent management, and workforce solutions tailored for Nigeria and international markets. Boost your business with our innovative HR strategies." />
    <meta name="keywords" content="HR solutions, recruitment, talent management, workforce solutions, human resources, Nigeria HR, global HR platform, HR automation, employee engagement" />
    <meta name="author" content="Ndeal" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.ndeal.org/" />
    <meta property="og:title" content="Ndeal | Leading HR Solutions in Nigeria and Globally" />
    <meta property="og:description" content="Discover how Ndeal is transforming HR with smart solutions for recruitment, talent management, and more in Nigeria and worldwide." />
    <meta property="og:image" content="https://www.ndeal.org/images/ndeal-og-image.jpg" /> <!-- Add or replace with your actual image URL -->
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Ndeal_org" /> 
    <meta name="twitter:title" content="Ndeal | Leading HR Solutions in Nigeria and Globally" />
    <meta name="twitter:description" content="Ndeal offers cutting-edge HR services, from recruitment to talent retention, tailored for businesses in Nigeria and beyond." />
    <meta name="twitter:image" content="https://www.ndeal.org/images/ndeal-twitter-image.jpg" /> <!-- Add or replace with your actual image URL -->
    
    <!-- Additional SEO enhancements -->
    <link rel="canonical" href="https://www.ndeal.org/" />
    <meta name="robots" content="index, follow" />
</svelte:head>


<SliceZone slices={data.slices} {components} />
