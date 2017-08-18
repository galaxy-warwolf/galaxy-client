/**
 *
 * 根模块
 *
 * 路由控制区域
 *
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Router, useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { createHashHistory } from "history";
import { Provider } from "react-redux";
import { BaseLayout } from "./containers/index";

export default class App extends Component {

	componentWillMount() {
		console.log("Hello App Page");
	}

	render() {
		const { store } = this.props;

		return (
			<Provider {...this.props}>
				<div>
					<Router history={syncHistoryWithStore(useRouterHistory(createHashHistory)(), store)}>
						<Route path="/" component={BaseLayout}>
						</Route>
					</Router>
				</div>
			</Provider>
		)
	}
}

// https://github.com/facebook/prop-types#prop-types
App.propTypes = {
	store: PropTypes.object.isRequired
};
