import * as prismic from '@prismicio/client';

/**
 *@param {object} args
 * @param {prismic.Content.ProductsSlice} args.slice
 * @param {{ client: prismic.Client<prismic.Content.AllDocumentTypes>}} args.context
 */

export default async function mapper({ slice, context }) {
	const products = (
		await Promise.all(
			slice.primary.products.map(async (item) => {
				if (prismic.isFilled.contentRelationship(item.product)) {
					return /**@type {prismic.Content.ProductDocument} */ (
						await context.client.getByID(item.product.id)
					);
				}
			})
		)
	).filter(Boolean);

	return {
		slice,
		products
	};
}

