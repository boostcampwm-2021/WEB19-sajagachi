import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Skeleton } from '@mui/material';
import noImg from '../../../asset/noImg.jpg';
import { fetchGet } from '../../../util/util';

interface PreviewType {
	title?: string | undefined;
	description?: string | undefined;
	hostname?: string | undefined;
	image?: string | undefined;
}
const PreviewContainerStyle = css`
	display: flex;
	align-items: center;
	border-radius: 5px;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
		0 -4px 24px 2px rgba(0, 0, 0, 0.03);
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
	margin: 5px 0;
	max-width: 60vw;
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

export default function LinkPreview({ url }: { url: string }) {
	const [metadata, setMetadata] = useState<PreviewType>({});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getMetadata = async (url: string) => {
			const response = await fetchGet(
				`${process.env.REACT_APP_SERVER_URL}/api/previewData`,
				`url=${url}`
			);
			setMetadata(response.metadata);
			setIsLoading(false);
		};
		getMetadata(url);
	}, [url]);

	return (
		<a css={PreviewContainerStyle} target="_blank" href={url}>
			<div style={{ flex: '3', marginRight: '5px' }}>
				{!isLoading ? (
					<>
						<h4 css={PreviewTitleStyle}>{metadata.title}</h4>
						<p css={PreviewDescStyle}>{metadata.description}</p>
						<p css={PreviewDomainStyle}>{metadata.hostname}</p>
					</>
				) : (
					<>
						<Skeleton />
						<Skeleton width="60%" />
					</>
				)}
			</div>
			{!isLoading ? (
				<img
					src={metadata.image ? metadata.image : noImg}
					style={{ maxWidth: '30%', maxHeight: 64 }}
					alt={metadata.title}
				/>
			) : (
				<div style={{ flex: '1' }}>
					<Skeleton variant="rectangular" height={64} />
				</div>
			)}
		</a>
	);
}
