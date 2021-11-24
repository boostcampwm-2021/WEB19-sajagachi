import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Socket } from 'socket.io-client';
import Button from '@mui/material/Button';
import { parsePath } from '../../../util';
import { ParticipantType } from '../../../type';
import Confirm from '../../../common/confirm';

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
  const [isConfirmOn, setIsConfirmOn] = useState(false);
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);

  const isAllReady = (participantss: ParticipantType[]) => {
    return (
      participantss.length > 1 &&
      participantss.every(participant => {
        return participant.user.id === +props.hostId || Number(participant.point) > 0;
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
    socket.on('finishError', console.log);

    return () => {
      socket.off('finishError');
    };
  });

  const handleTakePointBtnClick = () => {
    setIsConfirmOn(false);
    socket.emit(`takePoint`, postId);
    setDisabled(false);
    setFinished(true);
  };

  return (
    <div css={HostPointViewStyle}>
      <h1>포인트</h1>
      <div css={PointContainer}>
        <Button css={PointBtnStyle(disabled)} onClick={() => setIsConfirmOn(true)} disabled={disabled}>
          {!disabled ? `${allPoint} 포인트 회수` : `${finished ? '공구 완료!' : '아직 불가능!'}`}
        </Button>
      </div>
      <Confirm
        on={isConfirmOn}
        title="포인트 가져오기"
        onCancel={() => setIsConfirmOn(false)}
        onConfirm={handleTakePointBtnClick}
      >
        정말 {allPoint} 포인트를 가져오시겠습니까?
      </Confirm>
    </div>
  );
}

export default React.memo(HostPointView);
//
const HostPointViewStyle = css`
  width: 95%;
  margin-bottom: 90px;
  padding: 0 10px;

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

const PointBtnStyle = (disabled: boolean) => css`
  width: 100%;
  background-color: ${disabled ? `#b6e3e9` : `#fdafab`};
  color: white;
  &:hover {
    background-color: ${disabled ? '#b6e3e9' : '#fdafab'};
  }
`;
