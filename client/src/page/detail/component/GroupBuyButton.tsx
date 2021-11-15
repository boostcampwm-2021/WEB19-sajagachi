import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
type GroupBuyButtonType = {
	postId: number;
	participantCnt: number;
	capacity: number;
	finished: boolean;
};

export default function GroupBuyButton({
	postId,
	participantCnt,
	capacity,
	finished
}: GroupBuyButtonType) {
	const history = useHistory();
	const clickHandler = useCallback(() => {
		history.push(`/chat/${postId}`);
	}, [history]);
	return (
		<Button
			variant="contained"
			disabled={finished || participantCnt >= capacity ? true : false}
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
				: `공동 구매 (${participantCnt} / ${capacity})`}
		</Button>
	);
}
