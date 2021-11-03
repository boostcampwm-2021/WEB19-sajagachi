import React, { useState, MouseEvent, useEffect } from 'react';
import FilteringModal from './component/FilteringModal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { fetchGet } from '../../util/util';
import 'dotenv/config';

const mainContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;

function Main() {
	const [isModalOn, setIsModalOn] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		const initialQuery = { offset: 0, limit: 5 };
		fetchGet(`${process.env.REACT_APP_SERVER_URL}/post`, initialQuery).then(
			result => setItems(result)
		);
	}, []);

	function handleFilterClick(e: MouseEvent<HTMLElement>) {
		setIsModalOn(!isModalOn);
	}

	return (
		<div css={mainContainer}>
			<IconButton onClick={handleFilterClick}>
				<FilterAltIcon />
			</IconButton>
			{isModalOn && <FilteringModal />}
			<PostList items={items} />
			<FAB />
		</div>
	);
}

export default Main;
