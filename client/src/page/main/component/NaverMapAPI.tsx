import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import RoomIcon from '@mui/icons-material/Room';

const naverMapDiv = css`
	position: relative;
	z-index: 2;
`;

const centerMarker = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -100%);
	z-index: 100;
	color: red;
`;

function NaverMapAPI() {
	useEffect(() => {
		let map: any = null;
		const initMap = () => {
			map = new naver.maps.Map('map', {
				center: new naver.maps.LatLng(37.5171877, 127.041255),
				zoom: 13
			});
			// naver.maps.Event.addListener(map, 'center_changed', e => {
			// 	console.log(map.getCenter());
			// });
		};
		initMap();
	}, []);

	//지도 사이즈 관련 스타일
	const mapStyle = {
		width: '100%',
		height: '100%'
	};

	return (
		<React.Fragment>
			<div id="map" css={naverMapDiv} style={mapStyle}>
				<RoomIcon css={centerMarker} />
			</div>
		</React.Fragment>
	);
}

export default NaverMapAPI;
