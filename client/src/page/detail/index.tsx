import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Button,
	IconButton
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Chip } from '@mui/material';

const StyledBox = styled(Box)(() => ({
	backgroundColor: '#ffe7e7',
	border: '1px solid #fefafa'
}));
const Puller = styled(Box)(() => ({
	width: 30,
	height: 6,
	backgroundColor: grey[900],
	borderRadius: 3,
	position: 'absolute',
	top: 8,
	left: 'calc(50% - 15px)'
}));
export default function Detail() {
	return (
		<div>
			<Card
				sx={{
					minWidth: 275,
					mr: '10px',
					ml: '10px',
					mt: '5.5rem',
					borderRadius: 7,
					bgcolor: '#fefafa',
					border: '1px solid #fefafa'
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
						<Typography variant="h5">Word of the Day</Typography>
						<Chip label={'해외배송'} sx={{ color: 'grey' }} />
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							mt: 2
						}}
					>
						<Typography variant="body1">
							작성자| {111111}
						</Typography>
						<Typography variant="body2">
							마감시간| 11 : 00
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
							<Typography variant="body2">
								Word of the Day
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
					<IconButton sx={{ bgcolor: 'white', p: 1, m: 1 }}>
						<FavoriteBorderIcon sx={{ fontSize: 30 }} />
					</IconButton>
					<Button
						variant="contained"
						sx={{
							bgcolor: '#F76A6A',
							flexGrow: 1,
							p: 1,
							m: 1
						}}
					>
						공동 구매
					</Button>
				</Box>
			</StyledBox>
		</div>
	);
}
