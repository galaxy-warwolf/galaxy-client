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
import Loadable from 'react-loadable';

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
					<Route path={'/chart'} component={LoadableChart}/>
					<Route path={'/dashboard'} component={LoadableHome}/>
					<Route exact path={'/'} render={() => (<Redirect to="/dashboard"/>)}/>
					<Route component={NoMatch}/>
				</Switch>
			</BaseLayout>
		)

		const LoadableHome = Loadable({
			loader: () => import('./containers/home/Home'),
			loading() {
				return <div>Loading...</div>
			}
		});

		const LoadableChart = Loadable({
			loader: () => import('./containers/chart/Chart'),
			loading() {
				return <div>Loading...</div>
			}
		});

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
