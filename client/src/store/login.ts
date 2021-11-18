import { atom } from 'recoil';
import { LoginUserType } from '../type';

export const loginUserState = atom<LoginUserType>({
  key: 'loginUser',
  default: { id: 0, name: '', isSigned: false }
});
