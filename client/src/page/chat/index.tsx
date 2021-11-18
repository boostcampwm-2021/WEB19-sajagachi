import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
import ChatInput from './component/ChatInput';
import ChatList from './component/ChatList';
import io from 'socket.io-client';

const ChatContainer = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  height: 100%;
  position: relative;
`;

function Chat(props: any) {
  const userId = props.location.state.userId;
  const postId = props.location.state.postId;

  const socketRef = useRef<any>(io(String(process.env.REACT_APP_SERVER_URL)));

  useEffect(() => {
    socketRef.current.emit('joinRoom', postId, userId);
    socketRef.current.on('afterJoin', (msg: string) => {
      console.log(msg);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div css={ChatContainer}>
      <ChatBar
        title={'타이틀이 들어갈 공간입니당아아아'}
        socket={socketRef.current}
      />
      <ChatList postId={postId} userId={userId} socket={socketRef.current} />
      <ChatInput socket={socketRef.current} postId={postId} userId={userId} />
    </div>
  );
}
export default Chat;
