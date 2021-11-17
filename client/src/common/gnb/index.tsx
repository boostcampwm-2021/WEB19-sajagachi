import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { locationState } from '../../store/location';
import { useRecoilState } from 'recoil';
import SearchModalDrawer from './component/SearchModalDrawer';
import { withRouter } from 'react-router-dom';
import logoImg from '../../asset/logo.svg';
import BackButton from './component/BackButton';
import LoginModal from '../login-modal';
import Alert from '../alert';
import { Backdrop } from '@mui/material';
import LoadingUI from './component/LoadingUI';

const gnbBackground = css`
	z-index: 1;
	height: 4.4rem;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background-color: #ebabab;
	& + * {
		margin-top: 4.4rem;
	}
`;

const gnbContainer = css`
	margin: auto;
	max-width: 700px;
	height: 4.4rem;
	display: flex;
	flex-direction: row;

	align-items: center;
`;

const logo = css`
	width: 40px;
	height: 40px;
	font-size: 30px;
	padding: 0;
	text-align: center;
	line-height: 40px;
`;

const btn = css`
	width: 2.43rem;
	height: 2.43rem;
`;

const btnIcon = css`
	width: 1.9rem;
	height: 1.9rem;
	color: white;
`;

const SearchModalDrawerWithRouter = withRouter(SearchModalDrawer);

function Gnb() {
	const [location, setLocation] = useRecoilState(locationState);
	const [isLoginModalOn, setIsLoginModalOn] = useState(false);
	const [isAlertOn, setIsAlertOn] = useState(false);
	const [isBackdropOn, setIsBackropOn] = useState(false);

	useEffect(() => {
		const onSuccess = (pos: any) => {
			setLocation({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
				isLoaded: true
			});
			localStorage.setItem('lat', pos.coords.latitude);
			localStorage.setItem('lng', pos.coords.longitude);
		};

		const onFailure = () => {
			setLocation({
				lat: location.lat,
				lng: location.lng,
				isLoaded: true
			});
			setIsAlertOn(true);
		};

		const lat = localStorage.getItem('lat');
		const lng = localStorage.getItem('lng');

		if (lat && lng) {
			setLocation({
				lat: +lat,
				lng: +lng,
				isLoaded: true
			});
		} else {
			setIsBackropOn(true);
			navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
		}
	}, []);

	useEffect(() => {
		setIsBackropOn(!location.isLoaded);
	}, [location.isLoaded]);

	function handleLoginClick(e: React.MouseEvent<HTMLElement>) {
		setIsLoginModalOn(!isLoginModalOn);
	}

	return (
		<div css={gnbBackground}>
			<div css={gnbContainer}>
				<div
					style={{
						flex: 1
					}}
				>
					<BackButton />
				</div>
				<Link to="/">
					<img
						src={logoImg}
						style={{
							flex: 2,
							maxHeight: '3.1rem',
							maxWidth: '12rem'
						}}
					/>
				</Link>
				<div
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<SearchModalDrawerWithRouter />
					<IconButton css={btn} onClick={handleLoginClick}>
						<AccountCircleIcon css={btnIcon} />
					</IconButton>
					{isLoginModalOn && (
						<LoginModal setIsLoginModalOn={setIsLoginModalOn} />
					)}
				</div>
			</div>
			<Alert
				on={isAlertOn}
				title="위치를 불러오지 못했어요"
				onClose={() => setIsAlertOn(false)}
			>
				위치 권한을 허용해주시면 근처의 공동구매 게시글을 검색해드릴 수
				있어요.
			</Alert>
			<Backdrop open={isBackdropOn} sx={{ backgroundColor: '#ffffff' }}>
				<LoadingUI />
			</Backdrop>
		</div>
	);
}

export default Gnb;
