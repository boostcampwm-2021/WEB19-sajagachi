import React, { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LoginModal from '../../../common/login-modal';
import { fetchPost } from '../../../util';
import { LoginUserType } from '../../../type';

type GroupBuyButtonType = {
  login: LoginUserType;
  postId: number;
  participantCnt: number;
  capacity: number;
  finished: boolean;
  isParticipate: boolean;
};

export default function GroupBuyButton({
  login,
  postId,
  participantCnt,
  capacity,
  finished,
  isParticipate
}: GroupBuyButtonType) {
  const history = useHistory();
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const [buttonState, setButtonState] = useState(
    finished ||
      (capacity !== null && participantCnt >= capacity && !isParticipate)
  );
  const clickHandler = useCallback(async () => {
    if (!login.isSigned) setIsLoginModalOn(true);
    else if (isParticipate) {
      history.push(`/chat/${postId}`);
    } else {
      const postBody = {
        userId: login.id,
        postId
      };
      const url = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
      const result = await fetchPost(url, postBody);
      if (result === '해당 공구는 정원이 가득 찼습니다.') {
        alert(result);
        setButtonState(true);
      } else history.push(`/chat/${postId}`);
    }
  }, [history]);
  return (
    <>
      <Button
        variant="contained"
        disabled={buttonState}
        sx={{
          bgcolor: '#F76A6A',
          ':hover': {
            bgcolor: '#F76A6A'
          },
          flexGrow: 1,
          p: 1,
          m: 1,
          color: 'white',
          borderColor: '#F76A6A'
        }}
        onClick={clickHandler}
      >
        {finished
          ? '모집 종료'
          : (isParticipate ? '참여중' : '공동 구매') +
            ` (${participantCnt} / ${capacity ?? ' - '})`}
      </Button>
      {isLoginModalOn && <LoginModal setIsLoginModalOn={setIsLoginModalOn} />}
    </>
  );
}
