const queryExtract = (query: any) => {
	let queryStrings: string[] = [];
	Object.entries(query).forEach(([key, val]) => {
		queryStrings.push(`${key}=${val}`);
	});
	return queryStrings.join('&');
};

export const fetchGet = async (url: string | undefined, query: any) => {
	const options: RequestInit = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Cache: 'no-cache'
		},
		credentials: 'include'
	};

	const res = await fetch(`${url}?${queryExtract(query)}`, options);
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

	let queryStr = '';
	if (query) queryStr = '?' + queryExtract(query);

	const res = await fetch(`${url}${queryStr}`, options);
	return await res.json();
};

export const dateFormat = (dateStr: string) => {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return year + '년 ' + month + '월 ' + day + '일';
};