<script>
	import Bounded from './Bounded.svelte';
	import Button from './ReusableComponents/Button.svelte';
	import Newsletter from './ReusableComponents/Newsletter.svelte';
</script>

<div class="spikes relative w-full md:px-10 md:py-10  bg-secondary h-fit lg:min-h-[700px]">
	<Bounded class="   gap-10">
		<div class="flex flex-col items-center lg:w-[70dvw] md:gap-12 gap-6">
			<div class="lg:max-w-[50dvw] space-y-8">
				<h3 class="text-3xl md:text-5xl">
					Transform Your Workforce with Equitable Solutions for Growth
				</h3>
				<p class="text-pretty">
					Join us in creating a workplace where fair compensation and employee well-being drive
					success. Sign up for our newsletter or book a demo to see how our tailored HR solutions
					can empower your team and elevate your business.
				</p>
				<Button className="w-max text-sm lg:text-lg  inline-flex px-5 rounded-sm "
					>Book a demo</Button
				>
			</div>
		</div>
	</Bounded>
	<div class="cta-div   py-8 relative">
		<Newsletter />
	</div>
</div>

<style>
	.cta-div::before,
	.cta-div::after {
		content: '';
		position: absolute;
		height: 0.125rem;

		left: 0;
		width: 100%;
		background-color: #B8B4AE;
	}
	.cta-div::after {
		bottom: 0;
		margin-top: 30px;
		@apply mb-8 md:mb-0;
	}
	.cta-div::before {
		top: 0;
	}
	.spikes {
		--spike-width: 100px;
		--spike-height: 10px;
		--spike-color: var(--color-primary);
	}
	.spikes::before,
	.spikes::after {
		content: '';
		position: absolute;
		width: 90%;
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
