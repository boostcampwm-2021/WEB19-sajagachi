import React from 'react';
import { css } from '@emotion/react';
import errorImg from '../../asset/error.png';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div css={ErrorPageStyle}>
      <img src={errorImg} alt="error" />
      <h3>에러가 발생하였습니다</h3>
      <Link to="/" css={LinkStyle}>
        홈으로
      </Link>
    </div>
  );
}

const ErrorPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  & > img {
    width: 200px;
  }
`;

const LinkStyle = css`
  text-decoration: none;
  color: #f76a6a;
`;
