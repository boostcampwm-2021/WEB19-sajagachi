import React from 'react';
import { css } from '@emotion/react';

const FinishedPointViewStyle = css`
  width: 95%;
  margin-bottom: 90px;
  padding: 0 10px;
  display: flex;
  justify-content: center;

  & > h2 {
    font-family: 'Noto Sans KR Medium', sans-serif;
    font-size: 24px;
  }
`;

function FinishedPointView() {
  return (
    <div css={FinishedPointViewStyle}>
      <h2>거래가 종료되었습니다</h2>
    </div>
  );
}

export default FinishedPointView;
