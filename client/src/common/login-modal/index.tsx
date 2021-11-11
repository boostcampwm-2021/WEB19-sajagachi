import React from 'react';
import { css } from '@emotion/react';
import githubButton from '../../asset/github-button.png';
import githubIcon from '../../asset/github.svg';
import IconButton from '@mui/material/IconButton';

const modalBackground = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(4px);
`;

const modal = css`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	height: 300px;
	border: 0px solid;
	border-radius: 2000px;
	background-color: white;
`;

const loginText = css`
	color: #ce9393;
	font-family: 'Gugi', cursive;
	margin-bottom: 30px;
`;

const loginButton = css`
	width: 40%;
	height: 40%;
`;

const githubImage = css`
	width: 90%;
	height: 90%;
`;

function LoginModal({
	setIsLoginModalOn
}: {
	setIsLoginModalOn: (isLoginModalOn: boolean) => void;
}) {
	function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target === e.currentTarget) setIsLoginModalOn(false);
	}

	return (
		<div
			css={modalBackground}
			onClick={handleOutsideClick}
			className="modal_background"
		>
			<div css={modal}>
				<h1 css={loginText}>로그인</h1>
				<IconButton css={loginButton}>
					<img src={githubIcon} alt="로그인" css={githubImage}></img>
				</IconButton>
			</div>
		</div>
	);
}

export default LoginModal;
