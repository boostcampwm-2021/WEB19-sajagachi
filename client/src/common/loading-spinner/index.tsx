import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        sx={{ marginLeft: 'auto', marginRight: 'auto', color: '#f76a6a' }}
      />
    </Box>
  );
}
