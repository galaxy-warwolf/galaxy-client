/**
 *
 * 根模块
 *
 * 路由控制区域
 *
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
import { createHashHistory } from "history";
import { Provider } from "react-redux";
import { BaseLayout } from "./containers/index";
import { ConnectedRouter } from 'react-router-redux'

export default class App extends Component {

	render() {
		const history = createHashHistory();
		return (
			<Provider {...this.props}>
				{/* ConnectedRouter will use the store from Provider automatically */}
				<ConnectedRouter history={history}>
					<div>
						<Route path="/" component={BaseLayout}>
						</Route>
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
