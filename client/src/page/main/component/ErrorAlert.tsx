import React from 'react';
import { Alert, Grow } from '@mui/material';

export default function ErrorAlert({ alert }: { alert: boolean }) {
  return (
    <Grow in={alert} style={{ transformOrigin: '0 0 0' }}>
      <Alert severity="error">게시글을 불러오는 중 문제가 발생했어요.</Alert>
    </Grow>
  );
}
