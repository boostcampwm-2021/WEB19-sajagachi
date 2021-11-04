import React, { useState, MouseEvent } from 'react';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import NaverMapAPI from './NaverMapAPI';

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
				<div>
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
