import React from 'react';
import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ChatMenuDrawer } from './ChatMenuDrawer';
import { Socket } from 'socket.io-client';
const ChatBarLayout = css`
	display: flex;
	flex-direction: row;
	height: 4.4rem;
	background-color: #ebabab;
	justify-content: space-between;
	z-index: 2;
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
`;

const TitleStyle = css`
	padding-top: 23px;
	font-size: 18px;
`;

type propsType = {
	title: string;
	socket: Socket;
	postId: string;
	userId: string;
};

function ChatBar(props: propsType) {
	return (
		<div css={ChatBarLayout}>
			<ArrowBackIosNewIcon
				sx={{
					paddingTop: '20px',
					width: '30px',
					height: '3.4rem',
					marginLeft: '10px',
					color: '#FFFFFF'
				}}
			/>
			<div css={TitleStyle}>{props.title}</div>
			<ChatMenuDrawer
				socket={props.socket}
				postId={props.postId}
				userId={props.userId}
			/>
		</div>
	);
}

export default ChatBar;
