import { toast } from '@zerodevx/svelte-toast';

export const successMessage = (success:string) =>
	toast.push(success, {
		theme: {
			'--toastBackground': 'green',
			'--toastColor': 'white',
			'--toastBarBackground': 'olive',
			'--toastContainerTop': '0.5rem',
			'--toastContainerRight': '0.5rem',
			'--toastContainerBottom': 'auto',
            '--toastBarHeight': '0',
			'--toastContainerLeft': 'calc(50vw - 20rem)',
			'--toastWidth': '100%',
			'--toastMinHeight': '2rem',
			'--toastPadding': '0 0.5rem',
			'font-size': '0.875rem',
			
		}
	});

export const errorMessages = (error:string) =>
	toast.push(error, {
		theme: {
			'--toastBackground': 'red',
			'--toastColor': 'white',
			'--toastContainerTop': '0.5rem',
			'--toastContainerRight': '0.5rem',
			'--toastContainerBottom': 'auto',
			'--toastContainerLeft': 'calc(50vw - 20rem)',
            '--toastBarHeight': '0',
			'--toastWidth': '100%',
			'--toastMinHeight': '2rem',
			'--toastPadding': '0 0.5rem',
			'font-size': '0.875rem',
		}
	});

export const failureMessage = (failure:string) =>
	toast.push(failure, {
		theme: {
			'--toastBackground': 'red',
			'--toastColor': 'white',
			'--toastBarBackground': 'olive'
			
		}
	});
