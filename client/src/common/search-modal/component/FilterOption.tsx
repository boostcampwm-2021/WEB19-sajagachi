import React from 'react';
import { css } from '@emotion/react';

interface FilterOptionProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterOption({ title, children }: FilterOptionProps) {
  return (
    <div css={FilterOptionStyle}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

const FilterOptionStyle = css`
  & > h3 {
    margin-bottom: 5px;
  }
  & > div {
    display: flex;
    flex-wrap: wrap;
  }
`;
