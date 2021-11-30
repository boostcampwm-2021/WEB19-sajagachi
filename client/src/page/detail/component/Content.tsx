import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import LinkPreview from './LinkPreview';

interface ContentType {
  content: string;
  urls: UrlType[];
}

interface UrlType {
  url: string;
}

export default function Content({ content, urls }: ContentType) {
  return (
    <>
      <Card
        sx={{
          mt: 2,
          minWidth: 275,
          minHeight: 275,
          bgcolor: '#ffe7e7',
          border: '1px solid #fefafa',
          borderRadius: 7
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="body2" lineHeight="2.5">
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
