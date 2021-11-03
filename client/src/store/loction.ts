import { atom } from 'recoil';

export interface LoctionTypes {
	lat: number;
	lng: number;
}

export const locationState = atom({
	key: 'location',
	default: {} as LoctionTypes
});
