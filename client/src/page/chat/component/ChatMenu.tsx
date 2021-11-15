import React from 'react';
import { css } from '@emotion/react';
import { Close } from '@mui/icons-material';
import { UserList } from './UserList';
import { PointView } from './PointView';
import { Button } from '@mui/material';

const ChatMenuStyle = css`
	width: 80vw;
	height: 100vh;
`;

const CloseBtnStyle = css`
	position: absolute;
	top: 10px;
	right: 10px;
`;

export function ChatMenu(props: { onCloseBtnClicked: Function }) {
	return (
		<div css={ChatMenuStyle}>
			<Close
				css={CloseBtnStyle}
				onClick={() => props.onCloseBtnClicked()}
			/>
			<UserList />
			<PointView />
			<Button>나가기</Button>
		</div>
	);
}
