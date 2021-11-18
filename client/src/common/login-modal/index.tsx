import React, { useState } from 'react';
import { css } from '@emotion/react';
import githubButton from '../../asset/github-button.png';
import githubIcon from '../../asset/github.svg';
import IconButton from '@mui/material/IconButton';
import { fetchGet, fetchPost } from '../../util';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../store/login';
import { LoginUserType } from '../../type';
import { useHistory } from 'react-router';

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
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
  color: #ce9393;
  font-family: 'Gugi', cursive;
  margin-bottom: 30px;
`;

const InputText = css`
  border: 2px solid #ce9393;
  border-radius: 16px;
  box-sizing: border-box;
  box-shadow: none;
  width: 40%;
  height: 40px;
  background: transparent;
  outline: none;
  color: #000000;
  font-size: 16px;
  overflow: hidden;
  padding: 10px;
  text-align: center;
`;

const loginButton = css`
  width: 40%;
  height: 40%;
`;

const githubImage = css`
  width: 90%;
  height: 90%;
`;

type ModalState = {
  setIsLoginModalOn: (isLoginModalOn: boolean) => void;
};

function LoginModal({ setIsLoginModalOn }: ModalState) {
  const history = useHistory();
  const [id, setId] = useState<string>();
  const [loginUser, setLoginUser] =
    useRecoilState<LoginUserType>(loginUserState);

  function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function handleLoginBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/login`;
    fetchPost(url, { userId: id }).then(data => {
      if (!isNaN(data.id)) {
        setLoginUser({ id: data.id, name: data.name, isSigned: true });
        setIsLoginModalOn(false);
        history.push('/');
      }
    });
  }

  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setIsLoginModalOn(false);
  }

  return (
    <div
      css={modalBackground}
      onClick={handleOutsideClick}
      className="modal_background"
    >
      <div css={modal}>
        <h1 css={loginText}>로그인</h1>
        <input
          type="text"
          css={InputText}
          onChange={handleIdChange}
          value={id}
        />
        <IconButton css={loginButton} onClick={handleLoginBtnClick}>
          <img src={githubIcon} alt="로그인" css={githubImage}></img>
        </IconButton>
      </div>
    </div>
  );
}

export default LoginModal;
