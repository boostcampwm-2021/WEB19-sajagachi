import React, { useState, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import SearchModal from '../../search-modal';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { RouteComponentProps } from 'react-router';
import { SwipeableDrawer } from '@mui/material';

const btn = css`
  width: 2.43rem;
  height: 2.43rem;
`;

const btnIcon = css`
  width: 1.9rem;
  height: 1.9rem;
  color: white;
`;

export default function SearchModalDrawer({ history }: RouteComponentProps) {
  const [isSearchModalOn, setIsSearchModalOn] = useState(false);

  const list = () => (
    <div>
      <Box
        sx={{
          width: 'auto',
          height: 'auto'
        }}
      >
        <SearchModal setIsSearchModalOn={setIsSearchModalOn} history={history} />
      </Box>
    </div>
  );

  return (
    <>
      <IconButton css={btn} onClick={() => setIsSearchModalOn(true)}>
        <SearchIcon css={btnIcon} />
      </IconButton>
      <SwipeableDrawer
        anchor="top"
        open={isSearchModalOn}
        onOpen={() => setIsSearchModalOn(true)}
        onClose={() => setIsSearchModalOn(false)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}
