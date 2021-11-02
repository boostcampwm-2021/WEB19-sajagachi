import express, { Request, Response, Router } from 'express';
import { getPosts } from '../controller/post-controller';

const router = express.Router();
router.get('/', getPosts);

export default router;
