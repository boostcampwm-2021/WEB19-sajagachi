import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { locationState } from '../../store/location';
import { useRecoilState } from 'recoil';
import SearchModalDrawer from './component/SearchModalDrawer';
import { withRouter } from 'react-router-dom';
import logo1 from '../../asset/logo1.svg';
import logo2 from '../../asset/logo2.svg';
import logo3 from '../../asset/logo3.svg';
import BackButton from './component/BackButton';
import LoginModal from '../login-modal';

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

const randomLogo = () => {
	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}
	const target = getRandomInt(1, 4);
	switch (target) {
		case 1:
			return logo1;
		case 2:
			return logo2;
		case 3:
			return logo3;
		default:
			return logo1;
	}
};

const SearchModalDrawerWithRouter = withRouter(SearchModalDrawer);

function Gnb() {
	const [location, setLocation] = useRecoilState(locationState);
	const [isLoginModalOn, setIsLoginModalOn] = useState(false);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (pos) {
			setLocation({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			});
		});
	}, []);

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
						src={randomLogo()}
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
		</div>
	);
}

export default Gnb;
