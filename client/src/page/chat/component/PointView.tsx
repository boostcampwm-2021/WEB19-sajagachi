import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Socket } from 'socket.io-client';
import Button from '@mui/material/Button';

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

const PointBtnStyle = (purchase: boolean) => css`
	width: 15%;
	background-color: ${purchase ? '#b6e3e9' : '#fdafab'};
	color: white;
	&:hover {
		background-color: ${purchase ? '#b6e3e9' : '#fdafab'};
	}
`;

type PointState = {
	socket: Socket;
	point: number | null;
};

export function PointView(props: PointState) {
	const socket = props.socket;
	const [myPoint, setMyPoint] = useState<string>('');
	const [purchase, setPurchase] = useState<boolean>(false);

	useEffect(() => {
		if (props.point !== null) {
			setMyPoint(String(props.point));
			setPurchase(true);
		}
	}, []);

	const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMyPoint(e.target.value);
	};

	const handlePointBtnClick = () => {
		if (purchase) socket.emit('purchase confirm', { point: myPoint });
		else socket.emit('purchase cancel');
		setPurchase(!purchase);
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
					css={PointBtnStyle(purchase)}
					onClick={handlePointBtnClick}
				>
					{purchase ? '취소' : '확정'}
				</Button>
			</div>
		</div>
	);
}
