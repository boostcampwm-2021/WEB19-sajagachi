import { Server, Socket } from 'socket.io';
import 'dotenv/config';
import { Application, Request, RequestHandler, Response } from 'express';
import {
  cancelPurchase,
  confirmPurchase,
  joinRoom,
  sendMsg,
  kickUser,
  quitRoom,
  finishRoom
} from './chat';
import cookieParser from 'cookie-parser';

export const socketInit = (
  server: any,
  app: Application,
  sessionMiddleware: RequestHandler
) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });
  app.set('io', io);

  const wrap = (middleware: any) => (socket: Socket, next: any) =>
    middleware(socket.request, {}, next);
  io.use(wrap(cookieParser(process.env.SESSION_SECRET)));
  io.use(wrap(sessionMiddleware));

  io.on('connection', (socket: any) => {
    joinRoom(socket, io);
    sendMsg(socket, io);
    confirmPurchase(socket, io);
    cancelPurchase(socket, io);
    kickUser(socket, io);
    quitRoom(socket, io);
    finishRoom(socket, io);

    socket.on('disconnect', () => {
      console.log('socket disconnected!');
    });
  });
};
