import { QueryStringType } from '../type';

export const finishedToBool = (finished: boolean[]) => {
  return finished[0] === finished[1] ? undefined : finished[1];
};

export const boolToNum = (categories: boolean[]) => {
  const result: number[] = [];
  categories.forEach((category, idx) => {
    if (category) result.push(idx + 1);
  });
  return result;
};

export const createQueryString = (query: QueryStringType) => {
  let queryStrings: string[] = [];
  Object.entries(query).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length !== 0) queryStrings.push(`${key}=${val.join(',')}`);
    } else {
      if (val !== undefined) queryStrings.push(`${key}=${val}`);
    }
  });
  return queryStrings.join('&');
};

export const fetchGet = async (url: string | undefined, query: string = '') => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache'
    },
    credentials: 'include'
  };

  const res = await fetch(`${url}?${query}`, options);
  return await res.json();
};

export const fetchPost = async (url: string, body: any) => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  };

  const res = await fetch(`${url}`, options);
  return await res.json();
};

export const dateFormat = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + '년 ' + month + '월 ' + day + '일';
};

export const decomposeQueryString = (queryStr: string) => {
  const result: QueryStringType = {};
  const params = new URLSearchParams(queryStr);
  result.category = params
    .get('category')
    ?.split(',')
    .map(x => Number(x));

  result.finished = params.get('finished') ? params.get('finished') === 'true' : undefined;
  if (Number(params.get('lat'))) result.lat = Number(params.get('lat'));
  if (Number(params.get('long'))) result.long = Number(params.get('long'));
  result.search = params.get('search') ? params.get('search') + '' : undefined;
  return result;
};

export const getCurrentTime = () => {
  const current = new Date();
  let currentHour = current.getHours();
  const currentMinutes = current.getMinutes();
  const strAmPm = currentHour < 12 ? '오전 ' : '오후 ';
  currentHour = currentHour < 12 ? currentHour : currentHour - 12;
  if (currentHour === 0) currentHour = 12;
  return strAmPm + currentHour + '시 ' + currentMinutes + '분';
};

export const getAddressByGeocode = (lat: number, lng: number) => {
  return new Promise((resolve: (value: string) => void, reject) => {
    if (!naver.maps.Service) reject('map service error');
    const location = new naver.maps.LatLng(lat, lng);
    naver.maps.Service.reverseGeocode({ location }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) reject('map service error');
      resolve(response.result.items[0].address);
    });
  });
};

export const parsePath = (pathName: string): string[] => {
  return pathName.split('/').filter(path => path !== '');
};

export const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371e3;
  const RAD = Math.PI / 180;

  const deltaLat = Math.abs(lat1 - lat2) * RAD;
  const deltaLng = Math.abs(lng1 - lng2) * RAD;

  const sinDeltaLat = Math.sin(deltaLat / 2);
  const sinDeltaLng = Math.sin(deltaLng / 2);
  const sqrt = Math.sqrt(
    sinDeltaLat * sinDeltaLat + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * sinDeltaLng * sinDeltaLng
  );

  const dist = 2 * R * Math.asin(sqrt);
  return dist;
};

export const isImage = (filename: string) => {
  const reg = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
  if (filename.match(reg) === null) return false;
  return true;
};
