import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import Profile from './component/Profile';
import MyList from './component/MyList';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../store/login';
import { fetchGet } from '../../util';

export default function MyPage() {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  useEffect(() => {
    if (!loginUser.isSigned) {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/login`;
      fetchGet(url).then(userLogin => {
        if (!isNaN(userLogin.id)) {
          setLoginUser({
            id: userLogin.id,
            name: userLogin.name,
            isSigned: true
          });
        }
      });
    }
  }, []);

  return (
    <div>
      <Profile />
      <MyList />
    </div>
  );
}
