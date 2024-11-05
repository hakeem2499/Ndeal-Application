// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PrismicDocument } from '@prismicio/types';
import type { PrismicSlice } from '@prismicio/react';
import { PrismaClient } from '@prisma/client';


declare global {
	var prisma: PrismaClient | undefined;
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface Window {
		// 	onYouTubeIframeAPIReady: () => void;
		// }
	}
	// interface PageData {}
	// interface PageState {}
	// interface Platform {}
	interface PageDocument extends PrismicDocument {
		data: {
		  title: { type: string; text: string }[]; // Rich text field for title
		  meta_title: string; // Meta title field
		  meta_description: string; // Meta description field
		  meta_image: {
			url: string; // URL of the image
			alt?: string; // Optional alt text for the image
		  };
		  slices: PrismicSlice[]; // Define the slices as an array of PrismicSlice
		};
	  }
}


import 'unplugin-icons/types/svelte';
export {};
