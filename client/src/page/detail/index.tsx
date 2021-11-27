import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Typography, IconButton, CircularProgress, Chip, Box, Avatar } from '@mui/material';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fetchGet } from '../../util';
import { RouteComponentProps } from 'react-router-dom';

import { css } from '@emotion/react';
import GroupBuyButton from './component/GroupBuyButton';
import DeadLine, { DeadLineHandle } from './component/DeadLine';
import LinkPreview from './component/LinkPreview';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../store/login';
import useLoginUser from '../../hook/useLoginUser';

type UrlType = {
  postId: number;
  url: string;
};

type UserType = {
  id: number;
  name: string;
  img: string;
  point: number;
};

type MatchParams = {
  postId: string;
};
type PostType = {
  id: number;
  lat: number;
  long: number;
  deadline: string;
  userId: number;
  categoryId: number;
  title: string;
  content: string;
  category: { id: number; name: string };
  finished: boolean;
  capacity: number;
  participantCnt: number;
  urls: UrlType[];
  user: UserType;
  isParticipate: boolean;
};

const detailContainer = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
`;
const StyledBox = styled(Box)(() => ({
  backgroundColor: '#ffe7e7',
  border: '1px solid #fefafa',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '700px'
}));

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: white;
  }
`;

export default function Detail({ match }: RouteComponentProps<MatchParams>) {
  const [isLoad, setIsLoad] = useState(false);
  const [isNeedServerTime, setIsNeedServerTime] = useState(true);
  const deadLineRef = useRef<DeadLineHandle>();
  const loginUser = useLoginUser();
  const [post, setPost] = useState<PostType>({
    id: 0,
    userId: 0,
    categoryId: 0,
    title: '',
    content: '',
    category: { id: 0, name: '' },
    lat: 0,
    long: 0,
    finished: false,
    capacity: 0,
    deadline: '',
    participantCnt: 0,
    urls: [],
    user: {
      id: 0,
      name: '',
      img: '',
      point: 0
    },
    isParticipate: false
  });

  useEffect(() => {
    let es: any = null;
    fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/post/${match.params.postId}`).then(post => {
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
              es.close();
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
    });
    return () => {
      if (es !== null) {
        es.close();
      }
    };
  }, []);
  return isLoad ? (
    <div css={detailContainer}>
      <Card
        sx={{
          borderRadius: 7,
          bgcolor: '#fefafa',
          border: '1px solid #fefafa',
          pb: '4.5rem'
        }}
        variant="outlined"
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h5">{post.title}</Typography>
            <Chip label={post.category.name} sx={{ color: 'grey' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: 'flex'
              }}
            >
              <Avatar src={post.user.img} sx={{ width: 32, height: 32, marginRight: 1 }} />
              {post.user.name}
            </Typography>
            <DeadLine ref={deadLineRef} isNeedServerTime={isNeedServerTime} deadline={post.deadline} />
          </Box>
          <Card
            sx={{
              mt: 2,
              minWidth: 275,
              minHeight: 275,
              bgcolor: '#ffe7e7',
              border: '1px solid #fefafa',
              borderRadius: 7
            }}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="body2" lineHeight="2.5">
                {post.content}
              </Typography>
            </CardContent>
          </Card>
          {post.urls.map((url, idx) => {
            return <LinkPreview key={idx} url={url.url} />;
          })}
        </CardContent>
      </Card>
      <StyledBox
        sx={{
          position: 'fixed',
          bottom: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          visibility: 'visible',
          right: 0,
          left: 0,
          height: '4.5rem'
        }}
      >
        <Box sx={{ display: 'flex', p: 1 }}>
          <GroupBuyButton
            login={loginUser}
            postId={Number(match.params.postId)}
            participantCnt={post.participantCnt}
            capacity={post.capacity}
            finished={post.finished}
            isParticipate={post.isParticipate}
            isNeedServerTime={isNeedServerTime}
          />
        </Box>
      </StyledBox>
    </div>
  ) : (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        sx={{
          marginTop: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#ebabab'
        }}
      />
    </Box>
  );
}
