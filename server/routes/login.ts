import express from 'express';
import { checkLogin, login } from '../controller/login-controller';

const router = express.Router();

router.post('/', login);
router.get('/', checkLogin);

const errorHandler = (err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
