import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { MonetizationOn } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../../store/login';
import { fetchGet } from '../../../util';

const ProfileStyle = css`
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageStyle = css`
  width: 105px;
  height: 105px;
  object-fit: cover;
  border: 3px solid #cecece;
  border-radius: 50%;
`;

const NameStyle = css`
  margin: 5px 0 0 0;
  font-family: 'Noto Sans KR Medium', sans-serif;
  font-size: 30px;
`;

const PointStyle = css`
  margin: 8px 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  & > * {
    margin-right: 3px;
  }
`;

const BtnSetStyle = css`
  width: 105px;
  display: flex;
  justify-content: space-between;
`;

const BtnStyle = (color: string) => css`
  width: 50px;
  height: 25px;
  background-color: ${color};
  color: #ffffff;
  border-radius: 20px;
  border: none;
`;

type UserType = {
  id: number;
  name: string;
  img: string;
  point: number;
};

export default function Profile() {
  const loginUser = useRecoilValue(loginUserState);
  const [user, setUser] = useState<UserType>();
  const updateUser = async (userId: number) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/user/${userId}`;
    const userData = await fetchGet(url);
    setUser(userData);
  };

  useEffect(() => {
    loginUser.isSigned && updateUser(loginUser.id);
  }, [loginUser]);

  if (!user) {
    return <div css={ProfileStyle}></div>;
  }

  return (
    <div css={ProfileStyle}>
      <img css={ImageStyle} src={user.img} />
      <h1 css={NameStyle}>{user.name}</h1>
      <p css={PointStyle}>
        <MonetizationOn />
        {user.point}
      </p>
      <div css={BtnSetStyle}>
        <button css={BtnStyle('#4b976a')}>충전</button>
        <button css={BtnStyle('#45abd7')}>반환</button>
      </div>
    </div>
  );
}
