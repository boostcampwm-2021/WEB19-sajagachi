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

export default router;
