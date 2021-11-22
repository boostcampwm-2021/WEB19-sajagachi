import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { MonetizationOn } from '@mui/icons-material';

const ProfileStyle = css`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
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

export default function Profile() {
  return (
    <div css={ProfileStyle}>
      <img
        css={ImageStyle}
        src="https://imgix.bustle.com/rehost/2016/9/13/cdeb5e9c-34ac-4ba0-96a6-a878a5187414.png"
      />
      <h1 css={NameStyle}>Simba</h1>
      <p css={PointStyle}>
        <MonetizationOn /> 50000
      </p>
      <div css={BtnSetStyle}>
        <button css={BtnStyle('#4b976a')}>충전</button>
        <button css={BtnStyle('#45abd7')}>반환</button>
      </div>
    </div>
  );
}
