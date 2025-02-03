import { asText, mapSliceZone } from '@prismicio/client';
import { mappers } from '$lib/slices/mapper.js';
import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }) {
  const client = createClient({ fetch, cookies });

  try {
    const page = await client.getByUID('page', 'home');
    

    

    const slices = await mapSliceZone(page.data.slices, mappers, { client });

    return {
      slices,
      title: asText(page.data.title),
      meta_description: page.data.meta_description,
      meta_title: page.data.meta_title,
      meta_image: page.data.meta_image.url,
    };
  } catch (error) {
    console.error("Error loading data:", error);
    return {
      status: 500,
      error: new Error("Internal Server Error"),
    };
  }
}

export function entries() {
  return [{}];
}
