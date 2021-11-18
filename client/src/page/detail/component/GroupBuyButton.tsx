import React, { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LoginModal from '../../../common/login-modal';
import { fetchPost } from '../../../util';

type GroupBuyButtonType = {
	loginId: number | undefined;
	postId: number;
	participantCnt: number;
	capacity: number;
	finished: boolean;
};

const DUMMY_USER = {
	id: 80206884,
	name: 'J119_안병웅'
};

export default function GroupBuyButton({
	loginId,
	postId,
	participantCnt,
	capacity,
	finished
}: GroupBuyButtonType) {
	const history = useHistory();
	const [isLoginModalOn, setIsLoginModalOn] = useState(false);
	const [buttonState, setButtonState] = useState(
		finished ||
			(capacity !== null
				? participantCnt >= capacity
					? true
					: false
				: false)
	);
	const clickHandler = useCallback(async () => {
		if (loginId === undefined) setIsLoginModalOn(true);
		else {
			const postBody = {
				userId: loginId,
				postId
			};
			const url = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
			const result = await fetchPost(url, postBody);
			if (result === '해당 공구는 정원이 가득 찼습니다.') {
				alert(result);
				setButtonState(true);
			} else
				history.push(`/chat/${postId}`, {
					userId: loginId,
					postId
				});
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
					: `공동 구매 (${participantCnt} / ${capacity ?? ' - '})`}
			</Button>
			{isLoginModalOn && (
				<LoginModal setIsLoginModalOn={setIsLoginModalOn} />
			)}
		</>
	);
}
