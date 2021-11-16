// import { Server } from 'socket.io';
import 'dotenv/config';
const { Server } = require('socket.io');
import { Application } from 'express';

export const socketInit = (server: any, app: Application) => {
	// console.log(JSON.stringify(server));
	console.log(JSON.stringify(app));
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
