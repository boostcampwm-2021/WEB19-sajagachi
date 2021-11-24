import express, { Request, Response, Router } from 'express';
import {
  getPosts,
  getPost,
  savePost,
  getHost,
  getPostFinished,
  finishPost,
  getTitle
} from '../controller/post-controller';

const router = express.Router();
router.get('/', getPosts);
router.post('/', savePost);
router.get('/:postId', getPost);
router.get('/:postId/host', getHost);
router.get('/:postId/finished', getPostFinished);
router.post('/:postId/finished', finishPost);
router.get('/:postId/title', getTitle);

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
