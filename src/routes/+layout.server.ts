import { createClient } from '$lib/prismicio';
import type { LayoutServerLoad } from './$types';
import type { PrismicDocument } from '@prismicio/client';

export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });

	// Define the type for the Prismic settings document
	const settings: PrismicDocument = await client.getSingle('settings');
	console.log("🚀 ~ constload:LayoutServerLoad= ~ settings:", settings)

	return {
		settings,
        
	};
};
