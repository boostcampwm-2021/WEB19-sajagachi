import React from 'react';
import { css } from '@emotion/react';
import { Close } from '@mui/icons-material';
import { UserList } from './UserList';
import { PointView } from './PointView';
import { Button } from '@mui/material';

const ChatMenuStyle = css`
	width: 300px;
	height: 100vh;
	padding-top: 30px;
	@media (max-width: 300px) {
		width: 100vw;
	}
`;

const CloseBtnStyle = css`
	position: absolute;
	top: 10px;
	right: 10px;
`;

const QuitBtnContainerStyle = css`
	position: absolute;
	bottom: 10px;
	left: 5px;
	right: 5px;
	text-align: center;
`;

const QuitBtnStyle = css`
	width: 95%;
	color: #ffffff;
	background-color: #f76a6a;
	&:hover {
		background-color: #f76a6a;
	}
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
			<div css={QuitBtnContainerStyle}>
				<Button css={QuitBtnStyle}>나가기</Button>
			</div>
		</div>
	);
}