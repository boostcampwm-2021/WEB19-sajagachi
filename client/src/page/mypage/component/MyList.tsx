import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import PostList from '../../../common/post-list';
import { fetchGet } from '../../../util';
import { loginUserState } from '../../../store/login';
import LoadingSpinner from '../../../common/loading-spinner';
import NoPosts from './NoPosts';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MyList() {
  const loginUser = useRecoilValue(loginUserState);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.result) return null; // 끝에 도달
    if (pageIndex === 0)
      return `${process.env.REACT_APP_SERVER_URL}/api/user/${loginUser.id}/participationPosts?limit=${LIMIT_SIZE}`;

    return `${process.env.REACT_APP_SERVER_URL}/api/user/${loginUser.id}/participationPosts?cursor=${previousPageData.nextCursor}&limit=${LIMIT_SIZE}`; // SWR 키
  };
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.result.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].result.length < LIMIT_SIZE);
  if (!data) return <LoadingSpinner />;
  return (
    <div style={{ paddingBottom: '10px' }}>
      <h3 style={{ textAlign: 'center' }}>참여한 공동구매</h3>
      {isEmpty && <NoPosts />}
      {data.map((items, index) => {
        return <PostList items={items.result} key={index} />;
      })}
      {isLoadingMore && <LoadingSpinner />}
      {!isLoadingMore && !isReachingEnd && (
        <button css={BtnStyle('#f76a6a')} onClick={() => setSize(size + 1)}>
          더 보기 ▼
        </button>
      )}
    </div>
  );
}

const BtnStyle = (color: string) => css`
  display: block;
  width: 100px;
  margin: 0 auto;
  height: 25px;
  background-color: ${color};
  color: #ffffff;
  border-radius: 20px;
  border: none;
`;

const LIMIT_SIZE = 4;
