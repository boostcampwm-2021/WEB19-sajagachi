import React from 'react';
import { css } from '@emotion/react';

type ImageModalType = {
  imageUrl: string;
  setImageModalOn: Function;
};

function ImageModal({ imageUrl, setImageModalOn }: ImageModalType) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setImageModalOn('');
  };
  return (
    <div css={ImageModalContainer} onClick={handleOutsideClick}>
      <img css={ImageStyle} src={imageUrl} alt="modal_image" />
    </div>
  );
}

export default ImageModal;

const ImageModalContainer = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100vw;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 4;
`;
const ImageStyle = css`
  max-width: 90vw;
  max-height: 80vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
