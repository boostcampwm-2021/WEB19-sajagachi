import React from 'react';
import useSWR from 'swr';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import PostList from '../../../common/post-list';
import { fetchGet } from '../../../util';
import { loginUserState } from '../../../store/login';

export default function MyList() {
  const loginUser = useRecoilValue(loginUserState);
  const { data, error } = useSWR(
    `${
      process.env.REACT_APP_SERVER_URL
    }/api/user/${67548567}/participationPosts`,
    fetchGet
  );
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <PostList items={data} />
    </div>
  );
}
