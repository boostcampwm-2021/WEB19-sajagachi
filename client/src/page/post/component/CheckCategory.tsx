import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Chip from '@mui/material/Chip';
import { fetchGet } from '../../../util/util';

const CategoryStyle = css`
	width: 90%;
	font-family: -apple-system;
	& > h3 {
		margin-bottom: 5px;
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
	}
`;

const ChipStyle = (checked: boolean) => {
	return css`
		width: 80px;
		margin: 3px 3px;
		${checked ? 'background-color: #ebabab; color: #ffffff;' : ''}
		&:hover {
			background-color: #ebe4e4;
			${checked ? 'background-color: #ebabab;' : ''}
		}
	`;
};

interface CategoryState {
	category: boolean[];
	setCategory: (category: boolean[]) => void;
}

function CheckCategory({ category, setCategory }: CategoryState) {
	const [categoryList, setCategoryList] = useState([]);

	useEffect(() => {
		fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/category`).then(
			result => {
				setCategoryList(result.map((x: any) => x.name));
				setCategory(new Array(result.length).fill(false));
			}
		);
	}, []);

	const handleCategoryClick = (idx: number) => {
		const updateCategory = [...category];
		updateCategory[idx] = !updateCategory[idx];
		setCategory(updateCategory);
	};

	return (
		<div css={CategoryStyle}>
			<h3>카테고리</h3>
			<div>
				{categoryList.map((categoryElem, i) => (
					<Chip
						label={categoryElem}
						css={ChipStyle(category[i])}
						onClick={() => {
							handleCategoryClick(i);
						}}
						data-idx={i}
					/>
				))}
			</div>
		</div>
	);
}

export default React.memo(CheckCategory);
