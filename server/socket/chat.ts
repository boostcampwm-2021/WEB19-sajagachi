import { Server } from 'socket.io';
import chatService from '../service/chat-service';
import participantService from '../service/participant-service';
import userService from '../service/user-service';

export const joinRoom = (socket: any, io: Server) => {
	socket.on('joinRoom', (postId: string, userId: string) => {
		console.log('user: ' + userId + ' has entered room: ' + postId);
		socket.join(postId);
		const joinMsg = `user ${userId} has join room ${postId}`;
		io.to(postId).emit('afterJoin', joinMsg);
	});
};

export const leaveRoom = (socket: any, io: Server) => {
	socket.on('leaveRoom', (postId: string, userId: string) => {
		console.log('user: ' + userId + ' has leaved room: ' + postId);
		socket.leave(postId);
		const leaveMsg = `user ${userId} has leaved`;
		io.to(postId).emit('afterLeave', leaveMsg);
	});
};

export const sendMsg = (socket: any, io: Server) => {
	socket.on('sendMsg', (postId: string, userId: string, msg: string) => {
		// 채팅을 보낸 user 정보와 msg를 보내줌 => 객체로 만들어진 시간은 여기서 만들어서 보내줘야할 것 같음
		chatService.saveChat(Number(userId), Number(postId), msg);
		io.to(postId).emit('receiveMsg', userId, msg);
	});
};

export const confirmPurchase = (socket: any, io: Server) => {
	socket.on(
		'purchase confirm',
		async (postId: string, userId: string, sendPoint: number) => {
			const user = await userService.findById(userId);
			if (user === undefined)
				socket.emit('purchase error', '사용자 정보 에러');
			else if (user.point < sendPoint)
				socket.emit('purchase error', '잔여 포인트 부족');
			else {
				userService.usePoint(
					Number(userId),
					Number(user.point),
					sendPoint
				);
				participantService.confirmPoint(
					Number(postId),
					Number(userId),
					sendPoint
				);
				io.to(postId).emit('purchase confirm', userId, sendPoint);
			}
		}
	);
};
