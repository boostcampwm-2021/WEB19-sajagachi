import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const ChatInputStyle = css`
	/* margin-top: 5px; */
	margin: 5px 5px 0px 5px;
	width: 80%;
	height: 30px;
	border: none;
	font-size: 18px;
	&:focus {
		outline: none;
	}
`;
const ChatInputDiv = css`
	position: absolute;
	background-color: #ffffff;
	border: 1px solid #ebabab;
	margin-left: 10px;
	margin-right: 10px;
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	bottom: 20px;
	left: 0;
	right: 0;
`;
type ChatInputType = {
	socket: any;
	postId: number;
	userId: string;
};

function ChatInput(props: ChatInputType) {
	const input = useRef<HTMLInputElement | null>(null);

	const checkEnter = useCallback((event: KeyboardEvent) => {
		return event.code === 'Enter' || event.code === 'NumpadEnter';
	}, []);

	const sendInput = useCallback((event: any) => {
		if (input.current !== null && checkEnter(event)) {
			props.socket.emit(
				'sendMsg',
				props.postId,
				props.userId,
				input.current.value
			);
			input.current.value = '';
		}
	}, []);

	return (
		<div css={ChatInputDiv}>
			<AddCircleIcon
				sx={{
					width: '40px',
					height: '40px',
					color: '#ebabab',
					paddingLeft: '10px'
				}}
			/>
			<input
				css={ChatInputStyle}
				type="text"
				placeholder="메시지를 입력해주세요"
				onKeyPress={sendInput}
				ref={input}
			/>
			<SendIcon
				sx={{
					width: '40px',
					height: '40px',
					color: '#ebabab',
					paddingRight: '10px'
				}}
			/>
		</div>
	);
}

export default ChatInput;
