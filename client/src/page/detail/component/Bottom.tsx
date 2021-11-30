import React from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import useLoginUser from '../../../hook/useLoginUser';
import GroupBuyButton from './GroupBuyButton';

interface BottomType {
  postId: number;
  participantCnt: number;
  capacity: number | null;
  finished: boolean;
  isParticipate: boolean;
  isNeedServerTime: boolean;
  popError: Function;
}

export default function Bottom({
  postId,
  participantCnt,
  capacity,
  finished,
  isParticipate,
  isNeedServerTime,
  popError
}: BottomType) {
  const loginUser = useLoginUser();
  return (
    <StyledBox>
      <Box sx={{ display: 'flex', p: 1 }}>
        <GroupBuyButton
          login={loginUser}
          postId={postId}
          participantCnt={participantCnt}
          capacity={capacity}
          finished={finished}
          isParticipate={isParticipate}
          isNeedServerTime={isNeedServerTime}
          popError={popError}
        />
      </Box>
    </StyledBox>
  );
}

const StyledBox = styled(Box)(() => ({
  backgroundColor: '#ffe7e7',
  border: '1px solid #fefafa',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '700px',
  position: 'fixed',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  visibility: 'visible',
  right: 0,
  left: 0,
  bottom: 0,
  height: '4.5rem'
}));
