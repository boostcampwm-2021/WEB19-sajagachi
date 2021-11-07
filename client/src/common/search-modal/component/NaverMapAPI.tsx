import React, { MouseEvent, useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import RoomIcon from '@mui/icons-material/Room';
import Button from '@mui/material/Button';
import { locationState } from '../../../store/location';
import { useRecoilState } from 'recoil';

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
};

const DEFAULT_LOCATION = {
	lat: 37.5642135,
	lng: 127.0016985
};

function NaverMapAPI({ setIsMapOn }: mapState) {
	const [location, setLocation] = useRecoilState(locationState);
	let map: any = null;
	useEffect(() => {
		let center: { lat: number; lng: number };
		if (JSON.stringify(location) === JSON.stringify({})) {
			center = DEFAULT_LOCATION;
		} else {
			center = location;
		}
		const initMap = () => {
			map = new naver.maps.Map('map', {
				center: new naver.maps.LatLng(center.lat, center.lng),
				zoom: 13
			});
		};
		initMap();
	}, [location]);

	const handleLocationButtonClick = useCallback(
		(e: MouseEvent<HTMLElement>) => {
			const center = map.getCenter();
			setLocation({ lat: center.lat(), lng: center.lng() });
			setIsMapOn(false);
		},
		[location]
	);

	//지도 사이즈 관련 스타일
	const mapStyle = {
		width: '100vw',
		height: 'calc(100vh - 4.4rem)'
	};

	return (
		<React.Fragment>
			<div id="map" style={mapStyle}>
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
