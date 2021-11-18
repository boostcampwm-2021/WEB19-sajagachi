import express, { Request, Response } from 'express';
import postRouter from './post';
import categoryRouter from './category';
import sseRouter from './sse';
import linkPreviewRouter from './linkPreview';
import chatRouter from './chat';
import loginRouter from './login';
import userRouter from './user';

const router = express.Router();

router.use('/post', postRouter);
router.use('/category', categoryRouter);
router.use('/chat', chatRouter);
router.use('/sse', sseRouter);
router.use('/previewData', linkPreviewRouter);
router.use('/login', loginRouter);
router.use('/user', userRouter);

export default router;
