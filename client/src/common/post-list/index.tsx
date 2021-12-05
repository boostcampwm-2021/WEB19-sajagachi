import React from 'react';
import { css } from '@emotion/react';
import Item from './component/Item';

export default function PostList(props: any) {
  return (
    <ul css={ListStyle}>
      {props.items.map((item: any) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

const ListStyle = css`
  list-style: none;
  padding-left: 0;
  padding: 0 15px;
  max-width: 800px;
  margin: 0 auto;
`;
