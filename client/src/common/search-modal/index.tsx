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
	fetchGet,
	finishedToBool,
	getAddressByGeocode
} from '../../util';
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

const FINISHED_LIST = ['공구중', '공구완료'];

function SearchModal({
	setIsSearchModalOn,
	history
}: {
	setIsSearchModalOn: any;
	history: any;
}) {
	const [categories, setCategories] = useState([]);
	const [checkedCategories, setCheckedCategories] = useState([] as boolean[]);

	const [checkedFinished, setCheckedFinished] = useState([false, false]);
	const currentLocation = useRecoilValue(locationState);
	const [location, setLocation] = useState<LocationType>(currentLocation);
	const [address, setAddress] = useState('위치 확인 중');
	const [search, setSearch] = useState('');

	async function searchCoordinateToAddress(latlng: any) {
		const result = await getAddressByGeocode(latlng.lat, latlng.lng);
		setAddress(result);
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
		fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/category`).then(
			result => {
				setCategories(result.map((x: any) => x.name));

				const query = decomposeQueryString(window.location.search);
				setCheckedCategories(checkedCategories => {
					const arr = new Array(result.length).fill(false);
					query.category?.forEach(val => {
						arr[val - 1] = true;
					});
					return arr;
				});
				if (query.lat && query.long) {
					setLocation({ lat: query.lat, lng: query.long });
				}
				if (query.search) setSearch(query.search);
				setCheckedFinished(checkedFinished => {
					if (query.finished === true) checkedFinished[1] = true;
					else if (query.finished === false)
						checkedFinished[0] = true;
					return checkedFinished;
				});
			}
		);
	}, []);

	return (
		<div>
			<div css={searchModal}>
				<SearchInput value={search} setSearch={setSearch} />
				<div css={CategoryStyle}>
					<h3>카테고리</h3>
					<div>
						{categories.map((category, i) => (
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
						style={{
							backgroundColor: '#D9D5D5',
							marginRight: '15px'
						}}
						onClick={e => {
							setIsSearchModalOn(false);
						}}
					>
						취소
					</Button>
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
