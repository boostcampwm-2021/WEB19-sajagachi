import React, { useRef } from 'react';
import { Typography, Chip, Box, Avatar } from '@mui/material';
import DeadLine, { DeadLineHandle } from './DeadLine';

interface HeaderType {
  title: string;
  categoryName: string;
  writer: UserType;
  deadline: string | null;
  isNeedServerTime: boolean;
}

interface UserType {
  name: string;
  img: string;
}

export default function Header({ title, categoryName, writer, deadline, isNeedServerTime }: HeaderType) {
  const deadLineRef = useRef<DeadLineHandle>();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Chip label={categoryName} sx={{ color: 'grey' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: 'flex'
          }}
        >
          <Avatar src={writer.img} sx={{ width: 32, height: 32, marginRight: 1 }} />
          {writer.name}
        </Typography>
        <DeadLine ref={deadLineRef} isNeedServerTime={isNeedServerTime} deadline={deadline} />
      </Box>
    </>
  );
}
