import React, { MouseEvent, useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import RoomIcon from '@mui/icons-material/Room';
import Button from '@mui/material/Button';
import { LocationType } from '../../../type';

type mapState = {
  setIsMapOn: any;
  setLocation: (location: LocationType) => void;
  location: LocationType;
};

function NaverMapAPI({ setIsMapOn, setLocation, location }: mapState) {
  let map: any = null;
  useEffect(() => {
    const initMap = () => {
      map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(location.lat, location.lng),
        zoom: 16
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

  return (
    <React.Fragment>
      <div id="map" style={mapStyle}>
        <RoomIcon css={centerMarker} />
        <Button css={locationButton} onClick={handleLocationButtonClick}>
          위치 지정 완료
        </Button>
      </div>
    </React.Fragment>
  );
}

export default NaverMapAPI;

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

//지도 사이즈 관련 스타일
const mapStyle = {
  width: '100vw',
  height: 'calc(100vh - 4.4rem)'
};
