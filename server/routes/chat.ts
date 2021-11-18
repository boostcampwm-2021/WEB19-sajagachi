import express from 'express';
import {
  getParticipants,
  createParticipant,
  getParticipantPoint
} from '../controller/participant-controller';
import { getChats } from '../controller/chat-controller';

const router = express.Router();
router.get('/:post_id', getChats);
router.get('/:post_id/participant', getParticipants);
router.post('/:post_id/participant', createParticipant);
router.get('/:post_id/participant/:user_id', getParticipantPoint);

const errorHandler = (err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
