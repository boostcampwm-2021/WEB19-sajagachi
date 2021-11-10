import React from 'react';
import Gnb from './common/gnb';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './page/main';
import Post from './page/post';
import Detail from './page/detail';

const App = () => {
	return (
		<>
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
