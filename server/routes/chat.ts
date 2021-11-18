import express from 'express';
import {
  getParticipants,
  createParticipant
} from '../controller/participant-controller';

const router = express.Router();
router.get('/:post_id/participant', getParticipants);
router.post('/:post_id/participant', createParticipant);

const errorHandler = (err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
