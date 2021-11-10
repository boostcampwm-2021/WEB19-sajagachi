import { css } from '@emotion/react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface PreviewData {
	title: string;
	description: string;
	domain: string;
	img: string;
	url: string;
}
const StyledLink = css`
	text-decoration: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: black;
	}
`;

export default function LinkPreview({
	previewData
}: {
	previewData: PreviewData;
}) {
	return (
		<a href={previewData.url} css={StyledLink}>
			<Card
				sx={{
					p: 0.5,
					m: 1,
					maxWidth: 1 / 2,
					maxHeight: 75
				}}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<CardContent sx={{ maxHeight: 80, p: 0.8 }}>
						<Typography
							component="div"
							variant="subtitle2"
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap'
							}}
						>
							{previewData.title}
						</Typography>
						<Typography
							component="div"
							variant="body2"
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap'
							}}
						>
							{previewData.description}
						</Typography>

						<Typography
							variant="caption"
							color="text.secondary"
							component="div"
						>
							{previewData.domain}
						</Typography>
					</CardContent>
				</Box>
			</Card>
		</a>
	);
}
