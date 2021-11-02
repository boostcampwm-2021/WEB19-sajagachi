import express, { Request, Response, Router } from 'express';
import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';
import { Category } from '../model/entity/Category';
import { User } from '../model/entity/User';
import { getPosts } from '../service/post-service';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
	getPosts({
		offset: 0,
		limit: 10,
		category: 1,
		finished: true,
		search: 'test'
	});
});

export default router;
