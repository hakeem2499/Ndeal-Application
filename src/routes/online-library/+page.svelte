<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import OnlineLogo from '$lib/images/onlinelib.jpg';
	import Book from '~icons/ph/book-light';
	import BookOpen from '~icons/ph/book-open-light';
	import Search from '~icons/ph/magnifying-glass';
	import Arrows from '~icons/ph/arrows-left-right-fill';
	import Account from '~icons/material-symbols-light/account-balance-rounded';
	import Play from '~icons/material-symbols-light/play-arrow';
	import StandardInput from '$lib/components/ReusableComponents/StandardInput.svelte';
	import Contact from '$lib/components/ReusableComponents/Contact.svelte';
</script>

<div class="flex items-center p-2 md:p-8 justify-between">
	<img class="h-16 w-16" src={OnlineLogo} alt="" />
	<div class="flex items-center md:gap-12 gap-6">
		<span class="text-2xl text-primary">
			<BookOpen />
		</span>
		<span class="text-2xl text-primary">
			<Book />
		</span>
		<span class="text-2xl text-primary">
			<Account />
		</span>
		<span class="text-2xl text-primary">
			<Arrows />
		</span>

		<span class="text-2xl text-primary">
			<Search />
		</span>
	</div>
</div>
<div class="flex p-2 bg-gray-300 w-full items-center justify-center gap-4">
	<span class="text-2xl"><Play /></span>
	<div class="w-[80%] h-3 bg-primary"></div>
	<span class="text-sm text-blue-400">00:00</span>
</div>
<Bounded>
	<div class="max-w-60 flex justify-center ml-0 mx-auto flex-col">
		<h1 class="font-poppins text-lg font-semibold text-gray-600">CHAPTER 20</h1>
		<h2 class="text-primary w-full text-4xl">"Showing our Appreciation for the Gifts in Men"</h2>
	</div>
	<p class="py-2 text-lg">
		Jesus has lovingly assigned “gifts in men” to build up the congregation and strengthen its
		spiritual foundation. (Eph. 4:12) While these individuals—ministerial servants, elders, and
		circuit overseers—carry out significant responsibilities, the rest of us can actively support
		their efforts in various ways. For example, during the construction of a Kingdom Hall, some may
		contribute directly by assisting with the building work, while others support by providing
		meals, transportation, or other essential services. Similarly, we can express our gratitude for
		the tireless work of those taking the lead in the congregation. Beyond words of encouragement,
		we can show appreciation through practical acts of kindness, such as providing <span
			class="font-bold">financial assistance</span
		>
		to help them fulfill their assignments,supporting them
		<span class="font-bold">financially</span> when they assist us personally with something we need,
		offering our time to assist with tasks, or praying for their continued strength and guidance. By
		doing so, we not only support their efforts but also honor Jesus, the one who gave us these invaluable
		“gifts in men.”
	</p>
	<div class="bg-slate-950 px-2 md:px-6 rounded-md py-8">
		
		<Contact />
	</div>
</Bounded>
