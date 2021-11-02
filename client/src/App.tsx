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

const globalStyle = css`
	* {
		box-sizing: border-box;
		padding: 0;
	}
	body {
		width: 100vw;
		height: 100vh;
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
					<Route path="/" component={Main} />
				</Switch>
			</Router>
		</>
	);
};

export default App;
