import React from 'react';
import Gnb from './common/gnb';
import { Global, css } from '@emotion/react';
import {
	BrowserRouter,
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Main from './page/main';
import Post from './page/post';

const globalStyle = css`
	* {
		box-sizing: border-box;
		padding: 0;
	}
	body {
		width: 100vw;
		height: calc(100vh - 4.4rem);
		padding: 0;
		margin: 0;
	}
	#root {
		width: 100%;
		height: 100%;
	}
`;

const App = () => {
	return (
		<>
			<Global styles={globalStyle} />
			<Gnb />
			<Router>
				<Switch>
					<Route path="/" component={Main} exact />
					<Route path="/post" component={Post} exact />
				</Switch>
			</Router>
		</>
	);
};

export default App;
