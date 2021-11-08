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

export const fetchGet = async (url: string | undefined, query: string) => {
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

export const fetchPost = async (url: string, body: any, query: any) => {
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

	const res = await fetch(`${url}?${query}`, options);
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
	const result: QueryStringType = {
		lat: 0,
		long: 0
	};
	const params = new URLSearchParams(queryStr);
	result.category = params
		.get('category')
		?.split(',')
		.map(x => Number(x));

	result.finished = params.get('finished')
		? params.get('finished') === 'true'
		: undefined;
	result.lat = Number(params.get('lat'));
	result.long = Number(params.get('long'));
	result.search = params.get('search')
		? params.get('search') + ''
		: undefined;
	return result;
};
