import React, { useState, MouseEvent } from 'react';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import NaverMapAPI from './NaverMapAPI';

const mapContainer = css`
	position: fixed;
	top: calc(-50vh + 250px + 4.4rem);
	left: calc(-50vw + 150px);
	width: 100vw;
	height: calc(100vh - 4.4rem);
	z-index: 1;
	border: 0px solid;
`;

function MapModal({
	setLocation,
	location
}: {
	setLocation: any;
	location: any;
}) {
	const [isMapOn, setIsMapOn] = useState(false);

	function handleMapBtnClick(e: MouseEvent<HTMLElement>) {
		setIsMapOn(!isMapOn);
		console.log(isMapOn);
	}

	return (
		<>
			<Button onClick={handleMapBtnClick}>지도에서 선택</Button>
			{isMapOn && (
				<div css={mapContainer}>
					<NaverMapAPI
						setIsMapOn={setIsMapOn}
						setLocation={setLocation}
						location={location}
					/>
				</div>
			)}
		</>
	);
}

export default MapModal;
