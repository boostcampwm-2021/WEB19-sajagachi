import React from 'react';
import { css } from '@emotion/react';

type MessageType = {
  sender: string;
  msg: string;
  time: string;
  isMe: number;
};

export default function SystemMessage(props: { msgData: MessageType }) {
  return (
    <>
      <div css={DirectionSelector}>
        <p css={MessageStyle}>{props.msgData.msg}</p>
      </div>
    </>
  );
}

const MessageStyle = css`
  margin: 10px 0px;
  padding: 5px 10px;
  max-width: 60%;
  border-radius: 10px;
  background-color: #ffe7e7;
  font-size: 12px;
`;

const DirectionSelector = css`
  display: flex;
  justify-content: center;
`;
