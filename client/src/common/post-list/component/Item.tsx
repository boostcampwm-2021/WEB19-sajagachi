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

const ChipStyle = (backgroundColor: string) => ({
	backgroundColor,
	marginBottom: '5px',
	fontSize: '11px',
	padding: '0px',
	width: '65px',
	height: '28px'
});

export default function Item(props: { item: ItemType }) {
	return (
		<li css={ItemStyle}>
			<Link to={`/post/${props.item.id}`} css={LinkStyle}>
				<ItemContent item={props.item} />
			</Link>
		</li>
	);
}

function ItemContent(props: { item: ItemType }) {
	return (
		<div css={ItemContainerStyle}>
			<h1 css={ItemTitleStyle}>{props.item.title}</h1>
			<p css={ItemDeadlineStyle}>{dateFormat(props.item.deadline)}까지</p>
			<p css={ItemDescStyle}>{props.item.content.substring(0, 100)}</p>
			<div css={ChipContainerStyle}>
				<Chip
					label={props.item.category}
					sx={ChipStyle('grey')}
					size="small"
				/>
				<Chip
					icon={<GroupIcon sx={{ fontSize: 16 }} />}
					label={`${props.item.participantCnt}/${props.item.capacity}명`}
					sx={ChipStyle('#FFD8D9')}
					size="small"
				/>
			</div>
		</div>
	);
}
