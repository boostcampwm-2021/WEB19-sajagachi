import React, { MouseEvent, useEffect } from 'react';
import { css } from '@emotion/react';
import RoomIcon from '@mui/icons-material/Room';
import Button from '@mui/material/Button';

const naverMapDiv = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	z-index: 3;
`;

const centerMarker = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -100%);
	z-index: 100;
	color: red;
`;

const locationButton = css`
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 100;
	background-color: green;
	opacity: 0.5;

	color: white;
	&:hover {
		background-color: green;
		opacity: 1;
	}
`;

type mapState = {
	setIsMapOn: any;
	setLocation: any;
};

function NaverMapAPI({ setIsMapOn, setLocation }: mapState) {
	let map: any = null;
	useEffect(() => {
		const initMap = () => {
			map = new naver.maps.Map('map', {
				center: new naver.maps.LatLng(37.5171877, 127.041255),
				zoom: 13
			});
		};
		initMap();
	}, []);

	function handleLocationButtonClick(e: MouseEvent<HTMLElement>) {
		const location = map.getCenter();
		console.log(location);
		setLocation({ lat: location._Lat, lng: location._Lng });
		setIsMapOn(false);
	}

	//지도 사이즈 관련 스타일
	const mapStyle = {
		width: '100%',
		height: '100%'
	};

	return (
		<React.Fragment>
			<div id="map" css={naverMapDiv} style={mapStyle}>
				<RoomIcon css={centerMarker} />
				<Button
					css={locationButton}
					onClick={handleLocationButtonClick}
				>
					위치 지정 완료
				</Button>
			</div>
		</React.Fragment>
	);
}

export default NaverMapAPI;
