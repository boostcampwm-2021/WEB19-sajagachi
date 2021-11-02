import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';

const mapContainer = css`
	position: absolute;
	width: 12rem;
	height: 12rem;
	background-color: blue;
`;

export default function MapDrawer() {
	const [isMapOn, setIsMapOn] = useState(false);

	const toggleDrawer =
		() => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setIsMapOn(!isMapOn);
		};

	const map = () => (
		<div>
			<Box
				css={mapContainer}
				sx={{
					width: 'auto',
					height: `auto`
				}}
			></Box>
		</div>
	);

	return (
		<div>
			<Button onClick={toggleDrawer()}>지도에서 선택</Button>
			<div>
				<Drawer anchor="bottom" open={isMapOn} onClose={toggleDrawer()}>
					{map()}
				</Drawer>
			</div>
		</div>
	);
}
