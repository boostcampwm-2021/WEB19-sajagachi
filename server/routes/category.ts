import express from 'express';
import { getCategories } from '../controller/category-controller';

const router = express.Router();
router.get('/', getCategories);

const errorHandler = (err: any, req: any, res: any, next: any) => {
	res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
