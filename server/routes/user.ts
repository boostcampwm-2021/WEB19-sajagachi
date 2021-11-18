import express, { Request, Response, Router } from 'express';
import { getUser } from '../controller/user-controller';

const router = express.Router();
router.get('/', getUser);

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
