import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { NumberLiteralType } from 'typescript';
import GroupIcon from '@mui/icons-material/Group';
import { ItemType } from '../../type/types';
import Item from './component/Item';
import noItemImg from '../../asset/noitem.png';

const ListStyle = css`
	list-style: none;
	padding-left: 0;
	padding: 0 20px;
	max-width: 800px;
	margin: 0 auto;
`;

const ImageStyle = css`
	width: 100%;
`;

export default function PostList(props: any) {
	if (props.items.length === 0) {
		return (
			<ul css={ListStyle}>
				<img src={noItemImg} css={ImageStyle} />
			</ul>
		);
	}

	return (
		<ul css={ListStyle}>
			{props.items.map((item: any) => (
				<Item key={item.id} item={item} />
			))}
		</ul>
	);
}
