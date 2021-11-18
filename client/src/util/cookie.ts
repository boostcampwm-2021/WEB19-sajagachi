import { Cookies } from 'react-cookie';

export const getCookie = (name: string) => {
  const cookies = new Cookies();
  return cookies.get(name);
};
