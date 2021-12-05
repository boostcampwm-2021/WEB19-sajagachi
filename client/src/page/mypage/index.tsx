import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import Profile from './component/Profile';
import MyList from './component/MyList';
import footprintImg from '../../asset/footprint.png';
import useLoginUser from '../../hook/useLoginUser';
import { useHistory } from 'react-router';

export default function MyPage() {
  const history = useHistory();
  const loginUser = useLoginUser();
  useEffect(() => {
    if (!loginUser.isSigned) history.replace('/error');
  }, []);

  return (
    <div css={MyPageStyle}>
      <Profile />
      <MyList />
    </div>
  );
}

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
