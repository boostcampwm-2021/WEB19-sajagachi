import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { MonetizationOn } from '@mui/icons-material';
import crown from '../../../asset/crown.svg';
import { fetchGet, parsePath } from '../../../util/util';
import Confirm from '../../../common/confirm';

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

export function UserList({ hostId }: { hostId: number }) {
	const [myId, setMyId] = useState<number>(-1); // 페이지 컴포넌트에서 가져오도록 변경
	const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);

	const updateMyId = async () => {
		const url = `${process.env.REACT_APP_SERVER_URL}/api/login`;
		const result = await fetchGet(url);
		if (!isNaN(+result)) setMyId(+result); // note: result can be "jwt expired" or other string value
	};

	const [participants, setParticipants] = useState<ParticipantType[]>([]);
	const updateParticipants = async (postId: number) => {
		const url = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
		const result = await fetchGet(url);
		setParticipants(result);
	};

	useEffect(() => {
		updateParticipants(postId);
		updateMyId();
	}, []);

	return (
		<div css={UserListStyle}>
			<h1>참여자 ({participants.length}명)</h1>
			<ul>
				{participants.map(user => (
					<UserListItem
						key={user.user.id}
						item={user}
						myId={myId}
						hostId={hostId}
					/>
				))}
			</ul>
		</div>
	);
}
function UserListItem({
	item,
	myId,
	hostId
}: {
	item: ParticipantType;
	myId: number;
	hostId: number;
}) {
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	return (
		<li css={UserListItemStyle}>
			{hostId === item.user.id && (
				<img src={crown} css={UserHostCrownStyle} />
			)}
			<img src={item.user.img} css={UserAvatarStyle} />
			<p css={UserNameStyle}>{item.user.name}</p>
			{hostId === myId && (
				<button
					css={UserKickBtnStyle}
					onClick={() => setIsConfirmOn(true)}
				>
					내보내기
				</button>
			)}
			{item.point && (
				<div css={UserPointStyle}>
					<MonetizationOn />
					<p>{item.point}</p>
				</div>
			)}
			<Confirm
				on={isConfirmOn}
				title="사용자 내보내기"
				onCancel={() => setIsConfirmOn(false)}
				onConfirm={() => setIsConfirmOn(false)}
			>
				정말 사용자를 채팅에서 내보내시겠습니까?
			</Confirm>
		</li>
	);
}
