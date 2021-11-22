import { Request, Response } from 'express';
import chatService from '../service/chat-service';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const getChats = async (req: Request, res: Response, next: Function) => {
  try {
    const { post_id } = req.params;
    const { limit, cursor } = req.query;
    const chats = await chatService.getChats(
      post_id,
      limit as string,
      cursor as string
    );

    res.json(chats);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};

export const checkDirectory = (req: Request, res: Response, next: Function) => {
  const path = req.path.substr(1);
  fs.readdir(path, (error: any) => {
    if (error) {
      fs.mkdirSync(path);
    }
    next();
  });
};

export const resizeImg = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    if (req.file === undefined) throw new Error('file이 없습니다');
    sharp(req.file.path)
      .resize({ width: 200 }) // 비율을 유지하며 가로 크기 줄이기
      .withMetadata() // 이미지의 exif데이터 유지
      .toBuffer((err, buffer) => {
        if (err) throw err;
        // 압축된 파일 새로 저장(덮어씌우기)
        if (req.file === undefined) throw new Error('file이 없습니다');
        fs.writeFile(req.file.path, buffer, err => {
          if (err) throw err;
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const upload = multer({
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

export const uploadImage = (req: Request, res: Response, next: any) => {
  console.log(req.file);
  if (req.file) res.json({ url: `/img/${req.file.filename}` });
};

fs.readdir('upload', (error: any) => {
  if (error) {
    fs.mkdirSync('upload');
  }
});
