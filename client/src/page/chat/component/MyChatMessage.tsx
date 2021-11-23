import React from 'react';
import { css } from '@emotion/react';
import { MessageType } from '../../../type';

const MessageStyle = css`
  margin: 4px 0px;
  padding: 5px 10px;
  max-width: 60%;
  border-radius: 10px;
  background-color: #f76a6a;
  color: #ffffff;
  font-size: 18px;
`;
const ImageStyle = css`
  margin: 4px 0px;
  max-width: 200px;
  max-height: 200px;
`;

const DirectionSelector = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MessageTimeStyle = css`
  color: gray;
  font-size: 10px;
  margin: 0px 10px;
  padding-bottom: 5px;
`;

function MyChatMessage(props: { msgData: MessageType }) {
  const handleImageClick = () => {
    if (props.msgData.modalOn) props.msgData.modalOn(props.msgData.img);
  };
  return (
    <div css={DirectionSelector}>
      <span css={MessageTimeStyle}>{props.msgData.time}</span>
      {props.msgData.msg && <p css={MessageStyle}>{props.msgData.msg}</p>}
      {props.msgData.img && props.msgData.modalOn && (
        <img
          css={ImageStyle}
          src={props.msgData.img}
          alt={'chatImg'}
          onClick={handleImageClick}
        />
      )}
    </div>
  );
}

export default MyChatMessage;
