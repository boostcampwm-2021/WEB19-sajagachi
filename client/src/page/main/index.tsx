import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import FilteringModal from './component/FilteringModal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { fetchGet } from '../../util/util';
import 'dotenv/config';
import { Alert, Grow } from '@mui/material';
import { ItemType } from '../../type/types';

const mainContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;

const alertStyle = css``;

function Main() {
	const [isModalOn, setIsModalOn] = useState(false);
	const [items, setItems] = useState<ItemType[]>([]);
	const [alert, setAlert] = useState(false);
	const [offset, setOffset] = useState(0);
	const loader = useRef(null);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0
		};
		const observer = new IntersectionObserver((entry, obs) => {
			const target = entry[0];
			console.log('보임');
			if (target.isIntersecting) {
				fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/post`, {
					offset,
					limit: 8
				})
					.then(async result => {
						setItems(prev => [...prev, ...result]);
						console.log('플러스 전:', offset);
						console.log('aksfjkdjfkdjfkjdkfj:', result.length);
						await setOffset(prev => prev + result.length);
						console.log('플러스 후:', offset);
					})
					.catch(e => setAlert(true));
			}
		}, option);
		if (loader.current) observer.observe(loader.current);
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
			<div ref={loader} />
			<FAB />
		</div>
	);
}

export default Main;
