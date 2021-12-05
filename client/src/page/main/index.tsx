import React, { useRef } from 'react';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import ErrorAlert from './component/ErrorAlert';
import noItemImg from '../../asset/noitem.png';
import useLoginUser from '../../hook/useLoginUser';
import LocationIndicator from './component/LocationIndicator';
import LoadingSpinner from '../../common/loading-spinner';
import useMainInfinite from '../../hook/useMainInfinite';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function Main() {
  const loginUser = useLoginUser();
  const loader = useRef(null);
  const { data, error, isLoadingInitialData, isLoadingMore, isEmpty, isReachingEnd } = useMainInfinite({
    fetcher,
    loader
  });

  if (isLoadingInitialData) return <LoadingSpinner />;

  return (
    <div css={mainContainer}>
      {error && <ErrorAlert alert={error} />}
      <LocationIndicator />
      {data &&
        data.map((items, index) => {
          return <PostList items={items.result} key={index} />;
        })}
      {isLoadingMore && <LoadingSpinner />}
      {!isReachingEnd && <div ref={loader} />}
      {isEmpty && <img src={noItemImg} css={ImageStyle} alt={'noItem'} />}
      <FAB loginUser={loginUser} />
    </div>
  );
}

export default Main;

const mainContainer = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
`;
const ImageStyle = css`
  width: 100%;
`;
