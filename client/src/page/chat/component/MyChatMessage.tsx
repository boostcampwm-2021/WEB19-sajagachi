import React from 'react';
import { css } from '@emotion/react';

type MessageType = {
	sender: string;
	msg: string;
	time: string;
	isMe: boolean;
};

const MessageStyle = css`
	margin: 2px 0px;
	padding: 5px 10px;
	width: 60%;
	border-radius: 10px;
	background-color: #ece5f4;
`;

const DirectionSelector = css`
	display: flex;
	justify-content: right;
`;

const MessageTimeStyle = css`
	color: gray;
	font-size: 10px;
	margin: 0px 10px;
	padding-top: 10px;
`;

function MyChatMessage(props: { msgData: MessageType }) {
	return (
		<div>
			<div css={DirectionSelector}>
				<div css={MessageTimeStyle}>{props.msgData.time}</div>
				<div css={MessageStyle}>{props.msgData.msg}</div>
			</div>
		</div>
	);
}

export default MyChatMessage;
