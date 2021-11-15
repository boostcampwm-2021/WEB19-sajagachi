import React from 'react';
import { css } from '@emotion/react';
import GroupIcon from '@mui/icons-material/Group';
import { ItemType } from '../../../type';
import { dateFormat } from '../../../util/util';
import { Chip } from '@mui/material';
import { Done } from '@mui/icons-material';

function isFinished(item: ItemType) {
	const now = new Date();
	if (!item.deadline) return false;
	return item.finished || new Date(item.deadline) <= now;
}

const categoryColor: any = {
	배달음식: '#ffe8fc',
	로켓배송: '#ffdfc1',
	대용량: '#c1eade',
	정기권: '#d3e6ed',
	해외직구: '#e3e6fc',
	기타: '#d4dfe1'
};

const ItemContainerStyle = css`
	width: 100%;
	height: 100%;
	padding: 15px 90px 10px 15px;
`;

const ItemTitleStyle = css`
	font-family: 'Noto Sans KR Medium', sans-serif;
	font-size: 18px;
	margin: 0;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

const FinishedItemTitleStyle = css`
	${ItemTitleStyle};
	color: #aeaeae;
`;

const ItemDeadlineStyle = css`
	font-size: 12px;
	margin: 5px 0;
	color: #404040;
`;

const FinishedItemDeadlineStyle = css`
	${ItemDeadlineStyle};
	color: #aeaeae;
`;

const ItemDescStyle = css`
	--font-size: 9px;
	--line-height: 1.4;
	--lines-to-show: 2;
	font-size: var(--font-size);
	text-overflow: ellipsis;
	height: calc(var(--font-size) * var(--line-height) * var(--lines-to-show));
	line-height: var(--line-height);
	margin: 5px 0;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: var(--lines-to-show);
	-webkit-box-orient: vertical;
	color: #404040;
`;

const FinishedItemDescStyle = css`
	${ItemDescStyle};
	color: #aeaeae;
`;

const ChipContainerStyle = css`
	position: absolute;
	top: 25px;
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

export function ItemContent(props: { item: ItemType }) {
	const TitleStyle = isFinished(props.item)
		? FinishedItemTitleStyle
		: ItemTitleStyle;

	const DeadlineStyle = isFinished(props.item)
		? FinishedItemDeadlineStyle
		: ItemDeadlineStyle;

	const DescStyle = isFinished(props.item)
		? FinishedItemDescStyle
		: ItemDescStyle;

	let deadline = props.item.deadline;
	if (deadline) deadline = `${dateFormat(props.item.deadline)}까지`;
	else deadline = '마감 기한 없음';

	let ParticipantChip;
	if (isFinished(props.item)) {
		ParticipantChip = (
			<Chip
				icon={<Done sx={{ fontSize: 16 }} />}
				label="마감"
				sx={ChipStyle('#dadada')}
				size="small"
			/>
		);
	} else {
		ParticipantChip = (
			<Chip
				icon={<GroupIcon sx={{ fontSize: 16 }} />}
				label={`${props.item.participantCnt}/${
					props.item.capacity ?? '-'
				}명`}
				sx={ChipStyle('#ffd8d9')}
				size="small"
			/>
		);
	}

	return (
		<div css={ItemContainerStyle}>
			<h1 css={TitleStyle}>{props.item.title}</h1>
			<p css={DeadlineStyle}>{deadline}</p>
			<p css={DescStyle}>{props.item.content.substring(0, 100)}</p>
			<div css={ChipContainerStyle}>
				<Chip
					label={props.item.category}
					sx={ChipStyle(categoryColor[props.item.category])}
					size="small"
				/>
				{ParticipantChip}
			</div>
		</div>
	);
}
