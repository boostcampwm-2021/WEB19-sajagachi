import { Request, Response } from 'express';
import { parse } from 'html-metadata-parser';
import { MetaResult, APIOutput } from '../type';

export const parsePreviewLinkData = async (req: Request, res: Response) => {
	try {
		let url = req.query.url as unknown as string;

		if (!url) {
			return res
				.set('Access-Control-Allow-Origin', '*')
				.status(400)
				.json({ error: 'Invalid URL' });
		}

		url = url.indexOf('://') === -1 ? 'http://' + url : url;

		const isUrlValid =
			/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
				url
			);

		if (!url || !isUrlValid) {
			return res
				.set('Access-Control-Allow-Origin', '*')
				.status(400)
				.json({ error: 'Invalid URL' });
		}

		if (url && isUrlValid) {
			const { hostname } = new URL(url);

			let output: APIOutput;

			const metadata = await getMetadata(url);
			if (!metadata) {
				return sendResponse(res, null);
			}
			const { images, og, meta } = metadata!;

			let image = og.image
				? og.image
				: images.length > 0
				? images[0].url
				: null;
			const description = og.description
				? og.description
				: meta.description
				? meta.description
				: null;
			const title = (og.title ? og.title : meta.title) || '';
			const siteName = og.site_name || '';

			output = {
				title,
				description,
				image,
				siteName,
				hostname
			};

			sendResponse(res, output);
		}
	} catch (error) {
		console.log(error);
		return res.set('Access-Control-Allow-Origin', '*').status(500).json({
			error: 'Internal server error. Please open a Github issue or contact me on Twitter @dhaiwat10 if the issue persists.'
		});
	}
};

const sendResponse = (res: Response, output: APIOutput | null) => {
	if (!output) {
		return res
			.set('Access-Control-Allow-Origin', '*')
			.status(404)
			.json({ metadata: null });
	}

	return res
		.set('Access-Control-Allow-Origin', '*')
		.status(200)
		.json({ metadata: output });
};

const getMetadata = async (url: string): Promise<MetaResult | null> => {
	try {
		const result = (await parse(url)) as MetaResult;
		return result;
	} catch (err) {
		console.log(err);
		return null;
	}
};
