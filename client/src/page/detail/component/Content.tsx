import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import LinkPreview from './LinkPreview';
import { css } from '@emotion/react';

interface ContentType {
  content: string;
  urls: UrlType[];
}

export interface UrlType {
  url: string;
}

export default function Content({ content, urls }: ContentType) {
  return (
    <>
      <Card sx={ContentStyle} variant="outlined">
        <CardContent>
          <Typography variant="body2" lineHeight="2.5" css={ContentTextStyle}>
            {content}
          </Typography>
        </CardContent>
      </Card>
      {urls.map((url, idx) => {
        return <LinkPreview key={idx} url={url.url} />;
      })}
    </>
  );
}

const ContentStyle = {
  mt: 2,
  minWidth: 275,
  minHeight: 275,
  bgcolor: '#ffe7e7',
  border: '1px solid #fefafa',
  borderRadius: 7
};

const ContentTextStyle = css`
  white-space: pre-wrap;
  word-break: break-all;
`;
