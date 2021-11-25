import { Server } from 'socket.io';
import chatService from '../service/chat-service';
import participantService from '../service/participant-service';
import userService from '../service/user-service';
import postService from '../service/post-service';
import { getDB } from '../db/db';
import { User } from '../model/entity/User';

export const joinRoom = (socket: any, io: Server) => {
  socket.on('joinRoom', async (postId: number) => {
    const loginUser = await checkSession(socket);
    if (loginUser === undefined) return;
    console.log('user: ' + loginUser.id + ' has entered room: ' + postId);
    socket.join(String(postId));
    const joinMsg = `user ${loginUser.id} has join room ${postId}`;
    io.to(String(postId)).emit('afterJoin', joinMsg);

    const participants = await participantService.getParticipants(postId);
    io.to(String(postId)).emit('updateParticipants', participants);
  });
};

export const sendMsg = (socket: any, io: Server) => {
  socket.on('sendMsg', async (postId: number, msg: string) => {
    const loginUser = await checkSession(socket);
    if (loginUser === undefined) return;
    chatService.saveChat(loginUser.id, postId, msg);
    io.to(String(postId)).emit('receiveMsg', loginUser.id, loginUser.name, msg);
  });
};

export const sendImg = (io: Server, postId: number, userId: number, userName: string, img: string) => {
  io.to(String(postId)).emit('sendImg', userId, userName, img);
};

export const confirmPurchase = (socket: any, io: Server) => {
  socket.on('pointConfirm', async (postId: number, userId: number, sendPoint: number) => {
    const loginUser = await checkSession(socket);
    if (loginUser === undefined || loginUser.id !== userId) socket.emit('purchaseError', '사용자 정보 에러');
    else if (loginUser.point < sendPoint) socket.emit('purchaseError', '잔여 포인트 부족');
    else {
      userService.usePoint(loginUser.id, loginUser.point, sendPoint);
      participantService.updatePoint(postId, loginUser.id, sendPoint);
      io.to(String(postId)).emit('purchaseConfirm', loginUser.id, sendPoint);
      processSystemMsg(io, SYSTEM_MSG_TYPE.CONFIRM_PURCHASE, postId, loginUser.name);
    }
  });
};

export const cancelPurchase = (socket: any, io: Server) => {
  socket.on('pointCancel', async (postId: number, userId: number) => {
    const loginUser = await checkSession(socket);
    if (loginUser === undefined) return;
    if (loginUser === undefined || loginUser.id !== userId) socket.emit('purchaseError', '사용자 정보 에러');
    else {
      const participant = await participantService.getParticipant(postId, loginUser.id);
      if (participant === undefined) socket.emit('purchaseError', '참여 정보 없음');
      else if (participant.point === null) socket.emit('purchaseError', '제출 이력 없음');
      else {
        participantService.updatePoint(postId, loginUser.id, null);
        userService.addPoint(loginUser.id, participant.point);
        io.to(String(postId)).emit('purchaseCancel', loginUser.id);
        processSystemMsg(io, SYSTEM_MSG_TYPE.CANCEL_PURCHASE, postId, loginUser.name);
      }
    }
  });
};

export const kickUser = (socket: any, io: Server) => {
  socket.on('kickUser', async (postId: number, targetUserId: number) => {
    const loginUser = await checkSession(socket);
    if (loginUser === undefined) return;

    const myId = loginUser.id;
    const hostId = await postService.getHost(+postId);

    // 권한 체크
    if (myId !== hostId || hostId === targetUserId) {
      return; // no authority
    }

    // 타깃 유저를 찾기
    const targetUser = await participantService.getParticipant(postId, targetUserId);
    if (!targetUser) {
      return; // target user not exists
    }
    const banUser = await userService.findById(targetUserId);
    if (!banUser) {
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
    processSystemMsg(io, SYSTEM_MSG_TYPE.KICKED, postId, banUser.name);

    // 강제퇴장 당한 클라이언트에게 이벤트 전달
    io.to(String(postId)).emit('getOut', targetUserId);
  });
};

export const quitRoom = (socket: any, io: Server) => {
  socket.on('quitRoom', async (postId: number) => {
    const loginUser = await checkSession(socket);
    if (loginUser === undefined) return;

    // 호스트가 나가는 경우를 방지
    const hostId = await postService.getHost(+postId);
    if (loginUser.id === hostId) return;

    const myId = loginUser.id;

    // 공동 구매가 끝난 채팅방을 나갈 수 없음
    const { finished } = await postService.getFinished(+postId);
    if (finished) return;

    // 타깃 유저를 찾기
    const targetUser = await participantService.getParticipant(postId, myId);
    if (!targetUser) {
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
    processSystemMsg(io, SYSTEM_MSG_TYPE.QUIT, postId, loginUser.name);
  });
};

export const finishRoom = (socket: any, io: Server) => {
  socket.on('takePoint', async (postId: number) => {
    const loginUser = await checkSession(socket);
    if (loginUser === undefined) return;
    const queryRunner = (await getDB().get()).createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const hostId = await postService.getHost(postId);
      await participantService.finishPost(postId, hostId);
      await postService.updatePostFinished(postId);
      await queryRunner.commitTransaction();
      io.to(String(postId)).emit('finishPost');
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      socket.emit('finishError', '정상적으로 종료되지 않았습니다.');
    } finally {
      await queryRunner.release();
    }
  });
};

const SYSTEM_ID = 0;
const SYSTEM_NAME = 'System';
export const SYSTEM_MSG_TYPE = {
  JOIN: 0,
  CONFIRM_PURCHASE: 1,
  CANCEL_PURCHASE: 2,
  KICKED: 3,
  QUIT: 4
};

const createSystemMsg = (msgType: number, userName: string) => {
  switch (msgType) {
    case SYSTEM_MSG_TYPE.JOIN:
      return `${userName}님이 채팅방에 참가하셨습니다.`;
    case SYSTEM_MSG_TYPE.CONFIRM_PURCHASE:
      return `${userName}님이 공동 구매를 확정하셨습니다.`;
    case SYSTEM_MSG_TYPE.CANCEL_PURCHASE:
      return `${userName}님이 공동 구매를 취소하셨습니다.`;
    case SYSTEM_MSG_TYPE.KICKED:
      return `${userName}님이 강퇴당하셨습니다.`;
    case SYSTEM_MSG_TYPE.QUIT:
      return `${userName}님이 채팅방을 나가셨습니다.`;
    default:
      return '';
  }
};

export const processSystemMsg = (io: Server, type: number, postId: number, userName: string) => {
  const msg = createSystemMsg(type, userName);
  chatService.saveChat(SYSTEM_ID, postId, msg);
  io.to(String(postId)).emit('receiveMsg', SYSTEM_ID, SYSTEM_NAME, msg);
};

const checkSession = async (socket: any): Promise<User | undefined> => {
  const session = socket.request.session;
  const id = session.userId;
  return await userService.findById(id);
};
