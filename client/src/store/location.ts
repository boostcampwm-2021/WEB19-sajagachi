import { atom } from 'recoil';
import { LocationType } from '../type';

export const locationState = atom({
	key: 'location',
	default: {} as LocationType
});
