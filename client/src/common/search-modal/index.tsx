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
import ButtonSet from './component/ButtonSet';
import Select from './component/Select';
import useError from '../../hook/useError';

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
  const [popError, RenderError] = useError();

  const updateAddress = async (latlng: LocationType) => {
    try {
      const result = await getAddressByGeocode(latlng.lat, latlng.lng);
      setAddress(result);
    } catch (err: any) {
      setAddress('주소 정보 없음');
    }
  };

  const updateCategories = async () => {
    try {
      const result = await service.getCategories();
      setCategories(result.map((x: any) => x.name));
    } catch (err: any) {
      popError(err.message);
    }
  };

  const loadQueryString = () => {
    const q = decomposeQueryString(window.location.search);
    setCheckedCategories(checkedCategories => {
      q.category?.forEach(v => (checkedCategories[v - 1] = true));
      return checkedCategories;
    });
    setCheckedFinished(checkedFinished => {
      if (q.finished === true) checkedFinished[1] = true;
      else if (q.finished === false) checkedFinished[0] = true;
      return checkedFinished;
    });
    if (q.lat && q.long) setLocation({ lat: q.lat, lng: q.long });
    if (q.search) setSearch(q.search);
  };

  const buildQueryString = () => {
    const query = {
      category: boolToNum(checkedCategories),
      finished: finishedToBool(checkedFinished),
      lat: location.lat,
      long: location.lng,
      search: search ? search : undefined
    };
    const queryStr = createQueryString(query);
    return '/?' + queryStr;
  };

  const handleCancel = () => setIsSearchModalOn(false);
  const handleSubmit = () => {
    history.push(buildQueryString());
    setIsSearchModalOn(false);
  };

  useEffect(() => {
    updateCategories().then(loadQueryString);
  }, []);

  useEffect(() => {
    if (location.lat === 0 && location.lng === 0) return;
    updateAddress(location);
  }, [location]);

  return (
    <div css={searchModal}>
      <RenderError />
      <SearchInput value={search} setSearch={setSearch} />
      <FilterOption title="카테고리">
        <Select options={categories} selected={checkedCategories} setSelected={setCheckedCategories} />
      </FilterOption>
      <FilterOption title="공구 상태">
        <Select options={FINISHED_LIST} selected={checkedFinished} setSelected={setCheckedFinished} />
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

const FINISHED_LIST = ['공구중', '공구완료'];
