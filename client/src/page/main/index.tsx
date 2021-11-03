import React, { useState, MouseEvent, useEffect } from 'react';
import FilteringModal from './component/FilteringModal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { fetchGet } from '../../util/util';
import 'dotenv/config';
import { Alert, Grow } from '@mui/material';

const mainContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;

const alertStyle = css``;

function Main() {
	const [isModalOn, setIsModalOn] = useState(false);
	const [items, setItems] = useState([]);
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		const initialQuery = { offset: 0, limit: 10 };
		fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/post`, initialQuery)
			.then(result => setItems(result))
			.catch(e => setAlert(true));
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
			<Grow in={alert} style={{ transformOrigin: '0 0 0' }}>
				<Alert severity="error" css={alertStyle}>
					게시글을 불러오는 중 문제가 발생했어요.
				</Alert>
			</Grow>
			<PostList items={items} />
			<FAB />
		</div>
	);
}

export default Main;
