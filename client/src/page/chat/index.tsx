import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
import ChatInput from './component/ChatInput';
import MyChatMessage from './component/MyChatMessage';
import OtherChatMessage from './component/OtherChatMsg';
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
const ChatLayout = css`
  margin: 5px 0px 0px 0px;
  height: 79vh;
  background-color: #ffffff;
  padding-top: 15px;
  overflow: scroll;
  overflow-x: hidden;
  padding-left: 20px;
  padding-right: 20px;
`;

type MessageType = {
  sender: string;
  msg: string;
  time: string;
  isMe: boolean;
};

function Chat(props: any) {
  const userId = '121212';
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);
  const socketRef = useRef<any>(io(String(process.env.REACT_APP_SERVER_URL)));
  const [chatDatas, setChatDatas] = useState<any>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const [participants, setParticipants] = useState<ParticipantType[]>([]);

  const updateParticipants = async (postId: number) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
    const result = await fetchGet(url);
    setParticipants(result);
  };

  const checkMe = (sender: string) => {
    return sender === userId;
  };

  useEffect(() => {
    socketRef.current.emit('joinRoom', postId, userId);
    socketRef.current.on('afterJoin', (msg: string) => {
      console.log(msg);
    });
    socketRef.current.on('receiveMsg', (user: string, msg: string) => {
      setChatDatas((chatDatas: MessageType[]) => {
        return [
          ...chatDatas,
          {
            sender: user,
            msg,
            time: getCurrentTime(),
            isMe: checkMe(user)
          }
        ];
      });
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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }, [chatDatas]);

  return (
    <div css={ChatContainer}>
      <ChatBar
        title={'타이틀이 들어갈 공간입니당아아아'}
        socket={socketRef.current}
        participants={participants}
      />
      <div css={ChatLayout}>
        {chatDatas.map((chat: MessageType) => {
          return chat.isMe ? (
            <MyChatMessage msgData={chat} />
          ) : (
            <OtherChatMessage msgData={chat} />
          );
        })}
        <div key="messageEndDiv" ref={messageEndRef}></div>
      </div>
      <ChatInput socket={socketRef.current} postId={postId} userId={userId} />
    </div>
  );
}
export default Chat;
