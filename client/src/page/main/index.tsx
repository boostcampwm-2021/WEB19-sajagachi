import React, { useState, useEffect, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import {
	createQueryString,
	decomposeQueryString,
	fetchGet
} from '../../util/util';
import { ItemType } from '../../type';
import ErrorAlert from './component/ErrorAlert';
import noItemImg from '../../asset/noitem.png';
import { CircularProgress, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/system';
import { useRecoilValue } from 'recoil';
import { locationState } from '../../store/location';
import LocationIndicator from './component/LocationIndicator';

const theme = createTheme({
	palette: {
		primary: {
			main: '#ebabab'
		}
	}
});

const mainContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;
const ImageStyle = css`
	width: 100%;
`;

const loadingSpinner = css`
	margin-left: auto;
	margin-right: auto;
`;

function Main() {
	const [items, setItems] = useState<ItemType[]>([]);
	const [alert, setAlert] = useState(false);
	const [isFetch, setIsFetch] = useState(false);
	const location = useRecoilValue(locationState);

	let offset = useRef(0);
	const loader = useRef(null);

	useEffect(() => {
		setItems([]);
		offset.current = 0;
	}, [window.location.search, location]);

	const handleObserver = useCallback(
		entry => {
			const target = entry[0];
			const filter = decomposeQueryString(window.location.search);
			if (target.isIntersecting) {
				setIsFetch(false);
				fetchGet(
					`${process.env.REACT_APP_SERVER_URL}/api/post`,
					createQueryString({
						offset: offset.current,
						limit: 15,
						lat: location.lat,
						long: location.lng,
						...filter
					})
				)
					.then(result => {
						setIsFetch(true);
						setItems(prev => [...prev, ...result]);
						offset.current += result.length;
					})
					.catch(e => {
						setIsFetch(true);
						setAlert(true);
					});
			}
		},
		[window.location.search, location]
	);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loader.current) observer.observe(loader.current);
		return () => {
			if (loader.current) observer.unobserve(loader.current);
		};
	}, [handleObserver]);

	return (
		<div css={mainContainer}>
			{alert && <ErrorAlert alert={alert} />}
			<LocationIndicator />
			<PostList items={items} />
			<div ref={loader} />
			{!isFetch && (
				<ThemeProvider theme={theme}>
					<Box sx={{ display: 'flex' }}>
						<CircularProgress css={loadingSpinner} />
					</Box>
				</ThemeProvider>
			)}
			{isFetch && items.length === 0 && (
				<img src={noItemImg} css={ImageStyle} alt={'noItem'} />
			)}
			<FAB />
		</div>
	);
}

export default Main;
