import React from 'react';
import { css } from '@emotion/react';
import { ItemType } from '../../../type';
import { dateFormat, getDistance, isFinished } from '../../../util';
import { LocationOn } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { locationState } from '../../../store/location';
import CategoryChip from '../../../common/chip/CategoryChip';
import ParticipantChip from '../../../common/chip/ParticipantChip';

export function ItemContent(props: { item: ItemType }) {
  const location = useRecoilValue(locationState);
  const fin = isFinished(props.item);
  const deadline = props.item.deadline ? `${dateFormat(props.item.deadline)}까지` : '마감 기한 없음';
  const dist = Math.round(getDistance(location.lat, location.lng, props.item.lat, props.item.long));

  return (
    <div css={ItemContainerStyle}>
      <h1 css={ItemTitleStyle(fin)}>{props.item.title}</h1>
      <p css={ItemDeadlineStyle(fin)}>{deadline}</p>
      <p css={ItemDescStyle(fin)}>{props.item.content.substring(0, 100)}</p>
      <p css={ItemDistStyle(fin)}>
        <LocationOn css={DistIconStyle(fin)} />
        {dist >= 1000 ? calcKm(dist) + 'km' : dist + 'm'}
      </p>
      <div css={ChipContainerStyle}>
        <CategoryChip label={props.item.category} />
        <ParticipantChip item={props.item} />
      </div>
    </div>
  );
}

const calcKm = (dist: number) => {
  return (dist / 1000).toFixed(1);
};

const ItemContainerStyle = css`
  width: 100%;
  height: 100%;
  padding: 10px 90px 10px 15px;
`;

const ItemTitleStyle = (finished: boolean) => css`
  font-family: 'Noto Sans KR Medium', sans-serif;
  font-size: 18px;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${finished ? 'color: #aeaeae;' : ''}
`;

const ItemDeadlineStyle = (finished: boolean) => css`
  font-size: 12px;
  margin: 5px 0;
  color: #404040;
  ${finished ? 'color: #aeaeae;' : ''}
`;

const ItemDescStyle = (finished: boolean) => css`
  --font-size: 9px;
  --line-height: 1.4;
  --lines-to-show: 1;
  font-size: var(--font-size);
  text-overflow: ellipsis;
  height: calc(var(--font-size) * var(--line-height) * var(--lines-to-show));
  line-height: var(--line-height);
  margin: 5px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: var(--lines-to-show);
  -webkit-box-orient: vertical;
  color: #404040;
  ${finished ? 'color: #aeaeae;' : ''}
`;

const DistIconStyle = (finished: boolean) => css`
  position: relative;
  top: 2px;
  left: -1px;
  font-size: 14px;
  color: #404040;
  ${finished ? 'color: #aeaeae;' : ''}
`;

const ItemDistStyle = (finished: boolean) => css`
  font-size: 12px;
  margin: 0;
  margin-top: 17px;
  color: #404040;
  ${finished ? 'color: #aeaeae;' : ''}
`;

const ChipContainerStyle = css`
  position: absolute;
  top: 25px;
  right: 15px;
  display: flex;
  flex-direction: column;
`;
