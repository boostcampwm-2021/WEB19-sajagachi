import React from 'react';
import { css } from '@emotion/react';
import githubIcon from '../../asset/github.svg';
import IconButton from '@mui/material/IconButton';
import loginTextImg from '../../asset/loginText.png';

type ModalState = {
  setIsLoginModalOn: (isLoginModalOn: boolean) => void;
};

function LoginModal({ setIsLoginModalOn }: ModalState) {
  function handleLoginBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    setIsLoginModalOn(false);
    window.location.assign(url);
  }

  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setIsLoginModalOn(false);
  }

  return (
    <div css={modalBackground} onClick={handleOutsideClick} className="modal_background">
      <div css={modal}>
        <img src={loginTextImg} alt="로그인" css={loginText} />
        <IconButton css={loginButton} onClick={handleLoginBtnClick}>
          <img src={githubIcon} alt="로그인" css={githubImage}></img>
        </IconButton>
      </div>
    </div>
  );
}

export default LoginModal;

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 2;
`;

const modal = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border: 0px solid;
  border-radius: 2000px;
  background-color: white;
`;

const loginText = css`
  width: 32%;
  margin-bottom: 10px;
`;

const loginButton = css`
  width: 50%;
  height: 50%;
`;

const githubImage = css`
  width: 90%;
  height: 90%;
`;
