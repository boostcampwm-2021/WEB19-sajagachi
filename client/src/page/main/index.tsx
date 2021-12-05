import React, { useRef } from 'react';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import useLoginUser from '../../hook/useLoginUser';
import LocationIndicator from './component/LocationIndicator';
import LoadingSpinner from '../../common/loading-spinner';
import useMainInfinite from '../../hook/useMainInfinite';
import { useHistory } from 'react-router';
import NoPost from '../../common/no-post';
import { ERROR } from '../../util/error-message';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Main() {
  const loginUser = useLoginUser();
  const loader = useRef(null);
  const { data, error, isLoadingInitialData, isLoadingMore, isEmpty, isReachingEnd } = useMainInfinite({
    fetcher,
    loader
  });
  const history = useHistory();

  if (isLoadingInitialData) return <LoadingSpinner />;

  if (error) history.replace('/error');

  return (
    <div css={mainContainer}>
      <LocationIndicator />
      {data &&
        data.map((items, index) => {
          return <PostList items={items.result} key={index} />;
        })}
      {isLoadingMore && <LoadingSpinner />}
      {!isReachingEnd && <div ref={loader} />}
      {isEmpty && <NoPost text={ERROR.NO_POST} />}
      <FAB loginUser={loginUser} />
    </div>
  );
}

const mainContainer = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
`;

const ImageStyle = css`
  width: 100%;
`;
