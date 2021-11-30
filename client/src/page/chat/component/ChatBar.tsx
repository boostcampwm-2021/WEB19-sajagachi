import React from 'react';
import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ChatMenuDrawer } from './ChatMenuDrawer';
import { Socket } from 'socket.io-client';
import { ParticipantType } from '../../../type';
import { useHistory } from 'react-router';
import { IconButton } from '@mui/material';
const ChatBarLayout = css`
  display: flex;
  flex-direction: row;
  height: 4.4rem;
  background-color: #ebabab;
  justify-content: space-between;
  z-index: 2;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  max-width: 700px;
  margin: auto;
`;

const TitleStyle = css`
  padding-top: 23px;
  font-size: 18px;
`;

type ChatBarType = {
  title: string;
  socket: Socket;
  participants: ParticipantType[];
};

function ChatBar(props: ChatBarType) {
  const history = useHistory();
  const backButtonHandler = () => {
    history.goBack();
  };
  return (
    <div css={ChatBarLayout}>
      <IconButton
        aria-label="go back"
        onClick={backButtonHandler}
        sx={{
          width: '2.43rem',
          height: '2.43rem',
          marginTop: '15px'
        }}
      >
        <ArrowBackIosNewIcon
          sx={{
            width: '1.9rem',
            height: '1.9rem',
            color: '#FFFFFF'
          }}
        />
      </IconButton>
      <div css={TitleStyle}>{props.title}</div>

      <ChatMenuDrawer socket={props.socket} participants={props.participants} />
    </div>
  );
}

export default ChatBar;
