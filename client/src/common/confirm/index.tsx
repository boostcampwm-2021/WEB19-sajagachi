import React from 'react';
import { css } from '@emotion/react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type ConfirmParamType = {
  on: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: Function;
  onConfirm: Function;
};

export default function Confirm(props: ConfirmParamType) {
  return (
    <Dialog
      open={props.on}
      onClose={() => props.onCancel()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onCancel()}>취소</Button>
        <Button onClick={() => props.onConfirm()} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
