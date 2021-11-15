import express from 'express';
import { login } from '../controller/login-controller';

const router = express.Router();

router.post('/', login);

const errorHandler = (err: any, req: any, res: any, next: any) => {
	res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
