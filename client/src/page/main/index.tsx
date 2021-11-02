import React, { useState, MouseEvent } from 'react';
import FilteringModal from './component/FilteringModal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';

const mainContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
	height: 100%;
`;

const nothing = css``;

function Main() {
	const [isModalOn, setIsModalOn] = useState(false);

	function handleFilterClick(e: MouseEvent<HTMLElement>) {
		setIsModalOn(!isModalOn);
	}

	return (
		<div css={mainContainer}>
			<IconButton onClick={handleFilterClick}>
				<FilterAltIcon />
			</IconButton>
			{isModalOn && <FilteringModal />}
		</div>
	);
}

export default Main;
