import React from 'react';
import { css } from '@emotion/react';
import { MonetizationOn } from '@mui/icons-material';

const DUMMYUSERS = [
	// REMOVE LATER
	{
		name: 'Linus Torvalds',
		img: 'https://avatars.githubusercontent.com/u/1024025?v=4',
		point: 30000
	},
	{
		name: 'FloralLife',
		img: 'https://avatars.githubusercontent.com/u/53253189?v=4',
		point: 30000
	},
	{
		name: 'J127_우재석',
		img: 'https://avatars.githubusercontent.com/u/67548567?v=4',
		point: null
	},
	{
		name: 'gintooooonic',
		img: 'https://avatars.githubusercontent.com/u/76616101?v=4',
		point: 50000
	},
	{
		name: 'J119_안병웅',
		img: 'https://avatars.githubusercontent.com/u/80206884?v=4',
		point: null
	}
];

const UserListStyle = css`
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

const UserListItemStyle = css`
	display: flex;
	margin: 15px 0;
`;

const UserAvatarStyle = css`
	width: 25px;
	height: 25px;
	margin-right: 5px;
	border-radius: 50%;
`;

const UserNameStyle = css`
	margin: 0;
`;

const UserPointStyle = css`
	display: flex;
	margin-left: auto;
	& > p {
		margin: 0 0 0 3px;
	}
`;

export function UserList() {
	return (
		<div css={UserListStyle}>
			<h1>참여자 ({DUMMYUSERS.length}명)</h1>
			<ul>
				{DUMMYUSERS.map(user => (
					<UserListItem user={user} />
				))}
			</ul>
		</div>
	);
}

function UserListItem(props: { user: any }) {
	return (
		<li css={UserListItemStyle}>
			<img src={props.user.img} css={UserAvatarStyle} />
			<p css={UserNameStyle}>{props.user.name}</p>
			{props.user.point && (
				<div css={UserPointStyle}>
					<MonetizationOn />
					<p>{props.user.point}</p>
				</div>
			)}
		</li>
	);
}
