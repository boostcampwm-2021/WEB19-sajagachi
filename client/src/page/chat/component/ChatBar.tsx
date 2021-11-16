import React from 'react';
import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ChatMenuDrawer } from './ChatMenuDrawer';
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

function ChatBar(props: { title: string }) {
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
			<ChatMenuDrawer />
		</div>
	);
}

export default ChatBar;
