import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import GroupIcon from '@mui/icons-material/Group';
import { ItemType } from '../../../type';
import { dateFormat } from '../../../util/util';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

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

export default function Item(props: { item: ItemType }) {
	return (
		<li css={ItemStyle}>
			<Link to={`/post/${props.item.id}`} css={StyledLink}>
				<div css={TopicStyle}>{props.item.title}</div>
				<div css={DescStyle}>
					<GroupIcon sx={{ fontSize: 16 }} />
					{props.item.participantCnt}/{props.item.capacity} |{' '}
					{dateFormat(props.item.deadline)}까지
				</div>
				<Chip label={props.item.category} sx={{ color: 'grey' }} />
			</Link>
		</li>
	);
}
