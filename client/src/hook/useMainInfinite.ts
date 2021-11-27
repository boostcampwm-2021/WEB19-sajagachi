import { RefObject, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { locationState } from '../store/location';
import { createQueryString, decomposeQueryString } from '../util';
import useSWRInfinite from 'swr/infinite';

const useMainInfinite = ({ fetcher, loader }: { fetcher: any; loader: RefObject<HTMLDivElement> }) => {
  const observerRef = useRef<IntersectionObserver>();
  const location = useRecoilValue(locationState);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    const filter = decomposeQueryString(window.location.search);
    return (
      `${process.env.REACT_APP_SERVER_URL}/api/post?` +
      createQueryString({
        offset: pageIndex * POST_LIMIT_SIZE,
        limit: POST_LIMIT_SIZE,
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
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < POST_LIMIT_SIZE);

  useEffect(() => {
    if (isReachingEnd && observerRef.current && loader.current) observerRef.current.unobserve(loader.current);
  }, [isReachingEnd]);

  useEffect(() => {
    if (isReachingEnd && observerRef.current && loader.current) observerRef.current.unobserve(loader.current);
  }, [isReachingEnd]);

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

  return {
    data,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd
  };
};

export default useMainInfinite;

const POST_LIMIT_SIZE = 15;
