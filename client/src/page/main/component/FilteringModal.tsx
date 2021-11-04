import React, { MouseEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';
import { locationState } from '../../../store/loction';
import { useRecoilValue } from 'recoil';
import MapDrawer from './MapDrawer';

const filteringModal = css`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	height: 500px;
	background-color: white;
	border: 1px solid;
	border-color: black;
	border-radius: 20px;
`;

function FilteringModal() {
	const [location, setLocation] = useState({});
	const currentLocation = useRecoilValue(locationState);
	useEffect(() => {
		setLocation(currentLocation);
	}, []);
	return (
		<div css={filteringModal}>
			<div>
				<h3>위치</h3>
				<MapDrawer setLocation={setLocation} location={location} />
			</div>
			<div>
				<h3>카테고리</h3>
			</div>
			<div>
				<h3>거래상태</h3>
			</div>
			<Button>완료</Button>
		</div>
	);
}

export default FilteringModal;
