import React from 'react';
import { Typography, Chip, Box, Avatar } from '@mui/material';
import DeadLine from './DeadLine';

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">{title}</Typography>
        <Chip label={categoryName} sx={{ color: 'grey' }} />
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
