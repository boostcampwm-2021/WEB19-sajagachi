import React from 'react';
import { css } from '@emotion/react';
import { Close } from '@mui/icons-material';
import { UserList } from './UserList';
import { PointView } from './PointView';
import { Button } from '@mui/material';

const ChatMenuStyle = css`
	width: 80vw;
	height: 100vh;
`;
export function ChatMenu() {
	return (
		<div css={ChatMenuStyle}>
			<Close />
			<UserList />
			<PointView />
			<Button>나가기</Button>
		</div>
	);
}
