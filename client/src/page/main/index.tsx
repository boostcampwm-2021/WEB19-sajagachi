import React, { useState, MouseEvent } from 'react';
import FilteringModal from './component/FilteringModal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';

const mainContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
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
			<PostList />
			<FAB />
		</div>
	);
}

export default Main;
