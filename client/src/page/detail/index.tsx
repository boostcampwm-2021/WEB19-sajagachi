import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { RouteComponentProps } from 'react-router-dom';
import { css } from '@emotion/react';
import Header from './component/Header';
import Content from './component/Content';
import Bottom from './component/Bottom';
import { DeadLineHandle } from './component/DeadLine';
import useError from '../../hook/useError';
import service from '../../util/service';
import LoadingSpinner from '../../common/loading-spinner';

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

interface UrlType {
  url: string;
}

interface UserType {
  name: string;
  img: string;
}

interface DetailType {
  postId: string;
}

export default function Detail({ match }: RouteComponentProps<DetailType>) {
  const [isLoad, setIsLoad] = useState(false);
  const [isNeedServerTime, setIsNeedServerTime] = useState(true);
  const deadLineRef = useRef<DeadLineHandle>();
  const [popError, RenderError] = useError();
  const [post, setPost] = useState<PostType>(INITIAL_POST_STATE);

  useEffect(() => {
    const setEventSourve = async (es: EventSource | null) => {
      try {
        const post = await service.getPost(Number(match.params.postId));
        if (!post.finished && post.deadline !== null) {
          es = new EventSource(`${process.env.REACT_APP_SERVER_URL}/sse`);
          es.onmessage = function (e: MessageEvent) {
            if (isNeedServerTime) {
              setIsNeedServerTime(false);
            }
            if (deadLineRef.current) {
              const end = new Date(post.deadline);
              const server = new Date(parseInt(e.data, 10));
              if (server >= end) {
                deadLineRef.current.setDeadLine('기한 마감');
                setPost({ ...post, finished: true });
                es && es.close();
                return;
              } else {
                const t = end.getTime() - server.getTime();
                const seconds = ('0' + Math.floor((t / 1000) % 60)).slice(-2);
                const minutes = ('0' + Math.floor((t / 1000 / 60) % 60)).slice(-2);
                const hours = ('0' + Math.floor((t / (1000 * 60 * 60)) % 24)).slice(-2);
                const days = '' + Math.floor(t / (1000 * 60 * 60) / 24);
                deadLineRef.current.setDeadLine(days + '일 ' + hours + ':' + minutes + ':' + seconds);
                return;
              }
            }
          };
        } else {
          setIsNeedServerTime(false);
        }
        setPost({ ...post });
        setIsLoad(true);
      } catch (err: any) {
        setIsLoad(true);
        popError(err.message);
      }
    };

    let es: EventSource | null = null;
    setEventSourve(es);
    return () => {
      if (es !== null) {
        es.close();
      }
    };
  }, []);

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
