import React from 'react';
import { css } from '@emotion/react';
import { Button } from '@mui/material';

interface ButtonSetProps {
  onCancel?: () => void;
  onSubmit?: () => void;
}

export default function ButtonSet(props: ButtonSetProps) {
  return (
    <div css={ButtonSetStyle}>
      <Button variant="contained" css={ButtonStyle('#D9D5D5')} onClick={props.onCancel}>
        취소
      </Button>
      <Button variant="contained" css={ButtonStyle('#ebabab')} onClick={props.onSubmit}>
        완료
      </Button>
    </div>
  );
}

const ButtonSetStyle = css`
  text-align: right;
`;

const ButtonStyle = (bgColor: string) => css`
  background-color: ${bgColor};
  &:hover {
    background-color: ${bgColor};
  }
  margin-left: 15px;
`;
