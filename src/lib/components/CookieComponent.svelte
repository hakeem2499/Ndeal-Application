<script>
    export let title = 'Cookies Notice';
    export let toastId;
    import { toast } from '@zerodevx/svelte-toast'; // Ensure you import toast from the correct library if used
	import Bounded from './Bounded.svelte';
	import Button from './ReusableComponents/Button.svelte';
  
    const acceptCookies = () => {
      // Handle cookie acceptance logic
      console.log('Cookies accepted');
      toast.pop(toastId); // Dismiss the toast
    };
  
    const customizeCookies = () => {
      // Navigate to cookie customization settings
      console.log('Navigating to cookie settings...');
      toast.pop(toastId); // Dismiss the toast
    };
  </script>


<div class="w-full   p-4 flex  bg-slate-200 glass-container text-primary text-base flex-col items-center  rounded-md">
    <div>{title}</div>
    <div class="flex flex-col gap-2 md:gap-8 items-center  justify-center w-full">
        <p class="prose prose-lg text-center text-sm md:text-base ">
            We use cookies to enhance your experience, analyze site usage, and ensure optimal functionality. By continuing, you consent to our cookie policy.
        </p>
        <div class="w-full mx-auto justify-center flex gap-10">
            <Button className="px-8 w-fit max-w-60" onClick={acceptCookies}>Accept</Button>
            <Button className="px-8  w-fit max-w-60 border  border-secondary hover:bg-secondary "  onClick={customizeCookies}>Customize</Button>
          </div>
        

    </div>
</div>