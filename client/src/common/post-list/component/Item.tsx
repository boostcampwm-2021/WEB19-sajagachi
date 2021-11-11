import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import GroupIcon from '@mui/icons-material/Group';
import { ItemType } from '../../../type';
import { dateFormat } from '../../../util/util';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkStyle = css`
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: black;
	}
`;

const ItemStyle = css`
	position: relative;
	width: 100%;
	height: 120px;
	margin-bottom: 15px;
	border-radius: 15px;
	box-shadow: 3px 3px 8px 1px #bbbbbb;
`;

const ItemContainerStyle = css`
	width: 100%;
	height: 100%;
	padding: 10px 90px 10px 15px;
`;

const ItemTitleStyle = css`
	font-family: 'Noto Sans KR Bold', sans-serif;
	font-size: 18px;
	margin: 0;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

const ItemDeadlineStyle = css`
	font-size: 12px;
	margin: 5px 0;
	color: #404040;
`;

const ItemDescStyle = css`
	font-size: 9px;
	text-overflow: ellipsis;
	height: 30px;
	margin: 5px 0;
	overflow: hidden;
	color: #404040;
`;

const ChipContainerStyle = css`
	position: absolute;
	top: 10px;
	right: 15px;
	display: flex;
	flex-direction: column;
`;

const ChipStyle = {
	color: 'grey',
	marginBottom: '5px',
	fontSize: '11px',
	padding: '0px',
	width: '65px',
	height: '28px'
};

export default function Item(props: { item: ItemType }) {
	return (
		<li css={ItemStyle}>
			<Link to={`/post/${props.item.id}`} css={LinkStyle}>
				<ItemContent item={props.item} />
			</Link>
		</li>
	);
}

const DUMMYDESC =
	'Apple의 가장 강력한 노트북 라인업. 빠른 속도를 자랑하는 M1 프로세서, 엄청난 그래픽, 눈을 사로잡는 Retina 디스플레이. 이제 14인치 15인치 16인치 저는 13인치가 좋아요';

function ItemContent(props: { item: ItemType }) {
	return (
		<div css={ItemContainerStyle}>
			<h1 css={ItemTitleStyle}>{props.item.title}</h1>
			<p css={ItemDeadlineStyle}>{dateFormat(props.item.deadline)}까지</p>
			<p css={ItemDescStyle}>{DUMMYDESC}</p>
			<div css={ChipContainerStyle}>
				<Chip label={props.item.category} sx={ChipStyle} size="small" />
				<Chip
					icon={<GroupIcon sx={{ fontSize: 16 }} />}
					label={`${props.item.participantCnt}/${props.item.capacity}명`}
					sx={ChipStyle}
					size="small"
				/>
			</div>
		</div>
	);
}

/*
function ItemContent(props: { item: ItemType }) {
	return (
		<div css={ItemContainerStyle}>
			<div>{props.item.title}</div>
			<div>
				<GroupIcon sx={{ fontSize: 16 }} />
				{props.item.participantCnt}/{props.item.capacity} |{' '}
				{dateFormat(props.item.deadline)}까지
			</div>
			<Chip label={props.item.category} sx={{ color: 'grey' }} />
		</div>
	);
}
*/

/*
const ItemStyle = css`
	margin: 3px 0;
	padding: 10px 0;
	width: 100%;
	height: 95px;
	border-radius: 10px;
	padding-left: 20px;
	box-sizing: border-box;
	&:nth-child(2n) {
		background-color: #ffe7e7;
	}
	&:nth-child(2n + 1) {
		background-color: #fefafa;
	}
`;

const TopicStyle = css`
	font-size: 14px;
	font-weight: bold;
`;

const DescStyle = css`
	font-size: 12px;
	color: #5a5a5a;
	display: flex;
	margin: 7px 0;
`;

const StyledLink = css`
	text-decoration: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: black;
	}
`;
*/
