import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { Typography } from '@mui/material';

export type DeadLineHandle = {
	setDeadLine: (endTime: string) => void;
};

function DeadLine(props: any, ref: React.Ref<unknown> | undefined) {
	const [endTime, setEndTime] = useState('0일 00:00:00');
	useImperativeHandle(ref, () => ({
		setDeadLine: (endTime: string) => setEndTime(endTime)
	}));
	return <Typography variant="body2">마감시간| {endTime}</Typography>;
}

export default forwardRef(DeadLine);
