import { Server } from 'socket.io';
import chatService from '../service/chat-service';
import participantService from '../service/participant-service';
import userService from '../service/user-service';

export const joinRoom = (socket: any, io: Server) => {
	socket.on('joinRoom', (postId: number, userId: number) => {
		console.log('user: ' + userId + ' has entered room: ' + postId);
		socket.join(String(postId));
		const joinMsg = `user ${userId} has join room ${postId}`;
		io.to(String(postId)).emit('afterJoin', joinMsg);
	});
};

export const leaveRoom = (socket: any, io: Server) => {
	socket.on('leaveRoom', (postId: number, userId: number) => {
		console.log('user: ' + userId + ' has leaved room: ' + postId);
		socket.leave(String(postId));
		const leaveMsg = `user ${userId} has leaved`;
		io.to(String(postId)).emit('afterLeave', leaveMsg);
	});
};

export const sendMsg = (socket: any, io: Server) => {
	socket.on('sendMsg', (postId: number, userId: number, msg: string) => {
		// 채팅을 보낸 user 정보와 msg를 보내줌 => 객체로 만들어진 시간은 여기서 만들어서 보내줘야할 것 같음
		chatService.saveChat(userId, postId, msg);
		io.to(String(postId)).emit('receiveMsg', userId, msg);
	});
};

export const confirmPurchase = (socket: any, io: Server) => {
	socket.on(
		'point confirm',
		async (postId: number, userId: number, sendPoint: number) => {
			const user = await userService.findById(userId);
			if (user === undefined)
				socket.emit('purchase error', '사용자 정보 에러');
			else if (user.point < sendPoint)
				socket.emit('purchase error', '잔여 포인트 부족');
			else {
				userService.usePoint(userId, user.point, sendPoint);
				participantService.updatePoint(postId, userId, sendPoint);
				io.to(String(postId)).emit(
					'purchase confirm',
					userId,
					sendPoint
				);
			}
		}
	);
};

export const cancelPurchase = (socket: any, io: Server) => {
	socket.on('point cancel', async (postId: number, userId: number) => {
		const user = await userService.findById(userId);
		if (user === undefined)
			socket.emit('purchase error', '사용자 정보 에러');
		else {
			const participant = await participantService.getParticipant(
				postId,
				userId
			);
			if (participant === undefined)
				socket.emit('purchase error', '참여 정보 에러');
			else if (participant.point === null)
				socket.emit('purchase error', '참여 정보 없음');
			else {
				participantService.updatePoint(postId, userId, null);
				userService.addPoint(userId, participant.point);
				io.to(String(postId)).emit('purchase cancel', userId);
			}
		}
	});
};
