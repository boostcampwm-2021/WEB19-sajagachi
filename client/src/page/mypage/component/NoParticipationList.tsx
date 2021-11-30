import React from 'react';
import { css } from '@emotion/react';
import myPageNoList from '../../../asset/myPageNoList.gif';

type NoParticipationListProps = {
  text: String;
};

export default function NoParticipationList({ text }: NoParticipationListProps) {
  return (
    <div>
      <img src={myPageNoList} alt={'noItem'} css={ImageStyle} />
      <p style={{ textAlign: 'center' }}>{text}</p>
    </div>
  );
}

const ImageStyle = css`
  width: 100%;
`;
