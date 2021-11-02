import express, { Request, Response } from 'express';
import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';
import { Category } from '../model/entity/Category';
import { User } from '../model/entity/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
	// const db = await getDB().get();
	// let post = new Post();
	// post.title = 'insert test';
	// post.categoryId = 1;
	// post.userId = 11111111;
	// const result = await db.manager.save(post);
	// console.log(result);
});

export default router;
