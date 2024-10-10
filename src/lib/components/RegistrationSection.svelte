<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import Bounded from './Bounded.svelte';
    import RegisterForm from './RegisterForm.svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import FormSubmitted from './FormSubmitted.svelte';
    import Button from './ReusableComponents/Button.svelte';

    let showModal = false;

    const handleOpenFormSubmittedModal = () => {
        showModal = true;
    };

    onMount(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

<div class="my-10 md:my-20">
    <!-- <h2 class="showcase__heading text-balance text-center text-5xl font-medium md:text-7xl">
        Make An Impact
    </h2>
     -->
    <FormSubmitted bind:showModal />
    <div class=" border border-primary flex lg:mr-0 mx-auto gap-4 justify-end flex-col items-start   max-w-md w-[80dvw] md:w-[600px]    rounded-[5px] h-fit shadow-xl">
        <RegisterForm on:openFormSubmittedModal={handleOpenFormSubmittedModal} />
    </div>
</div>
