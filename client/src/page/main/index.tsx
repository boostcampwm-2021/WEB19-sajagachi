import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { fetchGet } from '../../util';
import ErrorAlert from './component/ErrorAlert';
import noItemImg from '../../asset/noitem.png';
import { useRecoilState } from 'recoil';
import LocationIndicator from './component/LocationIndicator';
import { loginUserState } from '../../store/login';
import LoadingSpinner from '../../common/loading-spinner';
import useMainInfinite from '../../hook/useMainInfinite';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function Main() {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const loader = useRef(null);
  const { data, error, isLoadingInitialData, isLoadingMore, isEmpty, isReachingEnd } = useMainInfinite({
    fetcher,
    loader
  });

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

  if (isLoadingInitialData) return <LoadingSpinner />;
  const items = data ? [].concat(...data) : [];
  return (
    <div css={mainContainer}>
      {error && <ErrorAlert alert={error} />}
      <LocationIndicator />
      <PostList items={items} />
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
