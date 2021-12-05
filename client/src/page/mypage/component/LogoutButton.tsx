import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import Confirm from '../../../common/confirm';
import { fetchPost } from '../../../util';
import { Logout } from '@mui/icons-material';

export default function LogoutButton() {
  const [isConfirmOn, setIsConfirmOn] = useState(false);

  const handleLogout = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/login/logout`;
    await fetchPost(url, {});
    window.location.assign('/');
  };

  return (
    <div>
      <button onClick={() => setIsConfirmOn(true)} css={ButtonStyle}>
        <Logout fontSize="small" /> 로그아웃
      </button>
      <Confirm on={isConfirmOn} title="로그아웃" onCancel={() => setIsConfirmOn(false)} onConfirm={handleLogout}>
        로그아웃 하시겠습니까?
      </Confirm>
    </div>
  );
}

const ButtonStyle = css`
  color: #ff5656;
  font-weight: bold;
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 5px;
  }
`;
