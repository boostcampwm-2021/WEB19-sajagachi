import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Close } from '@mui/icons-material';
import { UserList } from './UserList';
import PointView from './PointView';
import HostPointView from './HostPointView';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';
import { parsePath } from '../../../util';
import { ParticipantType } from '../../../type';
import Confirm from '../../../common/confirm';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../../store/login';
import FinishedPointView from './FinishedPointView';
import service from '../../../util/service';
import useError from '../../../hook/useError';

type propsType = {
  onCloseBtnClicked: Function;
  socket: Socket;
  participants: ParticipantType[];
};

export function ChatMenu(props: propsType) {
  const FINISHED = 0;
  const HOST = 1;
  const NOT_HOST = 2;

  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);
  const [hostId, setHostId] = useState<number>(-1);
  const loginUser = useRecoilValue(loginUserState);
  const [pointViewState, setPointViewState] = useState(NOT_HOST);
  const [isConfirmOn, setIsConfirmOn] = useState(false);
  const history = useHistory();
  const [popError, RenderError] = useError();

  const updateHostId = async () => {
    try {
      const result = await service.getHost(postId);
      if (+result === loginUser.id) setPointViewState(HOST);
      setHostId(result);
    } catch (err: any) {
      popError(err.message);
    }
  };

  const updateFinished = async () => {
    try {
      const { finished } = await service.getFinished(postId);
      if (finished) setPointViewState(FINISHED);
    } catch (err: any) {
      popError(err.message);
    }
  };

  useEffect(() => {
    updateHostId();
    updateFinished();

    props.socket.on('finishPost', () => {
      setPointViewState(FINISHED);
    });

    return () => {
      props.socket.off('finishPost');
    };
  }, []);

  const isQuitBtnDisabled = () => {
    if (loginUser.id === hostId) return true;
    else if (pointViewState === FINISHED) return true;
    return false;
  };

  const handleQuitClick = () => {
    isQuitBtnDisabled() || setIsConfirmOn(true);
  };

  const handleQuitConfirm = () => {
    props.socket.emit('quitRoom', postId);
    setIsConfirmOn(false);
    history.replace(`/post/${postId}`);
    history.goBack();
  };

  return (
    <div css={ChatMenuStyle}>
      <RenderError />
      <Close css={CloseBtnStyle} onClick={() => props.onCloseBtnClicked()} />
      <UserList socket={props.socket} hostId={hostId} participants={props.participants} />
      {
        [
          <FinishedPointView />,
          <HostPointView socket={props.socket} hostId={hostId} participants={props.participants} />,
          <PointView socket={props.socket} hostId={hostId} participants={props.participants} />
        ][pointViewState]
      }

      <Button css={QuitBtnStyle(isQuitBtnDisabled())} onClick={handleQuitClick}>
        나가기
      </Button>
      <Confirm
        on={isConfirmOn}
        title="채팅방 나가기"
        onCancel={() => setIsConfirmOn(false)}
        onConfirm={handleQuitConfirm}
      >
        정말 채팅방을 나가시겠습니까?
      </Confirm>
    </div>
  );
}

const ChatMenuStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
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

const QuitBtnStyle = (finished: boolean) => css`
  width: 95%;
  margin-bottom: 10px;
  color: #ffffff;
  background-color: #f76a6a;
  &:hover {
    background-color: #f76a6a;
  }

  ${finished
    ? `
    background-color: #cfcfcf;
    &:hover {
      background-color: #cfcfcf;
    }
    `
    : ''}
`;
