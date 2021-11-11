import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';

function BackButton({ location, history }: RouteComponentProps) {
	const goBack = () => {
		history.goBack();
	};

	return location.pathname !== '/' ? (
		<IconButton
			aria-label="go back"
			onClick={goBack}
			sx={{ width: '2.43rem', height: '2.43rem' }}
		>
			<ArrowBackIosNewIcon
				sx={{ color: 'white', width: '1.9rem', height: '1.9rem' }}
			/>
		</IconButton>
	) : null;
}
export default withRouter(BackButton);
