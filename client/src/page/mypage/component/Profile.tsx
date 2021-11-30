import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { MonetizationOn } from '@mui/icons-material';
import ChargePointModal from './ChargePointModal';
import ReturnPointModal from './ReturnPointModal';
import LogoutButton from './LogoutButton';
import useLoginUser from '../../../hook/useLoginUser';
import service from '../../../util/service';
import useError from '../../../hook/useError';

type UserType = {
  id: number;
  name: string;
  img: string;
  point: number;
};

export default function Profile() {
  const [isChargePointModalOn, setIsChargePointModalOn] = useState(false);
  const [isReturnPointModalOn, setIsReturnPointModalOn] = useState(false);
  const [popError, RenderError] = useError();
  const loginUser = useLoginUser();
  const [user, setUser] = useState<UserType>();
  const updateUser = async (userId: number) => {
    try {
      const userData = await service.getUser(userId);
      setUser(userData);
    } catch (err: any) {
      popError(err.message);
    }
  };

  useEffect(() => {
    loginUser.isSigned && updateUser(loginUser.id);
  }, [loginUser]);

  if (!user) {
    return (
      <div style={{ height: 300 }}>
        <RenderError />
      </div>
    );
  }

  return (
    <div css={ProfileStyle}>
      <img css={ImageStyle} src={user.img} />
      <h1 css={NameStyle}>{user.name}</h1>
      <LogoutButton />
      <p css={PointStyle}>
        <MonetizationOn />
        {user.point}
      </p>
      <div css={BtnSetStyle}>
        <button css={BtnStyle('#4b976a')} onClick={() => setIsChargePointModalOn(true)}>
          충전
        </button>
        <button css={BtnStyle('#45abd7')} onClick={() => setIsReturnPointModalOn(true)}>
          반환
        </button>
      </div>
      {isChargePointModalOn && (
        <ChargePointModal onClose={() => setIsChargePointModalOn(false)} updateUser={() => updateUser(loginUser.id)} />
      )}
      {isReturnPointModalOn && (
        <ReturnPointModal onClose={() => setIsReturnPointModalOn(false)} updateUser={() => updateUser(loginUser.id)} />
      )}
    </div>
  );
}

const ProfileStyle = css`
  height: 300px;
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
