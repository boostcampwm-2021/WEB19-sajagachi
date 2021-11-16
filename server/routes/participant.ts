import express from 'express';
import { saveParticipant } from '../controller/participant-controller';

const router = express.Router();
router.post('/save', saveParticipant);

const errorHandler = (err: any, req: any, res: any, next: any) => {
	res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
