import React, { useState } from 'react';
import { css } from '@emotion/react';
import { SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChatMenu } from './ChatMenu';
import { Socket } from 'socket.io-client';
import { ParticipantType } from '../../../type';
import { IconButton } from '@mui/material';

type propsType = {
  socket: Socket;
  participants: ParticipantType[];
};

export function ChatMenuDrawer(props: propsType) {
  const [isMenuOn, setIsMenuOn] = useState(false);
  const toggleDrawer = () => setIsMenuOn(!isMenuOn);

  return (
    <>
      <IconButton
        aria-label="chat menu"
        sx={{
          width: '2.43rem',
          height: '2.43rem'
        }}
        onClick={toggleDrawer}
      >
        <MenuIcon
          sx={{
            width: '1.9rem',
            height: '1.9rem',
            color: '#FFFFFF'
          }}
        />
      </IconButton>
      {isMenuOn && <div css={BlurredBackground}></div>}
      <SwipeableDrawer anchor="right" open={isMenuOn} onClose={toggleDrawer} onOpen={toggleDrawer}>
        <ChatMenu
          onCloseBtnClicked={() => setIsMenuOn(false)}
          socket={props.socket}
          participants={props.participants}
        />
      </SwipeableDrawer>
    </>
  );
}

const BlurredBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
`;
