import React from 'react';
import { css } from '@emotion/react';

const inputContent = css`
	border: 0px solid;
	box-sizing: border-box;
	box-shadow: none;
	width: 90%;
	height: 40px;
	background: transparent;
	outline: none;
	color: #000000;
	font-size: 16px;
	overflow: hidden;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	resize: none;
	min-height: 200px;
	margin-top: 13px;
	overflow: visible;
`;

interface ContentState {
	content: string;
	setContent: (content: string) => void;
}

function InputContent({ content, setContent }: ContentState) {
	function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setContent(e.target.value);
	}

	return (
		<textarea
			name="content"
			css={inputContent}
			placeholder="Content"
			rows={15}
			onChange={handleContentChange}
			value={content}
		></textarea>
	);
}

export default React.memo(InputContent);
