import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import { Done } from '@mui/icons-material';
import SmallChip from './index';
import { isFinished } from '../../util/';
import { ItemType } from '../../type';

export default function ParticipantChip({ item }: { item: ItemType }) {
  const fin = isFinished(item);
  const icon = fin ? <Done /> : <GroupIcon />;
  const label = fin ? '마감' : `${item.participantCnt}/${item.capacity ?? '-'}명`;
  const backgroundColor = fin ? '#dadada' : '#ffd8d9';
  return <SmallChip icon={icon} label={label} backgroundColor={backgroundColor} />;
}
