import express, { Request, Response } from 'express';
import postRouter from './post';
import categoryRouter from './category';
import sseRouter from './sse';
import linkPreviewRouter from './linkPreview';

const router = express.Router();

router.use('/post', postRouter);
router.use('/category', categoryRouter);
router.use('/sse', sseRouter);
router.use('/previewData', linkPreviewRouter);

export default router;
