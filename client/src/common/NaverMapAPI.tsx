import React, { useEffect } from 'react';

function NaverMapAPI() {
	useEffect(() => {
		let map = null;
		const initMap = () => {
			map = new naver.maps.Map('map', {
				center: new naver.maps.LatLng(37.511337, 127.012084),
				zoom: 13
			});
		};
		initMap();
	}, []);

	//지도 사이즈 관련 스타일
	const mapStyle = {
		width: '400px',
		height: '400px'
	};

	return (
		<React.Fragment>
			<div id="map" style={mapStyle}></div>
		</React.Fragment>
	);
}

export default NaverMapAPI;
