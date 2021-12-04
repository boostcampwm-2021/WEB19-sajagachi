import React from 'react';
import { css } from '@emotion/react';
import { ChatMenuDrawer } from './ChatMenuDrawer';
import { Socket } from 'socket.io-client';
import { ParticipantType } from '../../../type';
import { useHistory } from 'react-router';
import BackButton from '../../../common/back-button';

type ChatBarType = {
  title: string;
  socket: Socket;
  participants: ParticipantType[];
};

function ChatBar(props: ChatBarType) {
  return (
    <div css={ChatBarLayout}>
      <BackButton />
      <h3 css={TitleStyle}>{props.title}</h3>

      <ChatMenuDrawer socket={props.socket} participants={props.participants} />
    </div>
  );
}

const ChatBarLayout = css`
  display: flex;
  flex-direction: row;
  height: 4.4rem;
  background-color: #ebabab;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  max-width: 700px;
  padding-left: 5px;
  padding-right: 5px;

  margin: auto;
`;

const TitleStyle = css`
  color: #553e3e;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
`;

export default ChatBar;
