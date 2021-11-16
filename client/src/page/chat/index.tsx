import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ChatBar from './component/ChatBar';
import ChatInput from './component/ChatInput';
import MyChatMessage from './component/MyChatMessage';
import OtherChatMessage from './component/OtherChatMsg';
import 'dotenv/config';
import io from 'socket.io-client';

const ChatContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;
const ChatLayout = css`
	margin: 5px 10px 0px 10px;
	height: 79vh;
	/* background-color: #ece5f4; */
	background-color: #ffffff;
	border-radius: 30px 30px 0px 0px;
`;
const DUMMYDATA = [
	{
		sender: 'gomster96',
		msg: '안녕하세요',
		time: '오전 9:25',
		isMe: true
	},
	{
		sender: 'FloralLif',
		msg: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
		time: '오전 9:26',
		isMe: false
	},
	{
		sender: 'gomster96',
		msg: '안녕하세요',
		time: '오전 9:27',
		isMe: false
	},
	{
		sender: 'gomster96',
		msg: '안녕하세요',
		time: '오전 9:28',
		isMe: false
	}
];

function Chat(props: any) {
	const socketRef = useRef<any>();
	useEffect(() => {
		socketRef.current = io(String(process.env.REACT_APP_SERVER_URL));
		socketRef.current.emit('message', 'myMessage');
		return () => {
			socketRef.current.disconnect();
		};
	}, []);
	return (
		<div css={ChatContainer}>
			<ChatBar title={'타이틀이 들어갈 공간입니당아아아'} />
			<div css={ChatLayout}>
				{DUMMYDATA.map(chat => {
					return chat.isMe ? (
						<MyChatMessage msgData={chat} />
					) : (
						<OtherChatMessage msgData={chat} />
					);
				})}
			</div>
			<ChatInput />
		</div>
	);
}
export default Chat;
