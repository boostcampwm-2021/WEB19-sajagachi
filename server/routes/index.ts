import express, { Request, Response } from 'express';
import postRouter from './post';
import categoryRouter from './category';

const router = express.Router();

router.use('/post', postRouter);
router.use('/category', categoryRouter);

export default router;
