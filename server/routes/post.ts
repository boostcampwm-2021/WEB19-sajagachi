import express, { Request, Response, Router } from 'express';
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
