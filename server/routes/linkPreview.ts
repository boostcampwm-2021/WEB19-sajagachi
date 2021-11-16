import express, { Request, Response, Router } from 'express';
import { parsePreviewLinkData } from '../controller/linkPreview-controller';

const router = express.Router();
router.get('/', parsePreviewLinkData);

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
	res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
