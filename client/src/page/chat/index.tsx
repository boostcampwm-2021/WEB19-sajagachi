import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
import ChatInput from './component/ChatInput';
import MyChatMessage from './component/MyChatMessage';
import OtherChatMessage from './component/OtherChatMsg';
import io from 'socket.io-client';
import { fetchGet, getCurrentTime, parsePath } from '../../util';
import { ParticipantType } from '../../type';

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
  const userId2 = '121212';
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);
  const socketRef = useRef<any>(io(String(process.env.REACT_APP_SERVER_URL)));
  const [chatDatas, setChatDatas] = useState<any>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [userMe, setUserMe] = useState<ParticipantType>();
  const [participants, setParticipants] = useState<ParticipantType[]>([]);

  const checkMe = (sender: string) => {
    console.log(userMe);
    return sender === String(userMe?.user.id);
  };

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
      setUserMe(participantMe);
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
    socketRef.current.on('receiveMsg', (user: string, msg: string) => {
      setChatDatas((chatDatas: MessageType[]) => {
        console.log('user: ', user);
        console.log(typeof user);
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
      <ChatInput
        socket={socketRef.current}
        postId={postId}
        userId={String(userMe?.user.id)}
      />
    </div>
  );
}
export default Chat;
