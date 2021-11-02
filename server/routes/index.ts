import express, { Request, Response } from 'express';
import postRouter from './post';

const router = express.Router();

router.use('/post', postRouter);

export default router;
