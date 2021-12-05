import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LoginModal from '../../../common/login-modal';
import { LoginUserType } from '../../../type';
import service from '../../../util/service';

interface GroupBuyButtonType {
  login: LoginUserType;
  postId: number;
  participantCnt: number;
  capacity: number | null;
  finished: boolean;
  isParticipate: boolean;
  isNeedServerTime: boolean;
  popError: Function;
}

export default function GroupBuyButton({
  login,
  postId,
  participantCnt,
  capacity,
  finished,
  isParticipate,
  isNeedServerTime,
  popError
}: GroupBuyButtonType) {
  const history = useHistory();
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const checkButtonState = () => {
    if (isParticipate) return false;
    else if (finished || (capacity && capacity <= participantCnt)) return true;
    else return false;
  };
  const [buttonState, setButtonState] = useState(checkButtonState());

  const clickHandler = async () => {
    if (!login.isSigned) setIsLoginModalOn(true);
    else if (isParticipate) {
      history.push(`/chat/${postId}`);
    } else {
      try {
        await service.enterChat(postId);
        history.push(`/chat/${postId}`);
      } catch (err: any) {
        popError(err.message);
        setButtonState(true);
      }
    }
  };

  const createGroupButtonText = () => {
    if (isNeedServerTime) return '불러오는 중..';
    if (finished) return isParticipate ? '공구마감 / 참여중' : '모집 종료';
    else return `${isParticipate ? '참여중' : '공동 구매'} (${participantCnt} / ${capacity ?? ' - '})`;
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={isNeedServerTime || checkButtonState()}
        sx={GroupBuyButtonStyle}
        onClick={clickHandler}
      >
        {createGroupButtonText()}
      </Button>
      {isLoginModalOn && <LoginModal setIsLoginModalOn={setIsLoginModalOn} />}
    </>
  );
}

const GroupBuyButtonStyle = {
  bgcolor: '#F76A6A',
  ':hover': {
    bgcolor: '#F76A6A'
  },
  flexGrow: 1,
  p: 1,
  m: 1,
  color: 'white',
  borderColor: '#F76A6A'
};
