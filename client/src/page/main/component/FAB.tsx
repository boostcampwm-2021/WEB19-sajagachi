import React from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const FabStyle = css`
	position: fixed;
	right: 30px;
	bottom: 30px;
`;

export default function FAB() {
	return (
		<Link to="/post">
			<Fab
				css={FabStyle}
				sx={{ backgroundColor: '#ebabab' }}
				aria-label="edit"
			>
				<EditIcon sx={{ color: '#ffffff' }} />
			</Fab>
		</Link>
	);
}
