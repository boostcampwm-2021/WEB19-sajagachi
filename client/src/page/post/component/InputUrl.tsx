import React from 'react';
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const urlContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px auto 5px auto;
  width: 90%;
  border: 2px solid #f97c634b;
  border-radius: 16px;
`;

const inputUrl = css`
  border: 0px solid;
  box-shadow: none;
  width: calc(100% - 26px);
  height: 40px;
  background: transparent;
  outline: none;
  color: #000000;
  font-size: 16px;
  overflow: hidden;
  padding: 10px;
  margin: 0px;
  font-family: -apple-system;
`;

const deleteButton = css`
  width: 26px;
  height: 26px;
`;

interface UrlState {
  idx: number;
  urls: string[];
  setUrls: (urls: string[]) => void;
}

function InputUrl({ idx, urls, setUrls }: UrlState) {
  function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
    const updateUrls = [...urls];
    updateUrls.splice(idx, 1);
    setUrls(updateUrls);
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updateUrls = [...urls];
    updateUrls[idx] = e.target.value;
    setUrls(updateUrls);
  }

  return (
    <div css={urlContainer} key={idx}>
      <input type="url" name="url" css={inputUrl} placeholder="url" onChange={handleUrlChange} value={urls[idx]} />
      {idx > 0 && (
        <IconButton css={deleteButton} onClick={handleDeleteClick}>
          <ClearIcon color="error" />
        </IconButton>
      )}
    </div>
  );
}

export default React.memo(InputUrl);
