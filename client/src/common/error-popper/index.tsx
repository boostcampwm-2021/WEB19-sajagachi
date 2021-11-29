import React from 'react';
import { Alert, Grow } from '@mui/material';

type ErrorPopperType = {
  alert: boolean;
  errorMsg: string;
};

function ErrorPopper({ alert, errorMsg }: ErrorPopperType) {
  return (
    <Grow in={alert} style={{ transformOrigin: '0 0 0', zIndex: 4 }}>
      <Alert severity="error">{errorMsg}</Alert>
    </Grow>
  );
}

export default ErrorPopper;
