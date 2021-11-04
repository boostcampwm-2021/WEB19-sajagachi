import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import FilteringModal from './component/FilteringModal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { fetchGet } from '../../util/util';
import 'dotenv/config';
import { ItemType } from '../../type/types';
import ErrorAlert from './component/ErrorAlert';
import noItemImg from '../../asset/noitem.png';

const mainContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;
const ImageStyle = css`
	width: 100%;
`;
function Main() {
	const [isModalOn, setIsModalOn] = useState(false);
	const [items, setItems] = useState<ItemType[]>([]);
	const [alert, setAlert] = useState(false);
	const [isFetch, setIsFetch] = useState(false);
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
			if (target.isIntersecting) {
				console.log('보임');
				setOffset(prev => prev);
				fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/post`, {
					offset: offset,
					limit: 8
				})
					.then(result => {
						setIsFetch(true);
						setItems(prev => [...prev, ...result]);
						console.log('플러스 전:', offset);
						console.log('aksfjkdjfkdjfkjdkfj:', result.length);
						setOffset(prev => {
							console.log('제발:', prev + result.length);
							return prev + result.length;
						});
						console.log('플러스 후:', offset);
					})
					.catch(e => {
						setIsFetch(true);
						setAlert(true);
					});
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
			{alert && <ErrorAlert alert={alert} />}
			<PostList items={items} />
			<div ref={loader} />
			{isFetch && items.length === 0 && (
				<img src={noItemImg} css={ImageStyle} alt={'noItem'} />
			)}

			<FAB />
		</div>
	);
}

export default Main;
