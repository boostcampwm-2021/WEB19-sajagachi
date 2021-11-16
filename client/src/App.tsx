import React from 'react';
import Gnb from './common/gnb';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './page/main';
import Post from './page/post';
import Detail from './page/detail';
import { createTheme, ThemeProvider } from '@mui/material';
import Chat from './page/chat';

const theme = createTheme({
	typography: {
		fontFamily: "'Noto Sans KR', sans-serif"
	}
});

const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Router>
					<Gnb />
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/post" component={Post} />
						<Route path="/post/:postId" component={Detail} />
						<Route path="/chat" component={Chat} />
					</Switch>
				</Router>
			</ThemeProvider>
		</>
	);
};

export default App;
