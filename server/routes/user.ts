import express, { Request, Response, Router } from 'express';
import { getUser, updatePoint } from '../controller/user-controller';

const router = express.Router();
router.get('/:user_id', getUser);
router.post('/:user_id/point', updatePoint);

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
