import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { createQueryString, decomposeQueryString, fetchGet } from '../../util';
import ErrorAlert from './component/ErrorAlert';
import noItemImg from '../../asset/noitem.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import { locationState } from '../../store/location';
import LocationIndicator from './component/LocationIndicator';
import { loginUserState } from '../../store/login';
import LoadingSpinner from '../../common/loading-spinner';
import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function Main() {
  const location = useRecoilValue(locationState);
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const observerRef = useRef<IntersectionObserver>();
  const loader = useRef(null);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    const filter = decomposeQueryString(window.location.search);
    return (
      `${process.env.REACT_APP_SERVER_URL}/api/post?` +
      createQueryString({
        offset: pageIndex * 15,
        limit: 15,
        lat: location.lat,
        long: location.lng,
        ...filter
      })
    );
  };
  const { data = [], error, size, setSize } = useSWRInfinite(getKey, fetcher, { initialSize: 0, revalidateAll: true });
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 15);

  useEffect(() => {
    if (isReachingEnd && observerRef.current && loader.current) observerRef.current.unobserve(loader.current);
  }, [isReachingEnd]);

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

  const handleObserver: IntersectionObserverCallback = (entry, observer) => {
    const target = entry[0];
    if (target.isIntersecting) {
      observer.unobserve(target.target);
      setSize(prev => prev + 1).finally(() => {
        observer.observe(target.target);
      });
    }
  };
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (loader.current) observerRef.current.observe(loader.current);
    return () => {
      if (observerRef.current && loader.current) observerRef.current.unobserve(loader.current);
    };
  }, [window.location.search, location]);

  if (isLoadingInitialData) return <LoadingSpinner />;
  const items = data ? [].concat(...data) : [];
  return (
    <div css={mainContainer}>
      {error && <ErrorAlert alert={error} />}
      <LocationIndicator />
      <PostList items={items} />;{isLoadingMore && <LoadingSpinner />}
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
