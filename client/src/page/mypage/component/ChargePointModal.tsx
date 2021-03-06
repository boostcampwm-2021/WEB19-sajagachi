import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../../store/login';
import service from '../../../util/service';
import useError from '../../../hook/useError';

type ChargePointModalProps = {
  onClose: () => void;
  updateUser: () => Promise<void>;
};

export default function ChargePointModal(props: ChargePointModalProps) {
  const loginUser = useRecoilValue(loginUserState);
  const [point, setPoint] = useState('');
  const [popError, RenderError] = useError();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoint(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    service
      .updatePoint(loginUser.id, +point)
      .then(() => {
        props.updateUser();
        props.onClose();
      })
      .catch(err => popError(err.message));
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) props.onClose();
  };

  return (
    <div css={PointModalBgStyle} onClick={handleOutsideClick}>
      <RenderError />
      <div css={PointModalStyle}>
        <h1 css={TitleStyle}>포인트 충전</h1>
        <form onSubmit={handleSubmit}>
          <input type="number" value={point} onChange={handleChange} css={InputNumberStyle} min="1" step="1" required />
          <Button type="submit" css={SubmitStyle}>
            충전
          </Button>
        </form>
      </div>
    </div>
  );
}

const PointModalBgStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 1;
`;

const PointModalStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  width: 90%;
  padding: 30px 0;
  border-radius: 10px;
  background-color: #ffffff;
`;

const TitleStyle = css`
  margin: 0 0 20px 0;
  font-size: 20px;
`;

const InputNumberStyle = css`
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

const SubmitStyle = css`
  margin-left: 10px;
  width: 15%;
  background-color: #fdafab;
  color: white;
  &:hover {
    background-color: #fdafab;
  }
`;
