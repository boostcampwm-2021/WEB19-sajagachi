import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Socket } from 'socket.io-client';
import Button from '@mui/material/Button';
import { fetchGet, parsePath } from '../../../util';
import { ParticipantType } from '../../../type';

const HostPointViewStyle = css`
  width: 95%;
  margin-bottom: 90px;
  padding: 0 15px;

  & > h1 {
    font-family: 'Noto Sans KR Medium', sans-serif;
    font-size: 16px;
  }

  & > ul {
    list-style: none;
    padding-left: 0;
  }
`;

const PointContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PointInputStyle = css`
  border: 0px solid;
  border-bottom: 2px solid #f97d63;
  box-sizing: border-box;
  box-shadow: none;
  width: 70%;
  height: 40px;
  background: transparent;
  outline: none;
  color: #000000;
  font-size: 16px;
  overflow: hidden;
  padding: 10px;
  &:-webkit-outer-spin-button,
  &:-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PointBtnStyle = (disabled: boolean) => css`
  width: 100%;
  background-color: ${disabled ? `#b6e3e9` : `#fdafab`};
  color: white;
  &:hover {
    background-color: ${disabled ? '#b6e3e9' : '#fdafab'};
  }
`;

type PointState = {
  socket: Socket;
  hostId: number;
  participants: ParticipantType[];
};

function HostPointView(props: PointState) {
  const socket = props.socket;
  const [allPoint, setAllPoint] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [finished, setFinished] = useState(false);
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);

  const isAllReady = (participantss: ParticipantType[]) => {
    return (
      participantss.length > 1 &&
      participantss.every(participant => {
        return (
          participant.user.id === +props.hostId || Number(participant.point) > 0
        );
      })
    );
  };
  const setBtn = () => {
    if (isAllReady(props.participants)) setDisabled(false);
    else setDisabled(true);
  };

  useEffect(() => {
    setBtn();
    setAllPoint(
      props.participants.reduce((sum, cur) => {
        return sum + Number(cur.point);
      }, 0)
    );
  }, [props.participants]);

  useEffect(() => {
    setBtn();
    setFinished(false);
  });

  const handlePointBtnClick = () => {
    socket.emit(`post finish`, postId);
    setDisabled(false);
    setFinished(true);
  };

  return (
    <div css={HostPointViewStyle}>
      <h1>포인트</h1>
      <div css={PointContainer}>
        <Button
          css={PointBtnStyle(disabled)}
          onClick={handlePointBtnClick}
          disabled={disabled}
        >
          {!disabled
            ? `${allPoint} 포인트 회수`
            : `${finished ? '공구 완료!' : '아직 불가능!'}`}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(HostPointView);
//
