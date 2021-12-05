import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { locationState } from '../../store/location';
import InputTitle from './component/InputTitle';
import InputContent from './component/InputContent';
import InputUrl from './component/InputUrl';
import CheckCategory from './component/CheckCategory';
import SelectCapacity from './component/SelectCapacity';
import DateDeadline from './component/DateDeadline';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import { fetchGet } from '../../util';
import { loginUserState } from '../../store/login';
import { useHistory } from 'react-router';
import useError from '../../hook/useError';
import { ERROR } from '../../util/error-message';
import service from '../../util/service';

const URL_REGX: RegExp = /^(((http(s?))\:\/\/)?)([\da-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:\d+)?(\/\S*)?/;

function Post() {
  const history = useHistory();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);

  const [urls, setUrls] = useState<string[]>(['']);
  const [category, setCategory] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number>(0);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [popError, RenderError] = useError();
  const currentLocation = useRecoilValue(locationState);

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
        } else {
          popError(ERROR.NOT_LOGGED_IN);
          history.push('/');
        }
      });
    }
  }, []);

  const Line = React.memo(() => {
    return <div css={horizonLine}></div>;
  });

  const createPost = async (validUrls: string[]) => {
    const deadlineDate = deadline
      ? new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate() + 1)
      : deadline;
    const body = {
      categoryId: category,
      title: title.current?.value,
      content: content.current?.value,
      capacity: capacity,
      deadline: deadlineDate,
      lat: currentLocation.lat,
      long: currentLocation.lng,
      urls: validUrls
    };
    try {
      const postId = await service.createPost(body);
      history.replace(`/post/${postId}`);
    } catch (err: any) {
      popError(err.message);
    }
  };

  function handleUrlAddClick(e: React.MouseEvent<HTMLButtonElement>) {
    setUrls([...urls, '']);
  }

  function checkUrlValid(): boolean {
    return urls.some(url => {
      return url ? !URL_REGX.test(url) : false;
    });
  }

  function handleFinishClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!(title.current?.value && content.current?.value && category !== null)) {
      popError(ERROR.NOT_ENOUGH_INPUT);
    } else if (checkUrlValid()) {
      popError(ERROR.INVALID_URL);
    } else {
      const validUrls = new Set(urls.filter(x => x !== ''));
      createPost(Array.from(validUrls));
    }
  }

  return (
    <div css={postContainer}>
      <RenderError />
      <InputTitle title={title} />
      <Line />
      <InputContent content={content} />
      {urls.map((url, idx) => (
        <InputUrl idx={idx} urls={urls} setUrls={setUrls} />
      ))}
      <IconButton sx={{ ml: 'auto', mr: 'auto' }} onClick={handleUrlAddClick}>
        <AddBoxIcon css={urlAddIcon} />
      </IconButton>
      <CheckCategory category={category} setCategory={setCategory} popError={popError} />
      <div css={capacityDeadline}>
        <SelectCapacity capacity={capacity} setCapacity={setCapacity} />
        <DateDeadline deadline={deadline} setDeadline={setDeadline} />
      </div>
      <Button
        style={{
          backgroundColor: '#ebabab',
          color: 'white'
        }}
        css={finishButton}
        onClick={handleFinishClick}
      >
        등록
      </Button>
    </div>
  );
}

export default Post;

const postContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 2vh;
`;

const horizonLine = css`
  background-color: #ebababa0;
  width: 100%;
  height: 1px;
  margin-left: auto;
  margin-right: auto;
`;

const urlAddIcon = css`
  width: 30px;
  height: 30px;
  color: #ebabab;
`;

const finishButton = css`
  align-self: end;
  margin: 5vh;
`;

const capacityDeadline = css`
  width: 90%;
  display: flex;
  flex-direction: column;
`;
