import express from 'express';
import {
  checkLogin,
  githubLogin,
  logout
} from '../controller/login-controller';

const router = express.Router();

router.get('/auth', githubLogin);
router.get('/', checkLogin);
router.post('/logout', logout);

const errorHandler = (err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
