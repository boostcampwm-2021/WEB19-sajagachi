import React from 'react';
import { css } from '@emotion/react';
import { ItemType } from '../../../type';
import { Link } from 'react-router-dom';
import { ItemContent } from './ItemContent';

export default function Item(props: { item: ItemType }) {
  return (
    <li css={ItemStyle}>
      <Link to={`/post/${props.item.id}`} css={LinkStyle}>
        <ItemContent item={props.item} />
      </Link>
    </li>
  );
}

const LinkStyle = css`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

const ItemStyle = css`
  position: relative;
  width: 100%;
  height: 120px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 3px 3px 8px 1px #bbbbbb;
`;
