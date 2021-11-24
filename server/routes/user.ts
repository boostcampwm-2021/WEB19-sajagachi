import express, { Request, Response, Router } from 'express';
import { getUser, updatePoint } from '../controller/user-controller';
import { getParticipationPosts } from '../controller/participant-controller';

const router = express.Router();
router.get('/:user_id', getUser);
router.get('/:userId/participationPosts', getParticipationPosts);
router.post('/:user_id/point', updatePoint);

export default router;
