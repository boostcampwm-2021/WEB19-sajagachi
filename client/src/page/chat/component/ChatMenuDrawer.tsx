import React, { useState } from 'react';
import { css } from '@emotion/react';
import { SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChatMenu } from './ChatMenu';

const BlurredBackground = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(4px);
`;

export function ChatMenuDrawer() {
	const [isMenuOn, setIsMenuOn] = useState(false);
	const toggleDrawer = () => setIsMenuOn(!isMenuOn);

	return (
		<>
			<MenuIcon
				sx={{
					paddingTop: '20px',
					width: '30px',
					height: '3.4rem',
					marginRight: '10px',
					color: '#FFFFFF'
				}}
				onClick={toggleDrawer}
			/>
			{isMenuOn && <div css={BlurredBackground}></div>}
			<SwipeableDrawer
				anchor="right"
				open={isMenuOn}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
			>
				<ChatMenu onCloseBtnClicked={() => setIsMenuOn(false)} />
			</SwipeableDrawer>
		</>
	);
}
