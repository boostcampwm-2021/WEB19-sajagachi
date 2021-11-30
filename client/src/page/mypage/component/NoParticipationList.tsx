import React from 'react';
import { css } from '@emotion/react';
import myPageNoList from '../../../asset/myPageNoList.gif';

type NoParticipationListProps = {
  text: String;
};

export default function NoParticipationList({ text }: NoParticipationListProps) {
  return (
    <div css={NoParticipationListStyle}>
      <img src={myPageNoList} alt={'noItem'} css={ImageStyle} />
      <p>{text}</p>
    </div>
  );
}

const NoParticipationListStyle = css`
  text-align: center;
`;

const ImageStyle = css`
  width: 230px;
`;
