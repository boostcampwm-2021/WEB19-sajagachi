import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { RouteComponentProps } from 'react-router-dom';
import { css } from '@emotion/react';
import Header, { UserType } from './component/Header';
import Content, { UrlType } from './component/Content';
import Bottom from './component/Bottom';
import { DeadLineHandle } from './component/DeadLine';
import LoadingSpinner from '../../common/loading-spinner';
import useError from '../../hook/useError';
import service from '../../util/service';
import { getRemainingDay } from '../../util/index';
import { useHistory } from 'react-router';
interface PostType {
  title: string;
  content: string;
  category: { name: string };
  capacity: number | null;
  deadline: string | null;
  urls: UrlType[];
  finished: boolean;
  participantCnt: number;
  user: UserType;
  isParticipate: boolean;
}

interface DetailType {
  postId: string;
}

export default function Detail({ match }: RouteComponentProps<DetailType>) {
  const history = useHistory();
  const [post, setPost] = useState<PostType>(INITIAL_POST_STATE);
  const [isLoad, setIsLoad] = useState(false);
  const [isNeedServerTime, setIsNeedServerTime] = useState(true);
  const [popError, RenderError] = useError();
  const deadLineRef = useRef<DeadLineHandle>();
  const eventSource = useRef<EventSource>();

  useEffect(() => {
    getPostDataAndConnectServer();
    return () => {
      eventSource.current?.close();
    };
  }, []);
  const setEventSource = (deadline: string) => {
    eventSource.current = new EventSource(`${process.env.REACT_APP_SERVER_URL}/sse`);
    const endTime = new Date(deadline);
    eventSource.current.onmessage = function (e: MessageEvent) {
      if (isNeedServerTime) setIsNeedServerTime(false);
      if (deadLineRef.current) {
        const serverTime = new Date(parseInt(e.data, 10));
        if (serverTime >= endTime) {
          deadLineRef.current.setDeadLine('기한 마감');
          setPost((prev: PostType) => {
            return { ...prev, finished: true };
          });
          eventSource.current?.close();
          return;
        } else {
          const { days, hours, minutes, seconds } = getRemainingDay(endTime, serverTime);
          deadLineRef.current.setDeadLine(`${days}일 ${hours}:${minutes}:${seconds} 남음`);
          return;
        }
      }
    };
  };
  const getPostDataAndConnectServer = async () => {
    try {
      const post = await service.getPost(Number(match.params.postId));
      if (!post.finished && post.deadline !== null) setEventSource(post.deadline);
      else setIsNeedServerTime(false);
      setIsLoad(true);
      setPost({ ...post });
    } catch (error: any) {
      setIsLoad(true);
      history.replace('/error');
    }
  };

  const {
    title,
    content,
    urls,
    capacity,
    deadline,
    finished,
    participantCnt,
    isParticipate,
    user,
    category: { name: categoryName }
  } = post;
  return (
    <>
      <RenderError />
      {isLoad ? (
        <div css={detailContainer}>
          <Card sx={ContainerCardStyle} variant="outlined">
            <CardContent>
              <Header
                title={title}
                categoryName={categoryName}
                writer={user}
                deadline={deadline}
                isNeedServerTime={isNeedServerTime}
                deadLineRef={deadLineRef}
              />
              <Content content={content} urls={urls} />
            </CardContent>
          </Card>
          <Bottom
            postId={Number(match.params.postId)}
            participantCnt={participantCnt}
            capacity={capacity}
            finished={finished}
            isParticipate={isParticipate}
            isNeedServerTime={isNeedServerTime}
            popError={popError}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

const detailContainer = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
`;

const ContainerCardStyle = {
  borderRadius: 7,
  bgcolor: '#fefafa',
  border: '1px solid #fefafa',
  pb: '4.5rem'
};

const INITIAL_POST_STATE: PostType = {
  title: '',
  content: '',
  category: { name: '' },
  urls: [],
  capacity: null,
  deadline: null,
  finished: false,
  participantCnt: 0,
  user: {
    name: '',
    img: ''
  },
  isParticipate: false
};
