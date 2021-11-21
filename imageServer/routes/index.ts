import express, { Request, Response } from 'express';
import multer from 'multer';
const fs = require('fs');
const path = require('path');
const router = express.Router();

fs.readdir('upload', (error: any) => {
  if (error) {
    fs.mkdirSync('upload');
  }
});

const checkDirectory = (req: Request, res: Response, next: Function) => {
  const path = req.path.substr(1);
  fs.readdir(path, (error: any) => {
    if (error) {
      fs.mkdirSync(path);
    }
    next();
  });
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, req.path.substr(1));
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  })
  // 큰 파일 사이즈에 대한 에러처리 확인하기
  // limits: { fileSize: 5 * 1024 * 1024 }
});

router.post(
  '/upload/:postId',
  checkDirectory,
  upload.single('file'),
  (req: Request, res: Response) => {
    console.log(req.file);
    console.log(req.path);
    if (req.file) res.json({ url: `/img/${req.file.filename}` });
  }
);
// router.post('/:postId', (req: Request, res: Response): void => {
//   res.json('hello world');
// });

// router.post('/', (req: Request, res: Response): void => {
//   res.json('hello world');
// });

export default router;
