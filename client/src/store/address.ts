import { atom } from 'recoil';

export const addressState = atom({
	key: 'address',
	default: '위치 확인 중'
});
