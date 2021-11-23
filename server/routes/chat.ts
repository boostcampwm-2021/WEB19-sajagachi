import express from 'express';
import {
  getParticipants,
  createParticipant
} from '../controller/participant-controller';
import {
  checkDirectory,
  getChats,
  resizeImg,
  upload,
  uploadImage
} from '../controller/chat-controller';

const router = express.Router();
router.get('/:post_id', getChats);
router.get('/:post_id/participant', getParticipants);
router.post('/:post_id/participant', createParticipant);
// router.post(
//   '/upload/:postId',
//   checkDirectory,
//   upload.single('file'),
//   resizeImg,
//   uploadImage
// );
router.post(
  '/upload/:postId',
  checkDirectory,
  upload.single('file'),
  uploadImage
);
const errorHandler = (err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode).json(err.message);
};
router.use(errorHandler);

export default router;
