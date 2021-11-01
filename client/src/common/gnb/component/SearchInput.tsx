import React from 'react';
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const btn = css`
	width: 48px;
	height: 48px;
`;

const btnIcon = css`
	width: 32px;
	height: 32px;
	color: white;
`;

const inputText = css`
	color: white;
`;

function SearchInput() {
	return (
		<form>
			<TextField
				id="outlined-basic"
				label="search"
				variant="outlined"
				css={inputText}
			/>
			<IconButton css={btn}>
				<SearchIcon css={btnIcon} />
			</IconButton>
		</form>
	);
}

export default SearchInput;
