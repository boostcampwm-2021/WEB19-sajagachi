import React from 'react';
import { css } from '@emotion/react';

const PointViewStyle = css`
	margin-top: 30px;
	padding: 0 15px;

	& > h1 {
		font-family: 'Noto Sans KR Medium', sans-serif;
		font-size: 16px;
	}

	& > ul {
		list-style: none;
		padding-left: 0;
	}
`;

export function PointView() {
	return (
		<div css={PointViewStyle}>
			<h1>포인트</h1>
		</div>
	);
}
