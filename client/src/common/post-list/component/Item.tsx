import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import GroupIcon from '@mui/icons-material/Group';
import { ItemType } from '../../../type/types';
import Tag from '../../tag';

const ItemStyle = css`
	margin: 3px 0;
	padding: 10px 0;
	width: 100%;
	height: 90px;
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

export default function Item(props: { item: ItemType }) {
	return (
		<li css={ItemStyle} key={props.item.post_id}>
			<div css={TopicStyle}>{props.item.title}</div>
			<div css={DescStyle}>
				<GroupIcon sx={{ fontSize: 16 }} />
				{props.item.capacity} | {props.item.deadline}
			</div>
			<Tag content={props.item.category} color="grey" />
		</li>
	);
}