import express, { Request, Response, Router } from 'express';
import { getPosts, getPost } from '../controller/post-controller';

const router = express.Router();
router.get('/', getPosts);
router.get('/:postId', getPost);

const errorHandler = (err: any, req: any, res: any, next: any) => {
	res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
