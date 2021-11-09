import React, { useState } from 'react';
import { css } from '@emotion/react';
import InputTitle from './component/InputTitle';
import InputContent from './component/InputContent';
import InputUrl from './component/InputUrl';

const URL_REGX = `/^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/`;

const postContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;

const inputCommon = css`
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

const inputContent = css`
	${inputCommon}
	resize: none;
	min-height: 200px;
	margin-top: 13px;
	overflow: visible;
`;

const horizonLine = css`
	background-color: #ebababa0;
	width: 90%;
	height: 1px;
	margin-left: auto;
	margin-right: auto;
`;

function Post() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [urls, setUrls] = useState([]);

	function Line() {
		return <div css={horizonLine}></div>;
	}

	return (
		<div css={postContainer}>
			<InputTitle title={title} setTitle={setTitle} />
			<Line />
			<InputUrl urls={urls} setUrls={setUrls} />
			<Line />
			<InputContent content={content} setContent={setContent} />
			<Line />
		</div>
	);
}

export default Post;
