import { Request, Response } from 'express';
import linkPreviewService from '../service/linkPreview-service';

export const parsePreviewLinkData = async (
	req: Request,
	res: Response,
	next: Function
) => {
	try {
		const { url } = req.body;
		const previewData = await linkPreviewService.parsePreviewLinkData(url);
		console.log(previewData);
		res.json(previewData);
	} catch (err: any) {
		next({ statusCode: 500, message: err.message });
	}
};
