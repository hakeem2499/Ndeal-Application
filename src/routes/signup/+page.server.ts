import { createClient } from '$lib/prismicio';
import { asText, mapSliceZone } from '@prismicio/client';

export const prerender = 'auto';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const signup = await client.getSingle('signup');

	return {
		signup,
		title: asText(signup.data.heading),
		meta_description: signup.data.meta_description,
		meta_title: signup.data.meta_title,
		meta_image: signup.data.meta_image.url
	};
}