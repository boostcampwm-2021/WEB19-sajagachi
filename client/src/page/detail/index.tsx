import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	Button,
	IconButton
} from '@mui/material';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Chip } from '@mui/material';
import { fetchGet } from '../../util/util';
import 'dotenv/config';
import { RouteComponentProps } from 'react-router-dom';
import { css } from '@emotion/react';
import GroupBuyButton from './component/GroupBuyButton';

interface MatchParams {
	postId: string;
}
interface PostType {
	id: number;
	lat: number;
	long: number;
	deadline: string;
	userId: number;
	categoryId: number;
	title: string;
	content: string;
	category: { id: number; name: string };
	finished: boolean;
	capacity: number;
	participantCnt: number;
}

const detailContainer = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 700px;
`;

const StyledBox = styled(Box)(() => ({
	backgroundColor: '#ffe7e7',
	border: '1px solid #fefafa',
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '700px'
}));

const StyledIconButton = styled(IconButton)`
	&:hover {
		background: white;
	}
`;

export default function Detail({ match }: RouteComponentProps<MatchParams>) {
	const [post, setPost] = useState<PostType>({
		id: 0,
		userId: 0,
		categoryId: 0,
		title: '',
		content: '',
		category: { id: 0, name: '' },
		lat: 0,
		long: 0,
		finished: false,
		capacity: 0,
		deadline: '',
		participantCnt: 0
	});
	useEffect(() => {
		fetchGet(
			`${process.env.REACT_APP_SERVER_URL}/api/post/${match.params.postId}`
		).then(post => {
			setPost({ ...post });
		});
	}, []);
	return (
		<div css={detailContainer}>
			<Card
				sx={{
					borderRadius: 7,
					bgcolor: '#fefafa',
					border: '1px solid #fefafa',
					pb: '4.5rem'
				}}
				variant="outlined"
			>
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<Typography variant="h5">{post.title}</Typography>
						<Chip
							label={post.category.name}
							sx={{ color: 'grey' }}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							mt: 2
						}}
					>
						<Typography variant="body1">
							작성자| {post.userId}
						</Typography>
						<Typography variant="body2">
							마감시간| {post.deadline}
						</Typography>
					</Box>
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
								{post.content}
							</Typography>
						</CardContent>
					</Card>
				</CardContent>
			</Card>
			<StyledBox
				sx={{
					position: 'fixed',
					bottom: 0,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					visibility: 'visible',
					right: 0,
					left: 0,
					height: '4.5rem'
				}}
			>
				<Box sx={{ display: 'flex', p: 1 }}>
					<StyledIconButton sx={{ bgcolor: 'white', p: 1, m: 1 }}>
						<FavoriteBorderIcon sx={{ fontSize: 30 }} />
					</StyledIconButton>
					<GroupBuyButton
						participantCnt={post.participantCnt}
						capacity={post.capacity}
						finished={post.finished}
					/>
				</Box>
			</StyledBox>
		</div>
	);
}
