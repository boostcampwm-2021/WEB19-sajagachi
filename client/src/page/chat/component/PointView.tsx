import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Socket } from 'socket.io-client';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../../store/login';
import { fetchGet, parsePath } from '../../../util';
import { ParticipantType } from '../../../type';
import Confirm from '../../../common/confirm';

type PointState = {
  socket: Socket;
  hostId: number;
  participants: ParticipantType[];
};

function PointView(props: PointState) {
  const socket = props.socket;
  const [myPoint, setMyPoint] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [purchase, setPurchase] = useState<boolean>(false);
  const [leftPoint, setLeftPoint] = useState<number>();
  const [isConfirmOn, setIsConfirmOn] = useState(false);
  const loginUser = useRecoilValue(loginUserState);
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);

  useEffect(() => {
    const me = props.participants.find(participant => {
      return participant.user.id === loginUser.id;
    }) as ParticipantType;
    if (!me) {
      setDisabled(true);
      return;
    }
    if (me.point !== null && me.point !== undefined) {
      setMyPoint(String(me.point));
      setPurchase(true);
    } else setPurchase(false);
    fetchGet(
      `${process.env.REACT_APP_SERVER_URL}/api/user/${loginUser.id}`
    ).then(data => setLeftPoint(data.point));
    setDisabled(false);
  }, [props.participants]);

  useEffect(() => {
    socket.on('purchase error', msg => {
      setDisabled(false);
      console.log(msg);
    });

    return () => {
      socket.off('purchase error');
    };
  }, []);

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);
    if (isNaN(input) || input < 0 || input % 1 !== 0) return;
    setMyPoint(e.target.value);
    if (input > 0) setDisabled(false);
    else setDisabled(true);
  };

  const handleSubmitPointBtnClick = () => {
    setDisabled(true);
    if (!purchase)
      socket.emit('point confirm', postId, loginUser.id, Number(myPoint));
    else socket.emit('point cancel', postId, loginUser.id);
  };

  return (
    <div css={PointViewStyle}>
      <h1>포인트</h1>
      <div css={PointContainer}>
        <input
          type="number"
          css={PointInputStyle}
          value={myPoint}
          onChange={handlePointChange}
          disabled={purchase}
        />
        <Button
          css={PointBtnStyle(purchase, disabled)}
          onClick={() => setIsConfirmOn(true)}
          disabled={disabled}
        >
          {purchase ? '취소' : '확정'}
        </Button>
      </div>
      <span css={leftPointStyle}>잔여 포인트 : {leftPoint}</span>
      <Confirm
        on={isConfirmOn}
        title="포인트 제출하기"
        onCancel={() => setIsConfirmOn(false)}
        onConfirm={handleSubmitPointBtnClick}
      >
        정말 {myPoint} 포인트를 내시겠습니까?
      </Confirm>
    </div>
  );
}

export default React.memo(PointView);

const PointViewStyle = css`
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

const PointBtnStyle = (purchase: boolean, disabled: boolean) => css`
  width: 15%;
  background-color: ${purchase
    ? `#b6e3e9${disabled ? '99' : ''}`
    : `#fdafab${disabled ? '99' : ''}`};
  color: white;
  &:hover {
    background-color: ${purchase ? '#b6e3e9' : '#fdafab'};
  }
`;

const leftPointStyle = css`
  font-size: 9px;
  color: #cccccc;
`;
