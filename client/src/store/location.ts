import { atom } from 'recoil';
import { LocationType } from '../type';

const DEFAULT_LOCATION = {
  lat: 37.5642135,
  lng: 127.0016985,
  isLoaded: false
};

export const locationState = atom({
  key: 'location',
  default: DEFAULT_LOCATION as LocationType
});
