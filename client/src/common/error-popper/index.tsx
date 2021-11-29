import React from 'react';
import { Alert, Grow } from '@mui/material';

type ErrorPopperType = {
  alert: boolean;
  errorMsg: string;
};

function ErrorPopper({ alert, errorMsg }: ErrorPopperType) {
  return (
    <Grow in={alert} style={ErrorPopperStyle}>
      <Alert severity="error" style={AlertStyle}>
        {errorMsg}
      </Alert>
    </Grow>
  );
}

const ErrorPopperStyle: React.CSSProperties = {
  transformOrigin: '0 0 0',
  zIndex: 4,
  position: 'fixed',
  left: '0',
  right: '0',
  top: '4.4rem'
};

const AlertStyle: React.CSSProperties = {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '700px'
};

export default ErrorPopper;
