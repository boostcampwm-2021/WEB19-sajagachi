import React from 'react';
import Gnb from './common/gnb';
import { Global, css } from '@emotion/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './page/main';
import Post from './page/post';
import Detail from './page/detail';

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
			<Router>
				<Gnb />
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/post" component={Post} />
					<Route path="/post/:postId" component={Detail} />
				</Switch>
			</Router>
		</>
	);
};

export default App;
