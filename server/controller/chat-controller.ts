import { Request, Response } from 'express';
import chatService from '../service/chat-service';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Server } from 'socket.io';
import { sendImg } from '../socket/chat';
import ERROR from '../util/error';

import { v4 } from 'uuid';

export const getChats = async (req: Request, res: Response, next: Function) => {
  try {
    const { post_id } = req.params;
    const { limit, cursor } = req.query;
    const chats = await chatService.getChats(post_id, limit as string, cursor as string);
    res.json(chats);
  } catch (err: any) {
    next(ERROR.DB_CONNECT_FAIL);
  }
};

export const checkDirectory = (req: Request, res: Response, next: Function) => {
  if (!req.session.userId) next(ERROR.NOT_LOGGED_IN);
  const path = req.path.substr(1);
  fs.readdir(path, (error: any) => {
    if (error) {
      fs.mkdirSync(path);
    }
    next();
  });
};

export const resizeImg = async (req: Request, res: Response, next: Function) => {
  try {
    if (req.file === undefined) return next(ERROR.NO_FILE);
    sharp(req.file.path)
      .resize({ width: 200 }) // 비율을 유지하며 가로 크기 줄이기
      .withMetadata() // 이미지의 exif데이터 유지
      .toBuffer((err, buffer) => {
        if (err) throw err;
        // 압축된 파일 새로 저장(덮어씌우기)
        fs.writeFile(String(req.file?.path), buffer, err => {
          if (err) throw err;
        });
        next();
      });
  } catch (err) {
    next(ERROR.DB_WRITE_FAIL);
  }
};

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, req.path.substr(1));
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(v4(), ext) + Date.now() + ext);
    }
  })
});

export const uploadImage = async (req: Request, res: Response, next: any) => {
  const session = req.session;
  if (!req.file) return next(ERROR.NO_FILE);
  const postId = req.path.split('/')[2];
  const filename = postId + '/' + req.file.filename;
  try {
    const savedImg = await chatService.saveImg(Number(session.userId), +postId, filename);
    const io: Server = req.app.get('io');
    sendImg(io, +postId, Number(session.userId), String(session.userName), filename);
    if (savedImg) res.json({ savedImg });
  } catch (err: any) {
    fs.unlink(req.path.substr(1) + '/' + filename, console.log);
    next(ERROR.DB_WRITE_FAIL);
  }
};

fs.readdir('upload', (error: any) => {
  if (error) {
    fs.mkdirSync('upload');
  }
});
