import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Close } from '@mui/icons-material';
import { UserList } from './UserList';
import PointView from './PointView';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';
import { fetchGet, parsePath } from '../../../util';
import { ParticipantType } from '../../../type';
import { getCookie } from '../../../util/cookie';
import Confirm from '../../../common/confirm';
import { useHistory } from 'react-router';

const ChatMenuStyle = css`
  width: 300px;
  height: 100vh;
  padding-top: 30px;
  @media (max-width: 300px) {
    width: 100vw;
  }
`;

const CloseBtnStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const QuitBtnContainerStyle = css`
  position: absolute;
  bottom: 10px;
  left: 5px;
  right: 5px;
  text-align: center;
`;

const QuitBtnStyle = css`
  width: 95%;
  color: #ffffff;
  background-color: #f76a6a;
  &:hover {
    background-color: #f76a6a;
  }
`;

type propsType = {
  onCloseBtnClicked: Function;
  socket: Socket;
  participants: ParticipantType[];
};

export function ChatMenu(props: propsType) {
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);
  const [hostId, setHostId] = useState<number>(-1);
  const [isConfirmOn, setIsConfirmOn] = useState(false);
  const history = useHistory();

  const updateHostId = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/host`;
    const result = await fetchGet(url);
    setHostId(result);
  };

  useEffect(() => {
    updateHostId();
  }, []);

  const handleQuitClick = () => {
    props.socket.emit('quitRoom', getCookie('user'), postId);
    setIsConfirmOn(false);
    history.push(`/post/${postId}`);
  };

  return (
    <div css={ChatMenuStyle}>
      <Close css={CloseBtnStyle} onClick={() => props.onCloseBtnClicked()} />
      <UserList
        socket={props.socket}
        hostId={hostId}
        participants={props.participants}
      />
      <PointView socket={props.socket} />
      <div css={QuitBtnContainerStyle}>
        <Button css={QuitBtnStyle} onClick={() => setIsConfirmOn(true)}>
          나가기
        </Button>
      </div>
      <Confirm
        on={isConfirmOn}
        title="채팅방 나가기"
        onCancel={() => setIsConfirmOn(false)}
        onConfirm={handleQuitClick}
      >
        정말 채팅방을 나가시겠습니까?
      </Confirm>
    </div>
  );
}
