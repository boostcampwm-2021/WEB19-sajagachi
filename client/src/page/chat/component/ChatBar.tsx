import React from 'react';
import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
const ChatBarLayout = css`
	display: flex;
	flex-direction: row;
	height: 4.4rem;
	background-color: #ebabab;
	justify-content: space-between;
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
					marginLeft: '10px'
				}}
			/>
			<div css={TitleStyle}>{props.title}</div>
			<MenuIcon
				sx={{
					paddingTop: '20px',
					width: '30px',
					height: '3.4rem',
					marginRight: '10px'
				}}
			/>
		</div>
	);
}

export default ChatBar;
