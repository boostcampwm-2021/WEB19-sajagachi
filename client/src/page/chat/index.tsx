import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
import ChatInput from './component/ChatInput';
import ChatList from './component/ChatList';
import io from 'socket.io-client';

import { fetchGet, getCurrentTime, parsePath } from '../../util';
import { ParticipantType, UserInfoType } from '../../type';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../store/login';

const ChatContainer = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  height: 100%;
  position: relative;
`;

function Chat() {
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);
  const socketRef = useRef<any>(io(String(process.env.REACT_APP_SERVER_URL)));
  const [userMe, setUserMe] = useState<UserInfoType>();
  const [participants, setParticipants] = useState<ParticipantType[]>([]);

  const updateParticipants = async (postId: number) => {
    const loginUrl = `${process.env.REACT_APP_SERVER_URL}/api/login`;
    const userLoginId = await fetchGet(loginUrl);
    const participantUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
    const result = await fetchGet(participantUrl);
    if (isNaN(userLoginId)) console.log('login 필요합니다.');

    const participantMe = result.find(
      (participant: ParticipantType) => participant.user.id === userLoginId
    );
    if (participantMe === undefined) console.log('참여하지 않은 채팅방입니다.');
    if (participantMe !== undefined) {
      // 나중에 이조건 없애주기
      setChatSocket(participantMe.user.id);
      setUserMe({
        userId: participantMe.user.id,
        userName: participantMe.user.name
      });
      setParticipants(result);
    }
  };

  const setChatSocket = (userId: number) => {
    socketRef.current.emit('joinRoom', postId, userId);
  };

  useEffect(() => {
    updateParticipants(postId);
    socketRef.current.on('afterJoin', (msg: string) => {
      console.log(msg);
    });
    socketRef.current.on('updateParticipants', (list: ParticipantType[]) => {
      setParticipants(list);
    });

    socketRef.current.on(
      'purchase confirm',
      (confirmUserId: number, sendPoint: number) => {
        setParticipants(prev => {
          const newParticipants = [...prev];
          const confirmUser = newParticipants.find(
            participant => participant.user.id === confirmUserId
          );
          if (confirmUser) confirmUser.point = sendPoint;
          return newParticipants;
        });
      }
    );

    socketRef.current.on('purchase cancel', (cancelUserId: number) => {
      setParticipants(prev => {
        const newParticipants = [...prev];
        const cancelUser = newParticipants.find(
          participant => participant.user.id === cancelUserId
        );
        if (cancelUser) cancelUser.point = null;
        return newParticipants;
      });
    });

    socketRef.current.emit('enterRoom');

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div css={ChatContainer}>
      {participants && (
        <ChatBar
          title={'타이틀이 들어갈 공간입니당아아아'}
          socket={socketRef.current}
          participants={participants}
        />
      )}
      {userMe && (
        <ChatList postId={postId} user={userMe} socket={socketRef.current} />
      )}
      {userMe && (
        <ChatInput socket={socketRef.current} postId={postId} user={userMe} />
      )}
    </div>
  );
}
export default Chat;
