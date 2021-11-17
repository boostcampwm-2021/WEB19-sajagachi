import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { LocationOn, Sync } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { locationState } from '../../../store/location';
import { getAddressByGeocode } from '../../../util/util';

const LocationIndicatorStyle = css`
	display: flex;
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
`;

const LocationOnIconStyle = css`
	width: 18px;
	height: 14px;
	color: #f76a6a;
`;

const SyncIconStyle = css`
	width: 24px;
	height: 18px;
	color: #f76a6a;
`;

export default function LocationIndicator() {
	const location = useRecoilValue(locationState);
	const [address, setAddress] = useState('위치 확인 중');

	const updateAddress = async () => {
		const res = await getAddressByGeocode(location.lat, location.lng);
		setAddress(res);
	};

	useEffect(() => {
		location.isLoaded && updateAddress();
	}, [location.isLoaded]);

	return (
		<div css={LocationIndicatorStyle}>
			<LocationOn css={LocationOnIconStyle} />
			<p css={AddressStyle}>{address}</p>
			<p css={ReloadStyle}>새로고침</p>
		</div>
	);
}
