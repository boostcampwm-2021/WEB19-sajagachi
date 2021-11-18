import React from 'react';
import { css } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

type AlertParamType = {
  on: boolean;
  title: string;
  children: React.ReactNode;
  onClose: Function;
};

export default function Alert(props: AlertParamType) {
  return (
    <Dialog
      open={props.on}
      onClose={() => props.onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
