import React from 'react';
import { css } from '@emotion/react';

interface TitleStateType {
  title: React.MutableRefObject<HTMLInputElement | null>;
}

function InputTitle({ title }: TitleStateType) {
  return <input type="text" name="title" css={inputTitle} placeholder="Title" ref={title}></input>;
}

export default React.memo(InputTitle);

const inputTitle = css`
  border: 0px solid;
  box-sizing: border-box;
  box-shadow: none;
  width: 90%;
  height: 40px;
  background: transparent;
  outline: none;
  color: #000000;
  font-size: 16px;
  overflow: hidden;
  margin-left: 10vw;
  margin-right: 10vw;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
`;
