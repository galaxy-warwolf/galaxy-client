/**
 *
 * 根模块
 *
 * 路由控制区域
 *
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router";
import { createHashHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux'
import Home from './containers/home/Home';
import Login from './containers/login/Login';
import NoMatch from './containers/noMatch/NoMatch';


export default class App extends Component {

	render() {
		const history = createHashHistory();
		return (
			<Provider {...this.props}>
				{/* ConnectedRouter will use the store from Provider automatically */}
				<ConnectedRouter history={history}>
					<div>
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route path="/login" component={Login}/>
							<Route component={NoMatch}/>
						</Switch>
					</div>
				</ConnectedRouter>
			</Provider>
		)
	}
}

// https://github.com/facebook/prop-types#prop-types
App.propTypes = {
	store: PropTypes.object.isRequired
};
