import { Server } from 'socket.io';
import 'dotenv/config';
import { Application } from 'express';

const joinRoom = (socket: any, io: Server) => {
	socket.on('joinRoom', (postId: string, userId: string) => {
		console.log('user: ' + userId + ' has entered room: ' + postId);
		socket.join(postId);
		const joinMsg = `user ${userId} has join room ${postId}`;
		io.to(postId).emit('afterJoin', joinMsg);
	});
};

const leaveRoom = (socket: any, io: Server) => {
	socket.on('leaveRoom', (postId: string, userId: string) => {
		console.log('user: ' + userId + ' has leaved room: ' + postId);
		socket.leave(postId);
		const leaveMsg = `user ${userId} has leaved`;
		io.to(postId).emit('afterLeave', leaveMsg);
	});
};

export const socketInit = (server: any, app: Application) => {
	const io = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL
		}
	});
	app.set('io', io);
	io.on('connection', (socket: any) => {
		joinRoom(socket, io);

		socket.on('message', (msg: string) => {
			console.log(msg);
		});

		socket.on('disconnect', () => {
			console.log('socket disconnected!');
		});
	});
};
