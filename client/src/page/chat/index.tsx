import React from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
// postId 를 인자로 받으면 이를 기반으로 chattting 을 가져옴
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
const ChatInputContainer = css`
	margin: 0px 10px;
	height: 10vh;
	border-radius: 0px 0px 30px 30px;
	background-color: #ece5f4;
	text-align: center;
`;
const ChatInputStyle = css`
	width: 90%;
	height: 45px;
	border-radius: 20px;
`;
function Chat() {
	return (
		<div css={ChatContainer}>
			<ChatBar title={'타이틀이 들어갈 공간입니당아아아'} />
			<div css={ChatLayout}></div>
			<div css={ChatInputContainer}>
				<input
					css={ChatInputStyle}
					type="text"
					value="input 들어갈 예정"
				/>
			</div>
		</div>
	);
}
export default Chat;
