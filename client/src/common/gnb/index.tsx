import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchInput from './component/SearchInput';

const gnbBackground = css`
	z-index: 1;
	width: 100%;
	height: 4.4rem;
	position: fixed;
	right: 0;
	top: 0;
	left: 0;
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

function Gnb() {
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (pos) {
			const latitude = pos.coords.latitude;
			const longitude = pos.coords.longitude;
			// alert('현재 위치는 : ' + latitude + ', ' + longitude);
		});
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
