<script>
	// your script goes here
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import clsx from 'clsx';
	import { createEventDispatcher, onMount } from 'svelte';

	let isOpen = false;
	const dispatch = createEventDispatcher();

	const toggleOpen = () => {
		isOpen = !isOpen;
		handleOverflow();
	};

	const close = () => {
		isOpen = false;
		handleOverflow();
	};

	const openLoginModal = () => {
		dispatch('openLoginModal');
	};

	const handleOverflow = () => {
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('overflow-hidden', isOpen);
		}
	};

	onMount(() => {
		handleOverflow();
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	let showButton = false;

	// Event listener for scroll events
	const handleScroll = () => {
		showButton = window.scrollY > 50; // Adjust the scroll threshold as needed
	};
</script>

<header class="sticky  top-0 bg-white lg:h-22 h-20 z-50 lg:items-center p-1 lg:p-3 text-black">
	<nav
		class="mx-auto flex max-w-7xl flex-col justify-between py-2 md:py-0 font-medium lg:flex-row lg:items-center"
		aria-label="main"
	>
		<div class="flex items-center z-50 justify-between">
			<a class="mt-2  scale-75 transition-all duration-300 lg:scale-100 md:px-0 md:py-2 md:mt-0" href="/">
				<img src={logo} alt="Ndeal" />
			</a>
			<div class=" lg:hidden">
				<button aria-expanded={isOpen} type="button" class="button z-50" on:click={toggleOpen}>
					<span class={clsx('burger hidden  burger-3', isOpen ? 'is-closed' : '')}></span>
				</button>
			</div>
		</div>

		<!-- MobileNav -->
		<div
			class={clsx(
				'fixed items-end inset-0  z-40 flex  flex-col bg-white pr-4 pt-6 transition-transform duration-300 ease-in-out lg:hidden',
				isOpen ? ' animate-fadeIn' : 'translate-y-[-100%]'
			)}
		>
			<ul class="grid first:pt-12 justify-items-end gap-8">
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a on:click={close} href="/">who we are</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a on:click={close} href="/about">what we do</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
					<a on:click={close} href="/sverdle">how we do it</a>
				</li>
			</ul>
		</div>

		<!-- DesktopNav -->

		<ul class="hidden lg:flex mb-2 items-center gap-14">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a
					class="border border-transparent rounded-full inline-flex hover:ring-2 focus:bg-slate-200 ring-slate-500 px-4 py-2 focus:text-black hover:text-green-950 h-fit w-fit"
					on:click={close}
					href="/">who we are</a
				>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a
					class=" rounded-full inline-flex hover:ring-2 focus:bg-slate-200  ring-slate-500 px-4 py-2 focus:text-black hover:text-gray-800 h-fit w-fit"
					href="/about">what we do</a
				>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a
					class="border border-transparent rounded-full inline-flex hover:ring-2 focus:bg-slate-200 ring-slate-500 px-4 py-2 focus:text-black hover:text-gray-600 h-fit w-fit"
					href="/sverdle">how we do it</a
				>
			</li>
		</ul>
		<ButtonLink aria-current={$page.url.pathname.startsWith('/founder') ? 'page' : undefined} class="hidden mb-2 lg:flex" href="/founder">Become one of us</ButtonLink>
	</nav>
</header>

<style>
	.button {
		background: transparent;
		border: 0;
		width: 56px;
		height: 56px;
		display: grid;
		place-items: center;
		cursor: pointer;
		padding: 0;
		opacity: 0.6;
		scale: 0.7;
		border-radius: 8px;
		transition: 0.25s;
	}

	.button:hover {
		opacity: 1;
		background: transparent;
	}

	.burger {
		position: relative;
		width: 32px;
		border: 0;
	}

	.burger,
	.burger::before,
	.burger::after {
		display: block;
		border-radius: 2px;
		height: 4px;
		background: #000000;
		transition: 0.3s;
	}

	.burger::before,
	.burger::after {
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
	}

	.burger::before {
		top: -8px;
	}

	.burger::after {
		top: 8px;
	}

	.burger.burger-3::before,
	.burger.burger-3::after {
		transition-duration: 0.15s;
		transition-timing-function: linear;
	}

	.burger.burger-3.is-closed::before,
	.burger.burger-3.is-closed::after {
		width: 20px;
	}

	.burger.burger-3.is-closed::before {
		transform: rotate(-45deg) translate(-4px, -2px);
	}

	.burger.burger-3.is-closed::after {
		transform: rotate(45deg) translate(-4px, 2px);
	}
</style>
