import React, { useState } from 'react';
import { css } from '@emotion/react';
import { MonetizationOn } from '@mui/icons-material';
import crown from '../../../asset/crown.svg';
import { parsePath } from '../../../util';
import Confirm from '../../../common/confirm';
import { Socket } from 'socket.io-client';
import { ParticipantType } from '../../../type';
import useLoginUser from '../../../hook/useLoginUser';

export function UserList({
  socket,
  hostId,
  participants
}: {
  socket: Socket;
  hostId: number;
  participants: ParticipantType[];
}) {
  const loginUser = useLoginUser();
  return (
    <div css={UserListStyle}>
      <h1>참여자 ({participants.length}명)</h1>
      <ul>
        {participants.map(user => (
          <UserListItem key={user.user.id} item={user} myId={loginUser.id} hostId={hostId} socket={socket} />
        ))}
      </ul>
    </div>
  );
}

function UserListItem({
  item,
  myId,
  hostId,
  socket
}: {
  item: ParticipantType;
  myId: number;
  hostId: number;
  socket: Socket;
}) {
  const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);
  const [isConfirmOn, setIsConfirmOn] = useState(false);
  const handleUserKick = () => {
    socket.emit('kickUser', postId, item.user.id);
    setIsConfirmOn(false);
  };

  return (
    <li css={UserListItemStyle}>
      {hostId === item.user.id && <img src={crown} css={UserHostCrownStyle} />}
      <img src={item.user.img} css={UserAvatarStyle} />
      <p css={UserNameStyle}>{item.user.name}</p>
      {hostId === myId && hostId !== item.user.id && (
        <button css={UserKickBtnStyle} onClick={() => setIsConfirmOn(true)}>
          내보내기
        </button>
      )}
      {item.point && (
        <div css={UserPointStyle}>
          <MonetizationOn />
          <p>{item.point}</p>
        </div>
      )}
      <Confirm
        on={isConfirmOn}
        title="사용자 내보내기"
        onCancel={() => setIsConfirmOn(false)}
        onConfirm={handleUserKick}
      >
        정말 사용자를 채팅에서 내보내시겠습니까?
      </Confirm>
    </li>
  );
}

const UserListStyle = css`
  width: 95%;
  padding: 0 10px;
  flex-grow: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;

  & > h1 {
    font-family: 'Noto Sans KR Medium', sans-serif;
    font-size: 16px;
  }

  & > ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    overflow-y: scroll;
  }
`;

const UserListItemStyle = css`
  display: flex;
  align-items: center;
  margin: 15px 0;
  position: relative;
`;

const UserHostCrownStyle = css`
  width: 20px;
  position: absolute;
  left: 2px;
  top: -13px;
`;

const UserKickBtnStyle = css`
  font-size: 10px;
  color: #f76a6a;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
`;

const UserAvatarStyle = css`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const UserNameStyle = css`
  margin: 0 7px;
  font-size: 14px;
`;

const UserPointStyle = css`
  display: flex;
  margin-left: auto;
  & > p {
    margin: 0 0 0 3px;
  }
`;
