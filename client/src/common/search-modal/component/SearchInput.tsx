import React, { useState, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const btn = css`
	width: 48px;
	height: 48px;
`;

const btnIcon = css`
	width: 32px;
	height: 32px;
	color: white;
`;

const searchForm = css`
	position: relative;
	width: 100%;
	padding: 0;
`;

const InputText = css`
	border: 2px solid #f97d63;
	border-radius: 16px;
	box-sizing: border-box;
	box-shadow: none;
	width: 100%;
	height: 40px;
	background: transparent;
	outline: none;
	color: #000000;
	font-size: 16px;
	overflow: hidden;
	padding: 10px;
`;

function SearchInput() {
	const [searchValue, setSearchValue] = useState('');

	function onChangeHandle(e: ChangeEvent<HTMLInputElement>) {
		setSearchValue(e.target.value);
	}

	return (
		<form css={searchForm} onSubmit={e => e.preventDefault()}>
			<input
				type="text"
				css={InputText}
				onChange={onChangeHandle}
				value={searchValue}
			/>
		</form>
	);
}

export default SearchInput;
