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
	max-width: 60%;
	border-radius: 10px;
	background-color: #e5e5ea;

	font-size: 14px;
`;

const DirectionSelector = css`
	display: flex;
	justify-content: left;
	align-items: flex-end;
`;

const MessageTimeStyle = css`
	color: gray;
	font-size: 10px;
	margin: 0px 10px;
	padding-bottom: 5px;
`;

const SenderStyle = css`
	color: gray;
	font-size: 12px;
	margin: 0px 10px;
`;

function OtherChatMessage(props: { msgData: MessageType }) {
	return (
		<div>
			<div css={DirectionSelector}>
				<div css={SenderStyle}>{props.msgData.sender}</div>
			</div>
			<div css={DirectionSelector}>
				<div css={MessageStyle}>{props.msgData.msg}</div>
				<div css={MessageTimeStyle}>{props.msgData.time}</div>
			</div>
		</div>
	);
}

export default OtherChatMessage;
