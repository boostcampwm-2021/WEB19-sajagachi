import express, { Request, Response, Router } from 'express';
import { parsePreviewLinkData } from '../controller/linkPreview-controller';

const router = express.Router();
router.get('/', parsePreviewLinkData);

export default router;
