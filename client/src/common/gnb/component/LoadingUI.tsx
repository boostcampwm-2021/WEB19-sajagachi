import React from 'react';
import { css } from '@emotion/react';
import loadingImg from '../../../asset/loading.gif';

export default function LoadingUI() {
  return (
    <div css={LoadingUIStyle}>
      <img src={loadingImg} alt="로딩 이미지" />
      <h1>현재 위치를 찾고 있어요...</h1>
    </div>
  );
}

const LoadingUIStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    width: 150px;
  }

  & > h1 {
    font-size: 16px;
  }
`;
