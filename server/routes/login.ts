import express from 'express';
import { checkLogin, githubLogin, logout } from '../controller/login-controller';

const router = express.Router();

router.get('/auth', githubLogin);
router.get('/', checkLogin);
router.post('/logout', logout);

export default router;
