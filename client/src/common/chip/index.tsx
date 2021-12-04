import React, { JSXElementConstructor, ReactElement } from 'react';
import { Chip } from '@mui/material';

interface SmallChipType {
  label?: string;
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
  backgroundColor?: string;
}

export default function SmallChip({ label, icon, backgroundColor = '#fff' }: SmallChipType) {
  return <Chip icon={icon} label={label} sx={ChipStyle(backgroundColor)} size="small" />;
}

const ChipStyle = (backgroundColor: string) => ({
  backgroundColor,
  marginBottom: '5px',
  fontSize: '11px',
  padding: '0px',
  minWidth: '65px',
  height: '28px'
});
