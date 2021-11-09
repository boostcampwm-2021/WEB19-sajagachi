import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';
import { locationState } from '../../store/location';
import { useRecoilValue } from 'recoil';
import MapDrawer from './component/MapDrawer';
import SearchInput from './component/SearchInput';
import { Chip } from '@mui/material';
import {
	boolToNum,
	createQueryString,
	decomposeQueryString,
	finishedToBool
} from '../../util/util';
import { LocationType } from '../../type';

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

const CATEGORY_LIST = ['배달음식', '로켓배송', '대용량', '정기권'];
const FINISHED_LIST = ['공구중', '공구완료'];

function SearchModal({
	setIsSearchModalOn,
	history
}: {
	setIsSearchModalOn: any;
	history: any;
}) {
	const [checkedCategories, setCheckedCategories] = useState(
		new Array(CATEGORY_LIST.length).fill(false)
	);

	const [checkedFinished, setCheckedFinished] = useState([false, false]);
	const currentLocation = useRecoilValue(locationState);
	const [location, setLocation] = useState<LocationType>(currentLocation);
	const [address, setAddress] = useState('위치 확인 중');
	const [search, setSearch] = useState('');

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
			limit: 15,
			category: boolToNum(checkedCategories),
			finished: finishedToBool(checkedFinished),
			lat: location.lat,
			long: location.lng,
			search: search ? search : undefined
		};
		const queryStr = createQueryString(query);
		history.push('/?' + queryStr);
	};
	useEffect(() => {
		setLocation(currentLocation);
	}, [currentLocation]);
	useEffect(() => {
		if (JSON.stringify(location) !== JSON.stringify({ lat: 0, lng: 0 }))
			searchCoordinateToAddress(location);
	}, [location]);
	useEffect(() => {
		const query = decomposeQueryString(window.location.search);
		setLocation({ lat: query.lat, lng: query.long });
		setCheckedCategories(checkedCategories => {
			query.category?.forEach(val => {
				checkedCategories[val - 1] = true;
			});
			return checkedCategories;
		});
		if (query.search) setSearch(query.search);
		setCheckedFinished(checkedFinished => {
			if (query.finished === true) checkedFinished[1] = true;
			else if (query.finished === false) checkedFinished[0] = true;
			return checkedFinished;
		});
	}, []);
	return (
		<div>
			<div css={searchModal}>
				<SearchInput value={search} setSearch={setSearch} />
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
					<MapDrawer setLocation={setLocation} location={location} />
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
