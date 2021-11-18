import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
import ChatInput from './component/ChatInput';
import ChatList from './component/ChatList';
import io from 'socket.io-client';

import { fetchGet, getCurrentTime, parsePath } from '../../util';
import { ParticipantType } from '../../type';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../store/login';


const ChatContainer = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  height: 100%;
  position: relative;
`;

function Chat(props: any) {
  const userId = '121212';
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);
  const socketRef = useRef<any>(io(String(process.env.REACT_APP_SERVER_URL)));
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const [participants, setParticipants] = useState<ParticipantType[]>([]);

  const updateParticipants = async (postId: number) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
    const result = await fetchGet(url);
    setParticipants(result);
  };

  useEffect(() => {
    socketRef.current.emit('joinRoom', postId, userId);
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

    updateParticipants(postId);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div css={ChatContainer}>
      <ChatBar
        title={'타이틀이 들어갈 공간입니당아아아'}
        socket={socketRef.current}
        participants={participants}
      />
      <ChatList postId={postId} userId={userId} socket={socketRef.current} />
      <ChatInput socket={socketRef.current} postId={postId} userId={userId} />
    </div>
  );
}
export default Chat;
