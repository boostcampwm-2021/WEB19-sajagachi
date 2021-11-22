import React from 'react';
import { css } from '@emotion/react';

const FinishedPointViewStyle = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 95%;
  bottom: 120px;
  padding: 0 15px;

  & > h1 {
    font-family: 'Noto Sans KR Medium', sans-serif;
    font-size: 24px;
  }

  & > ul {
    list-style: none;
    padding-left: 0;
  }
`;

function FinishedPointView() {
  return (
    <div css={FinishedPointViewStyle}>
      <h1>거래가 종료되었습니다</h1>
    </div>
  );
}

export default FinishedPointView;
