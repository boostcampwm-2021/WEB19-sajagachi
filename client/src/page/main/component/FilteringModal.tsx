import React, { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';
import MapModal from './MapModal';

const filteringModal = css`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	height: 500px;
	border: 1px solid;
	border-color: black;
	border-radius: 20px;
`;

function FilteringModal() {
	const [location, setLocation] = useState({});

	return (
		<div css={filteringModal}>
			<div>
				<h3>위치</h3>
				<MapModal setLocation={setLocation} />
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
