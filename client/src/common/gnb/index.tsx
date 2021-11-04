import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchInput from './component/SearchInput';
import { locationState } from '../../store/location';
import { useRecoilState } from 'recoil';

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
	justify-content: space-between;
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
	width: 48px;
	height: 48px;
`;

const btnIcon = css`
	width: 32px;
	height: 32px;
	color: white;
`;

const DEFAULT_LOCATION_LAT = 37.5642135;
const DEFAULT_LOCATION_LNG = 127.0016985;

function Gnb() {
	const [location, setLocation] = useRecoilState(locationState);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			function (pos) {
				setLocation({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				});
			},
			function () {
				setLocation({
					lat: DEFAULT_LOCATION_LAT,
					lng: DEFAULT_LOCATION_LNG
				});
			}
		);
	}, []);

	return (
		<div css={gnbBackground}>
			<div css={gnbContainer}>
				<a href="/" css={logo}>
					🦁
				</a>
				<SearchInput />
				<IconButton css={btn}>
					<AccountCircleIcon css={btnIcon} />
				</IconButton>
			</div>
		</div>
	);
}

export default Gnb;
