import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { MonetizationOn } from '@mui/icons-material';
import crown from '../../../asset/crown.svg';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { fetchGet } from '../../../util/util';
import 'dotenv/config';

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
	align-items: center;
	margin: 15px 0;
	position: relative;
`;

const UserHostCrownStyle = css`
	width: 20px;
	position: absolute;
	left: 2px;
	top: -13px;
`;

const UserKickBtnStyle = css`
	font-size: 10px;
	color: #f76a6a;
	background-color: rgba(0, 0, 0, 0);
	border: 0;
`;

const UserAvatarStyle = css`
	width: 25px;
	height: 25px;
	border-radius: 50%;
`;

const UserNameStyle = css`
	margin: 0 7px;
	font-size: 14px;
`;

const UserPointStyle = css`
	display: flex;
	margin-left: auto;
	& > p {
		margin: 0 0 0 3px;
	}
`;

type ParticipantType = {
	point: number;
	user: {
		id: number;
		name: string;
		img: string;
	};
};

export function UserList() {
	const [participants, setParticipants] = useState<ParticipantType[]>([]);
	const updateParticipants = async (postId: number) => {
		const url = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
		const result = await fetchGet(url);
		setParticipants(result);
	};

	useEffect(() => {
		const DUMMYPOSTID = 1000026;
		updateParticipants(DUMMYPOSTID);
	}, []);

	return (
		<div css={UserListStyle}>
			<h1>참여자 ({participants.length}명)</h1>
			<ul>
				{participants.map(user => (
					<UserListItem key={user.user.id} user={user} />
				))}
			</ul>
		</div>
	);
}
function UserListItem({ user }: { user: ParticipantType }) {
	const hostId = 53253189; // REMOVE LATER
	const loginId = 53253189; // REMOVE LATER

	const [isDialogOn, setIsDialogOn] = useState(false);
	const handleDialogOpen = () => setIsDialogOn(true);
	const handleDialogClose = () => setIsDialogOn(false);

	return (
		<li css={UserListItemStyle}>
			{hostId === user.user.id && (
				<img src={crown} css={UserHostCrownStyle} />
			)}
			<img src={user.user.img} css={UserAvatarStyle} />
			<p css={UserNameStyle}>{user.user.name}</p>
			{hostId === loginId && (
				<button css={UserKickBtnStyle} onClick={handleDialogOpen}>
					내보내기
				</button>
			)}
			{user.point && (
				<div css={UserPointStyle}>
					<MonetizationOn />
					<p>{user.point}</p>
				</div>
			)}
			<Dialog
				open={isDialogOn}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle>사용자 내보내기</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						정말 사용자를 채팅방에서 내보내시겠습니까?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>취소</Button>
					<Button onClick={handleDialogClose} autoFocus>
						내보내기
					</Button>
				</DialogActions>
			</Dialog>
		</li>
	);
}
