import * as prismic from '@prismicio/client';

/**
 *@param {object} args
 * @param {prismic.Content.ToolsSlice} args.slice
 * @param {{ client: prismic.Client<prismic.Content.AllDocumentTypes>}} args.context
 */
export default async function mapper({ slice, context }) {
	const tools = (
		await Promise.all(
			slice.primary.tools.map(async (item) => {
				if (prismic.isFilled.contentRelationship(item.tool)) {
					return /**@type {prismic.Content.ToolsDocument} */ (
						await context.client.getByID(item.tool.id)
					);
				}
			})
		)
	).filter(Boolean);

	return {
		slice,
		tools
	};
}

// export const mappers =  {
//     tools: mapper,
//   };
