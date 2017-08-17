/**
 *
 * 根模块
 *
 * 路由控制区域
 *
 */
import React, {Component, PropTypes} from "react";
import {Router, Route, useRouterHistory, IndexRoute} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {createHashHistory} from "history";
import {Provider} from "react-redux";

export default class App extends Component {

	static propTypes() {
		return {
			store: PropTypes.object.isRequired
		};
	}

	componentWillMount() {
		console.log("Hello App Page");
	}

	render() {
		const {store} = this.props;

		return (
			<Provider {...this.props}>
				<div>
					<Router history={syncHistoryWithStore(useRouterHistory(createHashHistory)(), store)}>
						<Route path="/" component={BaseLayout}>

					</Router>
				</div>
			</Provider>
		)
	}
}
