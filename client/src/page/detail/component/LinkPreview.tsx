import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Skeleton } from '@mui/material';
import noImg from '../../../asset/noImg.jpg';
import { fetchGet } from '../../../util';

interface PreviewType {
  title?: string | undefined;
  description?: string | undefined;
  hostname?: string | undefined;
  image?: string | undefined;
}

export default function LinkPreview({ url }: { url: string }) {
  const [metadata, setMetadata] = useState<PreviewType>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMetadata = async (url: string) => {
      const response = await fetchGet(`${process.env.REACT_APP_SERVER_URL}/api/previewData`, `url=${url}`);
      setMetadata(response.metadata);
      setIsLoading(false);
    };
    getMetadata(url);
  }, [url]);

  return (
    <a css={PreviewContainerStyle} target="_blank" href={url} rel="noreferrer">
      <div style={{ width: 'calc(100% - 64px - 10px)' }}>
        {!isLoading ? (
          <>
            <h4 css={PreviewTitleStyle}>{metadata ? metadata.title : url}</h4>
            <p css={PreviewDescStyle}>{metadata && metadata.description}</p>
            <p css={PreviewDomainStyle}>{metadata && metadata.hostname}</p>
          </>
        ) : (
          <>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </>
        )}
      </div>
      {!isLoading ? (
        <img
          src={metadata && metadata.image ? metadata.image : noImg}
          style={{ width: 70, maxHeight: 70 }}
          alt={metadata && metadata.title}
        />
      ) : (
        <div>
          <Skeleton variant="rectangular" width={70} height={70} />
        </div>
      )}
    </a>
  );
}

const PreviewContainerStyle = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 -4px 24px 2px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  margin: 12px 0px;
  padding: 8px;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

const PreviewTitleStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
`;

const PreviewDescStyle = css`
  --font-size: 0.7rem;
  --line-height: 1.4;
  --lines-to-show: 2;
  font-size: var(--font-size);
  text-overflow: ellipsis;
  height: calc(var(--font-size) * var(--line-height) * var(--lines-to-show));
  line-height: var(--line-height);
  overflow: hidden;
  margin: 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: var(--lines-to-show);
  -webkit-box-orient: vertical;
`;

const PreviewDomainStyle = css`
  font-size: 0.7rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 5px 0;
  max-width: 60vw;
  color: #404040;
`;
