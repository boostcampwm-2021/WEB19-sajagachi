import React, { useState, useEffect } from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { fetchGet, fetchPost } from '../../util';
import { loginUserState } from '../../store/login';
import { useHistory } from 'react-router';
import LoginModal from '../../common/login-modal';
import useError from '../../hook/useError';
import { ERROR } from '../../util/error-message';
import service from '../../util/service';

const URL_REGX: RegExp = /^(((http(s?))\:\/\/)?)([\da-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:\d+)?(\/\S*)?/;

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

const inputCommon = css`
  border: 0px solid;
  box-sizing: border-box;
  box-shadow: none;
  width: 100%;
  height: 40px;
  background: transparent;
  outline: none;
  color: #000000;
  font-size: 16px;
  overflow: hidden;
  margin-left: 10vw;
  margin-right: 10vw;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
`;

const inputContent = css`
  ${inputCommon}
  resize: none;
  min-height: 200px;
  margin-top: 13px;
  overflow: visible;
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

function Post() {
  const history = useHistory();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [urls, setUrls] = useState<string[]>(['']);
  const [category, setCategory] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number>(0);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [popError, RenderError] = useError();
  const currentLocation = useRecoilValue(locationState);

  useEffect(() => {
    if (title && content && category !== null) setBtnDisabled(false);
    else setBtnDisabled(true);
  }, [title, content, category]);

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
      title: title,
      content: content,
      capacity: capacity,
      deadline: deadlineDate,
      lat: currentLocation.lat,
      long: currentLocation.lng,
      urls: validUrls
    };
    try {
      const postId = await service.createPost(body);
      history.push(`/post/${postId}`);
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
    if (checkUrlValid()) {
      popError(ERROR.INVALID_URL);
    } else {
      const validUrls = new Set(urls.filter(x => x !== ''));
      createPost(Array.from(validUrls));
    }
  }

  return (
    <div css={postContainer}>
      <RenderError />
      <InputTitle title={title} setTitle={setTitle} />
      <Line />
      <InputContent content={content} setContent={setContent} />
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
      <Tooltip TransitionComponent={Zoom} title="제목, 내용, 카테고리를 입력하셔야 합니다.">
        <span css={finishButton}>
          <Button
            style={{
              backgroundColor: `${btnDisabled ? '#dddddd' : '#ebabab'}`,
              color: 'white'
            }}
            onClick={handleFinishClick}
            disabled={btnDisabled}
          >
            등록
          </Button>
        </span>
      </Tooltip>
    </div>
  );
}

export default Post;
