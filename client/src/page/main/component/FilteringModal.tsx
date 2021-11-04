import React, { MouseEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';
import { locationState } from '../../../store/loction';
import { useRecoilValue } from 'recoil';
import MapDrawer from './MapDrawer';
import { Chip, Stack } from '@mui/material';
import { borderRight } from '@mui/system';

const filteringModal = css`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	background-color: white;
	border: 1px solid;
	border-color: black;
	border-radius: 20px;
	z-index: 1;
	padding: 10px;
`;

const CategoryStyle = css`
	& > h3 {
		margin-bottom: 5px;
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
	}
`;

const CategoryChipStyle = (checked: boolean) => {
	return css`
		width: 80px;
		margin: 3px 3px;
		${checked ? 'background-color: red;' : ''}
	`;
};

const StateStyle = css`
	& > h3 {
		margin-bottom: 5px;
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
	}
`;

const StateChipStyle = css`
	width: 80px;
	margin: 3px 3px;
`;

const LocationStyle = css`
	& > h3 {
		margin-bottom: 5px;
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
	}
`;

const buttonContainerStyle = css`
	text-align: right;
`;

const CATEGORY_LIST = ['로켓배송', '배달음식', '해외배송', '대용량', '정기권'];

function FilteringModal() {
	const [checkedCategories, setCheckedCategories] = useState(
		new Array(CATEGORY_LIST.length).fill(false)
	);
	const [location, setLocation] = useState({});
	const currentLocation = useRecoilValue(locationState);

	useEffect(() => {
		setLocation(currentLocation);
	}, []);

	const handleCategoryClick = (idx: number) => {
		setCheckedCategories(checkedCategories => {
			const arr = [...checkedCategories];
			arr[idx] = !arr[idx];
			return arr;
		});
	};

	return (
		<div css={filteringModal}>
			<div css={CategoryStyle}>
				<h3>카테고리</h3>
				<div>
					{CATEGORY_LIST.map((category, i) => (
						<Chip
							label={category}
							css={CategoryChipStyle(checkedCategories[i])}
							onClick={() => {
								handleCategoryClick(i);
							}}
							data-idx={i}
						/>
					))}
				</div>
			</div>
			<div css={StateStyle}>
				<h3>공구 상태</h3>
				<div>
					<Chip label="공구중" css={StateChipStyle} />
					<Chip label="공구완료" css={StateChipStyle} />
				</div>
			</div>
			<div css={LocationStyle}>
				<h3>위치</h3>
				<MapDrawer setLocation={setLocation} location={location} />
			</div>
			<div css={buttonContainerStyle}>
				<Button
					variant="contained"
					style={{ backgroundColor: '#ebabab' }}
				>
					완료
				</Button>
			</div>
		</div>
	);
}

export default FilteringModal;
