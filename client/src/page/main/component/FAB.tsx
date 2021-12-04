import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';
import LoginModal from '../../../common/login-modal';
import { LoginUserType } from '../../../type';

const FabStyle = css`
  position: fixed;
  right: 30px;
  bottom: 30px;
  @media (min-width: 700px) {
    right: calc(50vw - 350px + 30px);
  }
`;

export default function FAB({ loginUser }: { loginUser: LoginUserType }) {
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const history = useHistory();

  const handleFabClick = () => {
    if (!loginUser.isSigned) setIsLoginModalOn(true);
    else history.push('/post');
  };

  return (
    <>
      <Fab css={FabStyle} sx={{ backgroundColor: '#ebabab' }} aria-label="edit" onClick={handleFabClick}>
        <EditIcon sx={{ color: '#ffffff' }} />
      </Fab>
      {isLoginModalOn && <LoginModal setIsLoginModalOn={setIsLoginModalOn} />}
    </>
  );
}
