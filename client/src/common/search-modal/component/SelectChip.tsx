import React from 'react';
import { css } from '@emotion/react';
import { Chip } from '@mui/material';

interface SelectChipProps {
  selected: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function FilterOption({ selected, children, onClick }: SelectChipProps) {
  return <Chip label={children} css={ChipStyle(selected)} onClick={onClick} />;
}

const ChipStyle = (checked: boolean) => {
  return css`
    width: 80px;
    margin: 3px 3px;
    ${checked ? 'background-color: #ebabab; color: #ffffff;' : ''}
    &:hover {
      background-color: #ebe4e4;
      ${checked ? 'background-color: #ebabab;' : ''}
    }
  `;
};
