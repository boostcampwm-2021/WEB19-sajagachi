import React from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
import ChatInput from './component/ChatInput';

const ChatContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;
const ChatLayout = css`
	margin: 5px 10px 0px 10px;
	height: 79vh;
	background-color: #ece5f4;
	border-radius: 30px 30px 0px 0px;
`;

function Chat() {
	return (
		<div css={ChatContainer}>
			<ChatBar title={'타이틀이 들어갈 공간입니당아아아'} />
			<div css={ChatLayout}>채팅들이 들어 갈 에정</div>
			<ChatInput />
		</div>
	);
}
export default Chat;
