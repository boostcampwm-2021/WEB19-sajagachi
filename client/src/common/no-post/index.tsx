import React from 'react';
import { css } from '@emotion/react';
import noItemImg from '../../asset/noItem.gif';

type NoPostProps = {
  text: String;
};

export default function NoPost({ text }: NoPostProps) {
  return (
    <div css={NoPostStyle}>
      <img src={noItemImg} alt={'noItem'} css={ImageStyle} />
      <p>{text}</p>
    </div>
  );
}

const NoPostStyle = css`
  text-align: center;
`;

const ImageStyle = css`
  width: 230px;
`;
