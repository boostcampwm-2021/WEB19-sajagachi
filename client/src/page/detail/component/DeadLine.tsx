import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { Typography } from '@mui/material';

interface DeadLineType {
  isNeedServerTime: boolean;
  deadline: string | null;
}

export interface DeadLineHandle {
  setDeadLine: (endTime: string) => void;
}

function DeadLine({ isNeedServerTime, deadline }: DeadLineType, ref: React.Ref<unknown> | undefined) {
  const [endTime, setEndTime] = useState(deadline ? '0일 00:00:00' : '기한 없음');
  useImperativeHandle(ref, () => ({
    setDeadLine: (endTime: string) => setEndTime(endTime)
  }));
  return (
    <Typography variant="body2" sx={DeadlineStyle}>
      {!isNeedServerTime ? endTime : '계산 중...'}
    </Typography>
  );
}

const DeadlineStyle = {
  marginTop: '5px'
};

export default forwardRef(DeadLine);
