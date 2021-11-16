import { Server } from 'socket.io';
import 'dotenv/config';
import { Application } from 'express';

export const socketInit = (server: any, app: Application) => {
	const io = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL
		}
	});
	app.set('io', io);
	io.on('connection', (socket: any) => {
		console.log('aaaaaa');
		socket.on('disconnect', () => {
			console.log('socket disconnected!');
		});
		socket.on('message', (msg: string) => {
			console.log(msg);
		});
	});
};
