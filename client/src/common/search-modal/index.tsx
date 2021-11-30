import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { locationState } from '../../store/location';
import { useRecoilValue } from 'recoil';
import MapDrawer from './component/MapDrawer';
import SearchInput from './component/SearchInput';
import { boolToNum, createQueryString, decomposeQueryString, finishedToBool, getAddressByGeocode } from '../../util';
import { LocationType } from '../../type';
import service from '../../util/service';
import FilterOption from './component/FilterOption';
import SelectChip from './component/SelectChip';
import ButtonSet from './component/ButtonSet';

const FINISHED_LIST = ['공구중', '공구완료'];

interface SearchModalPropsType {
  setIsSearchModalOn: any;
  history: any;
}

export default function SearchModal({ setIsSearchModalOn, history }: SearchModalPropsType) {
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([] as boolean[]);
  const [checkedFinished, setCheckedFinished] = useState([false, false]);
  const currentLocation = useRecoilValue(locationState);
  const [location, setLocation] = useState<LocationType>(currentLocation);
  const [address, setAddress] = useState('위치 확인 중');
  const [search, setSearch] = useState('');

  const updateAddress = async (latlng: LocationType) => {
    try {
      const result = await getAddressByGeocode(latlng.lat, latlng.lng);
      setAddress(result);
    } catch (err: any) {
      setAddress('주소 정보 없음');
    }
  };

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

  const handleCancel = () => setIsSearchModalOn(false);

  const handleSubmit = () => {
    const query = {
      category: boolToNum(checkedCategories),
      finished: finishedToBool(checkedFinished),
      lat: location.lat,
      long: location.lng,
      search: search ? search : undefined
    };
    const queryStr = createQueryString(query);
    history.push('/?' + queryStr);
    setIsSearchModalOn(false);
  };

  useEffect(() => {
    if (location.lat == 0 && location.lng == 0) return;
    updateAddress(location);
  }, [location]);

  useEffect(() => {
    service.getCategories().then(result => {
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
        else if (query.finished === false) checkedFinished[0] = true;
        return checkedFinished;
      });
    });
  }, []);

  return (
    <div css={searchModal}>
      <SearchInput value={search} setSearch={setSearch} />
      <FilterOption title="카테고리">
        {categories.map((category, i) => (
          <SelectChip
            selected={checkedCategories[i]}
            onClick={() => {
              handleCategoryClick(i);
            }}
          >
            {category}
          </SelectChip>
        ))}
      </FilterOption>
      <FilterOption title="공구 상태">
        {FINISHED_LIST.map((finished, i) => (
          <SelectChip
            selected={checkedFinished[i]}
            onClick={() => {
              handleFinishedClick(i);
            }}
          >
            {finished}
          </SelectChip>
        ))}
      </FilterOption>
      <FilterOption title="위치">
        <div>
          <p>{address}</p>
          <MapDrawer setLocation={setLocation} location={location} />
        </div>
      </FilterOption>
      <ButtonSet onCancel={handleCancel} onSubmit={handleSubmit} />
    </div>
  );
}

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
