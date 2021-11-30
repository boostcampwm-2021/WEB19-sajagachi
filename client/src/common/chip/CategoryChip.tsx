import React from 'react';
import SmallChip from './index';

export default function CategoryChip({ label }: { label: string }) {
  return <SmallChip label={label} backgroundColor={categoryColor[label]} />;
}

const categoryColor: any = {
  배달음식: '#ffe8fc',
  로켓배송: '#ffdfc1',
  대용량: '#c1eade',
  정기권: '#d3e6ed',
  해외직구: '#e3e6fc',
  기타: '#d4dfe1'
};
