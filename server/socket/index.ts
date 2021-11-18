import { Server } from 'socket.io';
import 'dotenv/config';
import { Application } from 'express';
import {
  cancelPurchase,
  confirmPurchase,
  joinRoom,
  sendMsg,
  kickUser
} from './chat';

export const socketInit = (server: any, app: Application) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL
    }
  });
  app.set('io', io);
  io.on('connection', (socket: any) => {
    joinRoom(socket, io);
    sendMsg(socket, io);
    confirmPurchase(socket, io);
    cancelPurchase(socket, io);
    kickUser(socket, io);

    socket.on('disconnect', () => {
      console.log('socket disconnected!');
    });
  });
};
