import React from 'react';
import { css } from '@emotion/react';
import { MessageType } from '../../../type';

const MessageStyle = css`
  margin: 4px 0px;
  padding: 5px 10px;
  max-width: 60%;
  border-radius: 10px;
  background-color: #e5e5ea;
  font-size: 18px;
`;
const ImageStyle = css`
  margin: 4px 0px;
`;
const DirectionSelector = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const MessageTimeStyle = css`
  color: gray;
  font-size: 10px;
  margin: 0px 10px;
  padding-bottom: 5px;
`;

const SenderStyle = css`
  color: gray;
  font-size: 12px;
  margin: 0px 10px;
`;

function OtherChatMessage(props: { msgData: MessageType }) {
  return (
    <>
      <div css={DirectionSelector}>
        <span css={SenderStyle}>{props.msgData.sender}</span>
      </div>
      <div css={DirectionSelector}>
        {props.msgData.msg && <p css={MessageStyle}>{props.msgData.msg}</p>}
        {props.msgData.img && (
          <img css={ImageStyle} src={props.msgData.img} alt={'chatImg'} />
        )}
        <span css={MessageTimeStyle}>{props.msgData.time}</span>
      </div>
    </>
  );
}

export default OtherChatMessage;
