import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import DeadLine from './DeadLine';
import CategoryChip from '../../../common/chip/CategoryChip';
import { css } from '@emotion/react';

interface HeaderType {
  title: string;
  categoryName: string;
  writer: UserType;
  deadline: string | null;
  isNeedServerTime: boolean;
  deadLineRef: React.Ref<unknown> | undefined;
}

export interface UserType {
  name: string;
  img: string;
}

export default function Header({ title, categoryName, writer, deadline, isNeedServerTime, deadLineRef }: HeaderType) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'stretch' }}>
        <Typography variant="h6" css={titleStyle}>
          {title}
        </Typography>
        <CategoryChip label={categoryName} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="body1" sx={{ display: 'flex' }}>
          <Avatar src={writer.img} sx={{ width: 32, height: 32, marginRight: 1 }} />
          {writer.name}
        </Typography>
        <DeadLine ref={deadLineRef} isNeedServerTime={isNeedServerTime} deadline={deadline} />
      </Box>
    </>
  );
}

const titleStyle = css`
  word-break: break-all;
  flex-grow: 1;
  margin: 0;
  margin-right: 10px;
  margin-top: -2px;
`;
