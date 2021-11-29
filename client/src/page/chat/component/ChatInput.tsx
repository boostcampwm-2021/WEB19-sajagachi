import React, { useRef, useState } from 'react';
import { css } from '@emotion/react';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UserInfoType } from '../../../type';
import { ERROR } from '../../../util/error-message';
import IconButton from '@mui/material/IconButton';
import { isImage } from '../../../util';

type ChatInputType = {
  socket: any;
  postId: number;
  user: UserInfoType;
  popError: Function;
};

function ChatInput(props: ChatInputType) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadFile = async (event: any) => {
    const img = event.target.files[0];
    if (!isImage(img.name)) {
      props.popError(ERROR.FILE_TYPE);
      return;
    }
    if (img.size > 2 * 1024 * 1024) {
      props.popError(ERROR.FILE_SIZE);
      return;
    }
    const formData = new FormData();
    formData.append('file', img);
    const options = {
      method: 'POST',
      credentials: 'include' as RequestCredentials,
      body: formData
    };
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/upload/${props.postId}`, options);
    console.log(await res.json());
  };
  const checkEnter = (event: KeyboardEvent) => {
    return event.code === 'Enter' || event.code === 'NumpadEnter';
  };
  const isValidEvent = (event: any) => {
    if (event.type === 'click') return true;
    else if (event.type === 'keypress' && checkEnter(event)) return true;
    else return false;
  };
  const sendMessage = () => {
    if (inputRef.current !== null && inputRef.current.value !== '') {
      props.socket.emit('sendMsg', props.postId, inputRef.current.value);
      inputRef.current.value = '';
    }
  };
  const sendInput = (event: any) => {
    if (isValidEvent(event)) sendMessage();
  };

  const imgUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div css={ChatInputDiv}>
      <input accept="file" type="file" onChange={uploadFile} style={{ display: 'none' }} ref={fileInputRef} />
      <IconButton aria-label="image add" sx={{ width: '40px', height: '40px' }} onClick={imgUpload}>
        <AddCircleIcon
          sx={{
            width: '30px',
            height: '30px',
            color: '#ebabab'
          }}
        />
      </IconButton>
      <input
        css={ChatInputStyle}
        type="text"
        placeholder="메시지를 입력해주세요"
        onKeyPress={sendInput}
        ref={inputRef}
      />
      <IconButton
        aria-label="send message"
        sx={{
          width: '40px',
          height: '40px',
          color: '#ebabab',
          marginRight: '5px'
        }}
        onClick={sendInput}
      >
        <SendIcon
          sx={{
            width: '30px',
            height: '30px',
            color: '#ebabab'
          }}
        />
      </IconButton>
    </div>
  );
}
const ChatInputStyle = css`
  margin: 5px 5px 0px 5px;
  width: 80%;
  height: 30px;
  border: none;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;
const ChatInputDiv = css`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ebabab;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  bottom: 20px;
  left: 0;
  right: 0;
`;

export default ChatInput;
