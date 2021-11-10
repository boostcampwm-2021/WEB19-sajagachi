import express, { Request, Response, Router } from 'express';
import { getPosts, getPost, savePost } from '../controller/post-controller';

const router = express.Router();
router.get('/', getPosts);
router.get('/:postId', getPost);
router.post('/post', savePost);

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
	res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
