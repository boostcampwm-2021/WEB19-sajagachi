import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import Profile from './component/Profile';
import MyList from './component/MyList';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../store/login';
import { fetchGet } from '../../util';
import footprintImg from '../../asset/footprint.png';
import useLoginUser from '../../hook/useLoginUser';

const MyPageStyle = css`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  background-image: url('${footprintImg}');
  background-repeat: no-repeat;
  background-position: 50% 15px;
  background-size: 90%;
`;

export default function MyPage() {
  useLoginUser();

  return (
    <div css={MyPageStyle}>
      <Profile />
      <MyList />
    </div>
  );
}
