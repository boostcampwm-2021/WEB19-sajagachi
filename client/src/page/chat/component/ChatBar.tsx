import React from 'react';
import { css } from '@emotion/react';

const ChatBarLayout = css`
	display: flex;
	justify-content: center;
	height: 4.4rem;
	background-color: #ebabab;
`;

const TitleStyle = css`
	padding-top: 20px;
	display: inline;
`;

function ChatBar(props: { title: string }) {
	return (
		<div css={ChatBarLayout}>
			<div css={TitleStyle}>{props.title}</div>
		</div>
	);
}

export default ChatBar;
