/**
 *
 * 根模块
 *
 * 路由控制区域
 *
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router";
import { createHashHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux'
import Login from './containers/login/Login';
import NoMatch from './containers/noMatch/NoMatch';
import BaseLayout from './containers/base/Base';
import Chart from './containers/chart/Chart';
import Home from './containers/home/Home';

export default class App extends Component {

	constructor(props) {
		super(props)
		this.logined = true
	}

	render() {
		const history = createHashHistory();
		const Admin = (props) => (
			<BaseLayout>
				<Switch>
					<Route path={'/chart'} component={Chart}/>
					<Route path={'/dashboard'} component={Home}/>
					<Route exact path={'/'} render={() => (<Redirect to="/dashboard"/>)}/>
					<Route component={NoMatch}/>
				</Switch>
			</BaseLayout>
		)

		return (
			<Provider {...this.props}>
				{/* ConnectedRouter will use the store from Provider automatically */}
				<ConnectedRouter history={history}>
					<div>
						<Switch>
							<Route path="/login" component={Login}/>
							<Route path="/" render={() => (
								this.logined ? <Admin/> : <Redirect to="/login"/>
							)}/>
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
