import React, { MouseEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';
import { locationState } from '../../store/location';
import { useRecoilState, useRecoilValue } from 'recoil';
import MapDrawer from './component/MapDrawer';
import SearchInput from './component/SearchInput';
import { Chip, Stack } from '@mui/material';
import { boolToNum, createQueryString, finishedToBool } from '../../util/util';
import { addressState } from '../../store/address';

const searchModal = css`
	max-width: 700px;
	margin-left: auto;
	margin-right: auto;
	width: 100vw;
	height: 100vh;
	background-color: #fff7f7;
	z-index: 1;
	padding: 10px;
`;

const CategoryStyle = css`
	& > h3 {
		margin-bottom: 5px;
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
	}
`;

const ChipStyle = (checked: boolean) => {
	return css`
		width: 80px;
		margin: 3px 3px;
		${checked ? 'background-color: #ebabab; color: #ffffff;' : ''}
		&:hover {
			background-color: #ebe4e4;
			${checked ? 'background-color: #ebabab;' : ''}
		}
	`;
};

const StateStyle = css`
	& > h3 {
		margin-bottom: 5px;
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
	}
`;

const LocationStyle = css`
	& > h3 {
		margin-bottom: 5px;
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
	}
`;

const buttonContainerStyle = css`
	text-align: right;
`;

const CATEGORY_LIST = ['로켓배송', '배달음식', '해외배송', '대용량', '정기권'];
const FINISHED_LIST = ['공구중', '공구완료'];

function SearchModal({ setIsSearchModalOn }: { setIsSearchModalOn: any }) {
	const [checkedCategories, setCheckedCategories] = useState(
		new Array(CATEGORY_LIST.length).fill(false)
	);

	const [checkedFinished, setCheckedFinished] = useState([false, false]);
	const [location, setLocation] = useRecoilState(locationState);
	const [address, setAddress] = useRecoilState(addressState);

	useEffect(() => {
		if (JSON.stringify(location) !== JSON.stringify({}))
			searchCoordinateToAddress(location);
	}, [location]);

	function searchCoordinateToAddress(latlng: any) {
		if (naver.maps.Service) {
			naver.maps.Service.reverseGeocode(
				{
					location: new naver.maps.LatLng(latlng.lat, latlng.lng)
				},
				function (status, response) {
					if (status !== naver.maps.Service.Status.OK) {
						// 에러 처리를 어떻게 해야하지?
					}
					setAddress(response.result.items[0].address);
				}
			);
		}
	}

	const handleCategoryClick = (idx: number) => {
		setCheckedCategories(checkedCategories => {
			const arr = [...checkedCategories];
			arr[idx] = !arr[idx];
			return arr;
		});
	};
	const handleFinishedClick = (idx: number) => {
		setCheckedFinished(checkedFinished => {
			const arr = [...checkedFinished];
			arr[idx] = !arr[idx];
			return arr;
		});
	};

	const handleSubmitClick = () => {
		const query = {
			offset: 0,
			limit: 10,
			category: boolToNum(checkedCategories),
			finished: finishedToBool(checkedFinished),
			location: location
		};
	};

	return (
		<div>
			<div css={searchModal}>
				<SearchInput />
				<div css={CategoryStyle}>
					<h3>카테고리</h3>
					<div>
						{CATEGORY_LIST.map((category, i) => (
							<Chip
								label={category}
								css={ChipStyle(checkedCategories[i])}
								onClick={() => {
									handleCategoryClick(i);
								}}
								data-idx={i}
							/>
						))}
					</div>
				</div>
				<div css={StateStyle}>
					<h3>공구 상태</h3>
					<div>
						{FINISHED_LIST.map((finished, i) => (
							<Chip
								label={finished}
								css={ChipStyle(checkedFinished[i])}
								onClick={() => {
									handleFinishedClick(i);
								}}
								data-idx={i}
							/>
						))}
					</div>
				</div>
				<div css={LocationStyle}>
					<h3>위치</h3>
					<p>{address}</p>
					<MapDrawer />
				</div>
				<div css={buttonContainerStyle}>
					<Button
						variant="contained"
						style={{ backgroundColor: '#ebabab' }}
						onClick={e => {
							handleSubmitClick();
							setIsSearchModalOn(false);
						}}
					>
						완료
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SearchModal;