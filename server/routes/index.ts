import express, { Request, Response } from 'express';
import { getDB } from '../db/db';
import { savePost } from '../service/post-service';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
	await savePost();
	res.json('hello world');
});

export default router;
