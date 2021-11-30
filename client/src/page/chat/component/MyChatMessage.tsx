import React, { useState } from 'react';
import { css } from '@emotion/react';
import { MessageType } from '../../../type';
import { Skeleton } from '@mui/material';

const MessageStyle = css`
  margin: 4px 0px;
  padding: 5px 10px;
  max-width: 60%;
  border-radius: 10px;
  background-color: #f76a6a;
  color: #ffffff;
  font-size: 18px;
  word-wrap: break-word;
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
  const [imageOn, setImageOn] = useState<boolean>(false);
  const handleImageClick = () => {
    if (props.msgData.modalOn) props.msgData.modalOn(props.msgData.img);
  };
  const onLoad = () => setImageOn(true);

  return (
    <div css={DirectionSelector}>
      <span css={MessageTimeStyle}>{props.msgData.time}</span>
      {props.msgData.msg && <p css={MessageStyle}>{props.msgData.msg}</p>}
      {props.msgData.img && props.msgData.modalOn && (
        <>
          {!imageOn && <Skeleton variant="rectangular" width={200} height={200} />}
          <img css={ImageStyle} src={props.msgData.img} alt={'chatImg'} onClick={handleImageClick} onLoad={onLoad} />
        </>
      )}
    </div>
  );
}

export default MyChatMessage;
