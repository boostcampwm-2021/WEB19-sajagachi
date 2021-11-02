import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { NumberLiteralType } from 'typescript';
import GroupIcon from '@mui/icons-material/Group';
import { ItemType } from '../../type/types';
import Item from './component/Item';

const ListStyle = css`
	list-style: none;
	padding-left: 0;
	padding: 0 20px;
	max-width: 800px;
	margin: 0 auto;
`;

export default function PostList() {
	const DUMMYDATA: ItemType[] = [
		{
			post_id: 1,
			category: '배달음식',
			title: '교촌치킨1',
			capacity: 3,
			deadline: '2021-11-1'
		},
		{
			post_id: 2,
			category: '배달음식',
			title: '교촌치킨2',
			capacity: 3,
			deadline: '2021-11-1'
		},
		{
			post_id: 3,
			category: '배달음식',
			title: '교촌치킨3',
			capacity: 3,
			deadline: '2021-11-1'
		},
		{
			post_id: 4,
			category: '배달음식',
			title: '뿌리킁',
			capacity: 3,
			deadline: '2021-11-1'
		},
		{
			post_id: 5,
			category: '배달음식',
			title: '라면',
			capacity: 3,
			deadline: '2021-11-1'
		},
		{
			post_id: 6,
			category: '쿠팡',
			title: '탕수육',
			capacity: 3,
			deadline: '2021-11-1'
		},
		{
			post_id: 7,
			category: '파닭',
			title: '교촌치킨3',
			capacity: 8,
			deadline: '2021-11-1'
		},
		{
			post_id: 7,
			category: '파닭',
			title: '교촌치킨3',
			capacity: 8,
			deadline: '2021-11-1'
		},
		{
			post_id: 7,
			category: '파닭',
			title: '교촌치킨3',
			capacity: 8,
			deadline: '2021-11-1'
		},
		{
			post_id: 7,
			category: '파닭',
			title: '교촌치킨3',
			capacity: 8,
			deadline: '2021-11-1'
		},
		{
			post_id: 7,
			category: '파닭',
			title: '교촌치킨3',
			capacity: 8,
			deadline: '2021-11-1'
		},
		{
			post_id: 7,
			category: '파닭',
			title: '교촌치킨3',
			capacity: 8,
			deadline: '2021-11-1'
		},
		{
			post_id: 7,
			category: '파닭',
			title: '교촌치킨3',
			capacity: 8,
			deadline: '2021-11-1'
		}
	];

	return (
		<ul css={ListStyle}>
			{DUMMYDATA.map(item => (
				<Item item={item} />
			))}
		</ul>
	);
}
