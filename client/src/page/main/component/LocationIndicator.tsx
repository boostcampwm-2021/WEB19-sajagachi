import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { LocationOn } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { locationState } from '../../../store/location';
import { getAddressByGeocode } from '../../../util';
import { CircularProgress } from '@mui/material';

const LocationIndicatorStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15px;
`;

const AddressStyle = css`
  margin: 10px 0;
  font-size: 12px;
`;

const ReloadStyle = css`
  margin: 10px 5px;
  font-size: 10px;
  color: #f76a6a;
  background: transparent;
  border: none;
`;

const ProgressStyle = {
  color: '#f76a6a',
  marginLeft: '5px'
};

const LocationOnIconStyle = css`
  width: 18px;
  height: 14px;
  color: #f76a6a;
`;

export default function LocationIndicator() {
  const [location, setLocation] = useRecoilState(locationState);
  const [address, setAddress] = useState('위치 확인 중');
  const [isProgressOn, setIsProgressOn] = useState(false);

  const updateAddress = async () => {
    const res = await getAddressByGeocode(location.lat, location.lng);
    setAddress(res);
  };

  useEffect(() => {
    location.isLoaded && updateAddress();
  }, [location]);

  const handleReloadClick = () => {
    const onSuccess = (pos: any) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        isLoaded: true
      });
      localStorage.setItem('lat', pos.coords.latitude);
      localStorage.setItem('lng', pos.coords.longitude);
      setTimeout(() => {
        setIsProgressOn(false);
      }, 1000);
    };

    const onFailure = () => {
      setTimeout(() => {
        setIsProgressOn(false);
      }, 1000);
    };

    setIsProgressOn(true);
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
  };

  return (
    <div css={LocationIndicatorStyle}>
      <LocationOn css={LocationOnIconStyle} />
      <p css={AddressStyle}>{address}</p>
      {isProgressOn ? (
        <CircularProgress size={14} sx={ProgressStyle} />
      ) : (
        <button onClick={handleReloadClick} css={ReloadStyle}>
          새로고침
        </button>
      )}
    </div>
  );
}
