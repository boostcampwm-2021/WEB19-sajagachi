import { Server } from 'socket.io';
import chatService from '../service/chat-service';
import participantService from '../service/participant-service';
import userService from '../service/user-service';
import postService from '../service/post-service';
import { decodeToken } from '../util';
import { getDB } from '../db/db';

export const joinRoom = (socket: any, io: Server) => {
  socket.on('joinRoom', async (postId: number, userId: number) => {
    console.log('user: ' + userId + ' has entered room: ' + postId);
    socket.join(String(postId));
    const joinMsg = `user ${userId} has join room ${postId}`;
    io.to(String(postId)).emit('afterJoin', joinMsg);

    const participants = await participantService.getParticipants(postId);
    io.to(String(postId)).emit('updateParticipants', participants);
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
  socket.on(
    'sendMsg',
    (
      postId: number,
      userId: number,
      userName: string,
      token: string,
      msg: string
    ) => {
      // 이렇게 Token을 Verify 해주는데 다시 추가적으로 에러처리를 해야할까요?
      if (decodeToken(token) === userId) {
        chatService.saveChat(userId, postId, msg);
        io.to(String(postId)).emit('receiveMsg', userId, userName, msg);
      }
    }
  );
};

export const confirmPurchase = (socket: any, io: Server) => {
  socket.on(
    'point confirm',
    async (postId: number, userId: number, sendPoint: number) => {
      const user = await userService.findById(userId);
      if (user === undefined) socket.emit('purchase error', '사용자 정보 에러');
      else if (user.point < sendPoint)
        socket.emit('purchase error', '잔여 포인트 부족');
      else {
        userService.usePoint(userId, user.point, sendPoint);
        participantService.updatePoint(postId, userId, sendPoint);
        io.to(String(postId)).emit('purchase confirm', userId, sendPoint);
      }
    }
  );
};

export const cancelPurchase = (socket: any, io: Server) => {
  socket.on('point cancel', async (postId: number, userId: number) => {
    const user = await userService.findById(userId);
    if (user === undefined) socket.emit('purchase error', '사용자 정보 에러');
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

export const kickUser = (socket: any, io: Server) => {
  socket.on(
    'kickUser',
    async (token: string, postId: number, targetUserId: number) => {
      const myId = decodeToken(token);
      const hostId = await postService.getHost(+postId);

      // 권한 체크
      if (myId !== hostId || hostId === targetUserId) {
        return; // no authority
      }

      // 타깃 유저를 찾기
      const targetUser = await participantService.getParticipant(
        postId,
        targetUserId
      );
      if (!targetUser) {
        return; // target user not exists
      }

      // 타깃 유저에게 포인트 반환
      const { point } = targetUser;
      if (point) userService.addPoint(targetUserId, point);

      // 타깃 유저를 참여자 테이블에서 제거
      await participantService.deleteParticipant(postId, targetUserId);

      // 변경된 참여자 리스트를 클라이언트에 반환
      const participants = await participantService.getParticipants(postId);
      io.to(String(postId)).emit('updateParticipants', participants);
    }
  );
};

export const quitRoom = (socket: any, io: Server) => {
  socket.on('quitRoom', async (token: string, postId: number) => {
    const myId = decodeToken(token);
    const hostId = await postService.getHost(+postId);

    // 호스트가 나가는 경우를 방지
    if (myId === hostId || typeof myId === 'string') {
      console.log('error 1');
      return; // 호스트가 나가는 기능은 별도 리스너로 구현
    }

    // 타깃 유저를 찾기
    const targetUser = await participantService.getParticipant(postId, myId);
    if (!targetUser) {
      console.log('error 2');
      return; // target user not exists
    }

    // 타깃 유저에게 포인트 반환
    const { point } = targetUser;
    if (point) userService.addPoint(myId, point);

    // 타깃 유저를 참여자 테이블에서 제거
    await participantService.deleteParticipant(postId, myId);

    // 변경된 참여자 리스트를 클라이언트에 반환
    const participants = await participantService.getParticipants(postId);
    io.to(String(postId)).emit('updateParticipants', participants);
  });
};

export const finishRoom = (socket: any, io: Server) => {
  socket.on('takePoint', async (postId: number) => {
    const queryRunner = (await getDB().get()).createQueryRunner();
    try {
      await queryRunner.startTransaction();
      Promise.all([
        takeAllPoint(postId),
        postService.updatePostFinished(postId)
      ])
        .then(async result => {
          await queryRunner.commitTransaction();
          io.to(String(postId)).emit('finishPost');
        })
        .catch((err: any) => {
          throw new Error();
        });
    } catch (err: any) {
      queryRunner.rollbackTransaction();
      socket.emit('purchase error', '정상적으로 종료되지 않았습니다.');
    }
  });
};

const takeAllPoint = async (postId: number) => {
  const hostId = await postService.getHost(postId);
  return participantService.finishPost(postId, hostId);
};
