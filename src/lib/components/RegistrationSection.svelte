<script>
	import { onMount } from "svelte";
	import Bounded from "./Bounded.svelte";
	import RegisterForm from "./RegisterForm.svelte";
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce').matches;

		if (prefersReducedMotion) return;

		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			'.showcase__heading',
			{
				y: 70
			},
			{
				y: 0,
				ease: 'power2.inOut',
				duration: 1,
				scrollTrigger: {
					trigger: '.showcase__heading',
					start: 'top bottom-=40%',
					toggleActions: 'play pause resume reverse'
				}
			}
		);
    });
</script>


<Bounded class="bg-accent">

    <h2 class="showcase__heading text-balance text-center text-5xl font-medium md:text-7xl">
        Make An Impact 
    </h2>
	<div
		class="md:w-[500px]  max-w-[500px] w-full  p-2 glass-container bg-background rounded-[5px] h-fit shadow-xl"
	>
		<RegisterForm />
	</div>
</Bounded>