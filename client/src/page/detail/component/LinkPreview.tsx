import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { css } from '@emotion/react';
import noItemImg from '../../../asset/noitem.png';

const isValidUrl = (url: string) => {
	const regex =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
	return regex.test(url);
};

const fetchLinkPreviewData = async (url: string) => {
	const res = await fetch(API_PARSE_DETAILS_OF_LINK, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ url })
	});
	return await res.json();
};

interface PreviewType {
	title?: string | undefined;
	description?: string | undefined;
	domain?: string | undefined;
	img?: string | undefined;
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
	--font-size: 12px;
	--line-height: 1.4;
	--lines-to-show: 1;
	font-size: var(--font-size);
	text-overflow: ellipsis;
	height: calc(var(--font-size) * var(--line-height) * var(--lines-to-show));
	line-height: var(--line-height);
	overflow: hidden;
	margin: 5px 0;
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: var(--lines-to-show);
	-webkit-box-orient: vertical;
	color: #404040;
`;

const PreviewDescStyle = css`
	--font-size: 9px;
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
	color: #404040;
`;

const PreviewDomainStyle = css`
	--font-size: 10px;
	--line-height: 1.4;
	--lines-to-show: 1;
	font-size: var(--font-size);
	text-overflow: ellipsis;
	height: calc(var(--font-size) * var(--line-height) * var(--lines-to-show));
	line-height: var(--line-height);
	overflow: hidden;
	margin: 5px 0;
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: var(--lines-to-show);
	-webkit-box-orient: vertical;
	color: #404040;
`;

export default function LinkPreview({ url }: { url: string }) {
	const [loading, setLoading] = useState(false);
	const [preview, setPreviewData] = useState<PreviewType>({});
	const [isUrlValid, setUrlValidation] = useState(false);

	const setLinkPreviewData = async (url: string) => {
		if (!isValidUrl(url)) return;
		setUrlValidation(true);
		setLoading(false);
		const linkPreviewData = await fetchLinkPreviewData(url);
		setPreviewData(linkPreviewData);
		setLoading(true);
	};

	useEffect(() => {
		setLinkPreviewData(url);
	}, [url]);

	return (
		<a css={PreviewContainerStyle} target="_blank" href={url}>
			{loading ? (
				<div style={{ flex: '3', marginRight: '5px' }}>
					<h6 css={PreviewTitleStyle}>{preview.title}</h6>
					<p css={PreviewDescStyle}>{preview.description}</p>
					<p css={PreviewDomainStyle}>{preview.domain}</p>
				</div>
			) : (
				<div style={{ flex: '3', marginRight: '5px' }}>
					<Skeleton />
					<Skeleton width="60%" />
				</div>
			)}
			{loading ? (
				<img
					style={{ maxWidth: '30%', maxHeight: 64 }}
					alt={preview.title}
					src={preview.img !== null ? preview.img : noItemImg}
				/>
			) : (
				<div style={{ flex: '1' }}>
					<Skeleton variant="rectangular" height={64} />
				</div>
			)}
		</a>
	);
}

const API_PARSE_DETAILS_OF_LINK = `${process.env.REACT_APP_SERVER_URL}/api/previewData`;
