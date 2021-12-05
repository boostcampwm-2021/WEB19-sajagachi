import React from 'react';
import { css } from '@emotion/react';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface deadlineState {
  deadline: Date | null;
  setDeadline: (deadline: Date | null) => void;
}

function DateDeadline({ deadline, setDeadline }: deadlineState) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="마감날짜"
        value={deadline}
        onChange={newValue => {
          setDeadline(newValue);
        }}
        renderInput={params => <TextField {...params} />}
        cancelText="취소"
        okText="확인"
        css={datepicker}
      />
    </LocalizationProvider>
  );
}

export default React.memo(DateDeadline);

const datepicker = css`
  width: 100px;
`;
