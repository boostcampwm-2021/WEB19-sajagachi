import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { Typography } from '@mui/material';

export type DeadLineHandle = {
  setDeadLine: (endTime: string) => void;
};

function DeadLine(
  {
    isNeedServerTime,
    deadline
  }: { isNeedServerTime: boolean; deadline: string },
  ref: React.Ref<unknown> | undefined
) {
  const [endTime, setEndTime] = useState(
    deadline ? '0일 00:00:00' : '기한 없음'
  );
  useImperativeHandle(ref, () => ({
    setDeadLine: (endTime: string) => setEndTime(endTime)
  }));
  return (
    <Typography variant="body2">
      마감시간| {!isNeedServerTime ? endTime : '계산 중...'}
    </Typography>
  );
}

export default forwardRef(DeadLine);
