import React from 'react';
import { css } from '@emotion/react';

const inputUrl = css`
	border: 0px solid;
	box-sizing: border-box;
	box-shadow: none;
	width: 80%;
	height: 40px;
	background: transparent;
	outline: none;
	color: #000000;
	font-size: 16px;
	overflow: hidden;
	margin-left: 10vw;
	margin-right: 10vw;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

interface UrlState {
	urls: string[];
	setUrls: (urls: []) => void;
}

function InputUrl({ urls, setUrls }: UrlState) {
	return (
		<div>
			<input type="text" name="url" css={inputUrl} placeholder="url" />
		</div>
	);
}

export default InputUrl;
