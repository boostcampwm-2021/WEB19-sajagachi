import React, { useState } from 'react';
import { css } from '@emotion/react';
import InputTitle from './component/InputTitle';
import InputContent from './component/InputContent';
import InputUrl from './component/InputUrl';
import CheckCategory from './component/CheckCategory';
import SelectCapacity from './component/SelectCapacity';
import DateDeadline from './component/DateDeadline';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

const URL_REGX: RegExp =
	/^(((http(s?))\:\/\/)?)([\da-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:\d+)?(\/\S*)?/;

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
	const [category, setCategory] = useState<number | null>(null);
	const [capacity, setCapacity] = useState<number | null>(null);
	const [deadline, setDeadline] = useState<Date | null>(null);

	const Line = React.memo(() => {
		return <div css={horizonLine}></div>;
	});

	function handleUrlAddClick(e: React.MouseEvent<HTMLButtonElement>) {
		setUrls([...urls, '']);
	}

	const checkUrlValid = (urls: string[]): boolean => {
		return urls.some(url => {
			return url ? !URL_REGX.test(url) : false;
		});
	};

	function handleFinishClick(e: React.MouseEvent<HTMLButtonElement>) {
		if (checkUrlValid(urls)) {
			alert('올바르지 않은 url 형식입니다');
			return;
		}
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
			<CheckCategory category={category} setCategory={setCategory} />
			<div css={capacityDeadline}>
				<SelectCapacity capacity={capacity} setCapacity={setCapacity} />
				<DateDeadline deadline={deadline} setDeadline={setDeadline} />
			</div>
			<Button
				style={{ backgroundColor: '#ebabab', color: 'white' }}
				css={finishButton}
				onClick={handleFinishClick}
			>
				등록
			</Button>
		</div>
	);
}

export default Post;
