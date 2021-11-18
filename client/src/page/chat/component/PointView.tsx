import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Socket } from 'socket.io-client';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../../store/login';
import { fetchGet, parsePath } from '../../../util';

const PointViewStyle = css`
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	width: 95%;
	bottom: 120px;
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

const PointContainer = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const PointInputStyle = css`
	border: 0px solid;
	border-bottom: 2px solid #f97d63;
	box-sizing: border-box;
	box-shadow: none;
	width: 70%;
	height: 40px;
	background: transparent;
	outline: none;
	color: #000000;
	font-size: 16px;
	overflow: hidden;
	padding: 10px;
	&:-webkit-outer-spin-button,
	&:-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const PointBtnStyle = (purchase: boolean, disabled: boolean) => css`
	width: 15%;
	background-color: ${purchase
		? `#b6e3e9${disabled ? '99' : ''}`
		: `#fdafab${disabled ? '99' : ''}`};
	color: white;
	&:hover {
		background-color: ${purchase ? '#b6e3e9' : '#fdafab'};
	}
`;

const leftPointStyle = css`
	font-size: 9px;
	color: #cccccc;
`;

type PointState = {
	socket: Socket;
};

function PointView(props: PointState) {
	const socket = props.socket;
	const [myPoint, setMyPoint] = useState<string>('');
	const [disabled, setDisabled] = useState<boolean>(true);
	const [purchase, setPurchase] = useState<boolean>(false);
	const [leftPoint, setLeftPoint] = useState<number>();
	const loginUser = useRecoilValue(loginUserState);
	const postId = Number(parsePath(window.location.pathname).slice(-1)[0]);

	useEffect(() => {
		fetchGet(
			`${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant/${loginUser.id}`
		).then(data => {
			setLeftPoint(data.leftPoint);
			setDisabled(false);
			if (data.purchasePoint) {
				setMyPoint(data.purchasePoint);
				setPurchase(true);
			}
		});
	}, [purchase]);

	useEffect(() => {
		socket.on('purchase error', msg => {
			setDisabled(false);
			console.log(msg);
		});

		socket.on('purchase confirm', (userId: number, sendPoint: number) => {
			if (userId === loginUser.id) {
				setPurchase(true);
				setDisabled(false);
			}
		});

		socket.on('purchase cancel', (userId: number) => {
			if (userId === loginUser.id) {
				setPurchase(false);
				setDisabled(false);
			}
		});

		return () => {
			socket.off('purchase error');
			socket.off('purchase confirm');
			socket.off('purchase cancel');
		};
	}, []);

	const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = Number(e.target.value);
		if (isNaN(input) || input < 0 || input % 1 !== 0) return;
		setMyPoint(e.target.value);
		if (Number(myPoint) > 0) setDisabled(false);
		else setDisabled(true);
	};

	const handlePointBtnClick = () => {
		setDisabled(true);
		if (!purchase)
			socket.emit('point confirm', postId, loginUser.id, Number(myPoint));
		else socket.emit('point cancel', postId, loginUser.id);
	};

	return (
		<div css={PointViewStyle}>
			<h1>포인트</h1>
			<div css={PointContainer}>
				<input
					type="number"
					css={PointInputStyle}
					value={myPoint}
					onChange={handlePointChange}
					disabled={purchase}
				/>
				<Button
					css={PointBtnStyle(purchase, disabled)}
					onClick={handlePointBtnClick}
					disabled={disabled}
				>
					{purchase ? '취소' : '확정'}
				</Button>
			</div>
			<span css={leftPointStyle}>잔여 포인트 : {leftPoint}</span>
		</div>
	);
}

export default React.memo(PointView);
