import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import SendIcon from '@mui/icons-material/Send';

const ChatInputStyle = css`
	margin-top: 5px;
	width: 80%;
	height: 30px;
	border: none;
`;
const ChatInputDiv = css`
	background-color: #ffffff;
	border: 1px solid #ebabab;
	/* #ece5f4 */
	margin-left: 10px;
	margin-right: 10px;
	border-radius: 20px;
	display: flex;
	justify-content: center;
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
			<input
				css={ChatInputStyle}
				type="text"
				placeholder="메시지를 입력해주세요"
				onKeyPress={sendInput}
				ref={input}
			/>
			<SendIcon
				sx={{ width: '30px', height: '40px', color: '#ebabab' }}
			/>
		</div>
	);
}

export default React.memo(ChatInput);
