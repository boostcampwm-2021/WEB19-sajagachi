import React from 'react';
import { css } from '@emotion/react';
import SendIcon from '@mui/icons-material/Send';
const ChatInputContainer = css`
	margin: 0px 10px;
	height: 9vh;
	border-radius: 0px 0px 30px 30px;
	background-color: #ffffff;
	text-align: center;
`;
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
function ChatInput() {
	return (
		<div css={ChatInputContainer}>
			<div css={ChatInputDiv}>
				<input
					css={ChatInputStyle}
					type="text"
					placeholder="input 들어갈 예정"
				/>
				<SendIcon
					sx={{ width: '30px', height: '40px', color: '#ebabab' }}
				/>
			</div>
		</div>
	);
}

export default ChatInput;
