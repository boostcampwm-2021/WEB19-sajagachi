import React, { useState } from 'react';
import { css } from '@emotion/react';
import InputTitle from './component/InputTitle';
import InputContent from './component/InputContent';
import InputUrl from './component/InputUrl';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import SelectCapacity from './component/SelectCapacity';
import DateDeadline from './component/DateDeadline';

const URL_REGX = `/^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/`;

const postContainer = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
	padding-left: 5vw;
	padding-right: 5vw;
	padding-top: 2vh;
`;

const inputCommon = css`
	border: 0px solid;
	box-sizing: border-box;
	box-shadow: none;
	width: 100%;
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
	width: 100%;
	height: 1px;
	margin-left: auto;
	margin-right: auto;
`;

const urlAddIcon = css`
	width: 30px;
	height: 30px;
	color: #ebabab;
`;

const finishButton = css`
	align-self: end;
	margin: 5vh;
`;

const capacityDeadline = css`
	width: 90%;
	display: flex;
	flex-direction: column;
`;

function Post() {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [urls, setUrls] = useState<string[]>(['']);
	const [capacity, setCapacity] = useState<number>(0);
	const [deadline, setDeadline] = useState<Date | null>(null);

	function Line() {
		return <div css={horizonLine}></div>;
	}

	function handleUrlAddClick(e: React.MouseEvent<HTMLButtonElement>) {
		setUrls([...urls, '']);
	}

	return (
		<div css={postContainer}>
			<InputTitle title={title} setTitle={setTitle} />
			<Line />
			<InputContent content={content} setContent={setContent} />
			{urls.map((url, idx) => (
				<InputUrl idx={idx} urls={urls} setUrls={setUrls} />
			))}
			<IconButton
				sx={{ ml: 'auto', mr: 'auto' }}
				onClick={handleUrlAddClick}
			>
				<AddBoxIcon css={urlAddIcon} />
			</IconButton>
			<div css={capacityDeadline}>
				<SelectCapacity capacity={capacity} setCapacity={setCapacity} />
				<DateDeadline deadline={deadline} setDeadline={setDeadline} />
			</div>

			<Button
				style={{ backgroundColor: '#ebabab', color: 'white' }}
				css={finishButton}
			>
				등록
			</Button>
		</div>
	);
}

export default Post;
