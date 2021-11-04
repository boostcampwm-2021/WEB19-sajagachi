import { useState, useEffect, useCallback } from 'react';
import { fetchGet } from './util';
import { ItemType } from '../type/types';

function useFetch(offset: number) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [list, setList] = useState<ItemType[]>([]);

	const sendQuery = useCallback(async () => {
		try {
			await setLoading(true);
			await setError(false);
			const res = await fetchGet(
				`${process.env.REACT_APP_SERVER_URL}/api/post`,
				{ offset, limit: 10 }
			);
			await setList(prev => [...prev, ...res]);
			setLoading(false);
		} catch (err: any) {
			setError(err);
		}
	}, [offset]);

	useEffect(() => {
		sendQuery();
	}, [sendQuery, offset]);

	return { loading, error, list };
}

export default useFetch;
