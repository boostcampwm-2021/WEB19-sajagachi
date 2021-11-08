import React, { useState, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { css } from '@emotion/react';
import SearchModal from '../../search-modal';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { RouteComponentProps } from 'react-router';

const btn = css`
	width: 48px;
	height: 48px;
`;

const btnIcon = css`
	width: 32px;
	height: 32px;
	color: white;
`;

export default function SearchModalDrawer({ history }: RouteComponentProps) {
	const [isSearchModalOn, setIsSearchModalOn] = useState(false);

	const toggleDrawer =
		() => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setIsSearchModalOn(!isSearchModalOn);
		};

	const list = () => (
		<div>
			<Box
				sx={{
					width: 'auto',
					height: 'auto'
				}}
			>
				<SearchModal
					setIsSearchModalOn={setIsSearchModalOn}
					history={history}
				/>
			</Box>
		</div>
	);

	return (
		<>
			<IconButton css={btn} onClick={toggleDrawer()}>
				<SearchIcon css={btnIcon} />
			</IconButton>
			<Drawer
				anchor="top"
				open={isSearchModalOn}
				onClose={toggleDrawer()}
			>
				{list()}
			</Drawer>
		</>
	);
}
