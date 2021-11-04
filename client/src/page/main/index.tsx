import React, {
	useState,
	MouseEvent,
	useEffect,
	useRef,
	useCallback
} from 'react';
import FilteringModal from './component/FilteringModal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { css } from '@emotion/react';
import PostList from '../../common/post-list';
import FAB from './component/FAB';
import { fetchGet } from '../../util/util';
import 'dotenv/config';
import { ItemType } from '../../type/types';
import ErrorAlert from './component/ErrorAlert';
import noItemImg from '../../asset/noitem.png';
import { IconButton, CircularProgress, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/system';

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
	const [isModalOn, setIsModalOn] = useState(false);
	const [items, setItems] = useState<ItemType[]>([]);
	const [alert, setAlert] = useState(false);
	const [isFetch, setIsFetch] = useState(false);

	let offset = useRef(0);
	const loader = useRef(null);

	const handleObserver = useCallback(entry => {
		const target = entry[0];
		if (target.isIntersecting) {
			setIsFetch(false);
			fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/post`, {
				offset: offset.current,
				limit: 8
			})
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
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loader.current) observer.observe(loader.current);
	}, [handleObserver]);

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
