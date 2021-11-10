import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

export default function GroupBuyButton({
	participantCnt,
	capacity,
	finished
}: {
	participantCnt: number;
	capacity: number;
	finished: boolean;
}) {
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
		>
			{finished
				? '모집 종료'
				: `공동 구매 (${participantCnt} / ${capacity})`}
		</Button>
	);
}
