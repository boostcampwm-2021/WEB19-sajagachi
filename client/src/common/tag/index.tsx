import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { TagType } from '../../type/types';

const TagStyle = (color: string) => css`
	border-radius: 20px;
	color: #ffffff;
	font-weight: bold;
	font-size: 11px;
	padding: 3px 10px;
	background-color: ${color};
`;

export default function Tag({ content, color }: TagType) {
	return <span css={TagStyle(color)}>{content}</span>;
}
