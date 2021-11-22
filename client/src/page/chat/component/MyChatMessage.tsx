import React from 'react';
import { css } from '@emotion/react';

type MessageType = {
  sender: string;
  msg: string;
  time: string;
  isMe: number;
};

const MessageStyle = css`
  margin: 4px 0px;
  padding: 5px 10px;
  max-width: 60%;
  border-radius: 10px;
  background-color: #f76a6a;
  color: #ffffff;
  font-size: 18px;
`;

const DirectionSelector = css`
  display: flex;
  justify-content: right;
  align-items: flex-end;
`;

const MessageTimeStyle = css`
  color: gray;
  font-size: 10px;
  margin: 0px 10px;
  padding-bottom: 5px;
`;

function MyChatMessage(props: { msgData: MessageType }) {
  return (
    <div css={DirectionSelector}>
      <span css={MessageTimeStyle}>{props.msgData.time}</span>
      <p css={MessageStyle}>{props.msgData.msg}</p>
    </div>
  );
}

export default MyChatMessage;
