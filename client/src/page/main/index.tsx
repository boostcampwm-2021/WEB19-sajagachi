import React, { useState, MouseEvent, useEffect } from 'react';
import FilteringModal from './component/FilteringModal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { fetchGet } from '../../util/util';
import 'dotenv/config';
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
	const [items, setItems] = useState([]);
	const [alert, setAlert] = useState(false);
	const [isFetch, setIsFetch] = useState(false);
	useEffect(() => {
		const initialQuery = { offset: 0, limit: 10 };
		fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/post`, initialQuery)
			.then(result => {
				setIsFetch(true);
				setItems(result);
			})
			.catch(e => {
				setIsFetch(true);
				setAlert(true);
			});
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
			{isFetch && items.length === 0 && (
				<img src={noItemImg} css={ImageStyle} alt={'noItem'} />
			)}
			<FAB />
		</div>
	);
}

export default Main;
