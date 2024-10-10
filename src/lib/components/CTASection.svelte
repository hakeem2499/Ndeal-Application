<script>
	import Bounded from './Bounded.svelte';
	import Button from './ReusableComponents/Button.svelte';
</script>

<div class="spikes relative bg-accent h-[25dvvh]">
	<Bounded class="   gap-10">
		<div class="flex flex-col lg:w-[50dvw] gap-6">
			<h3 class="text-3xl md:text-5xl">Transform Your Workforce with Equitable Solutions for Growth</h3>
			<p class="text-pretty">
				Join us in creating a workplace where fair compensation and employee well-being drive
				success. Sign up for our newsletter or book a demo to see how our tailored HR solutions can
				empower your team and elevate your business.
			</p>

			<Button className="w-max px-5 rounded-sm ">Book a demo</Button>
		</div>
	</Bounded>
</div>

<style>
	.spikes {
		--spike-width: 100px;
		--spike-height: 10px;
		--spike-color: var(--color-primary);
	}
	.spikes::before,
	.spikes::after {
		content: '';
		position: absolute;
		width: 100%;
		height: var(--spike-height);
		background-image: url('src/lib/images/svg-path.svg');
		background-repeat: no-repeat;
		background-size: 100% 100%; /* Ensures full width and height */
		mask-type: luminance; /* Cross-browser */
	}

	.spikes::before {
		top: 0;
	}
	.spikes::after {
		bottom: 0;
		transform: rotate(0.5turn);
	}
</style>
