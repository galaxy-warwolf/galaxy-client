import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {useRouterHistory} from "react-router";
import {createHashHistory} from "history";
import {routerMiddleware} from "react-router-redux";
import rootReducer from "../reducers";
import {DevTools} from "../../containers/";
import clientMiddleware from "../middleware/client";
import ApiClient from "../../common/http-client/ApiClient";
import persistState from "redux-localstorage";

const client = new ApiClient();
const clientMiddle = clientMiddleware(client);

const finalCreateStore = compose(
	persistState(['auth', 'user']),
	applyMiddleware(
		thunk,
		clientMiddle,
		routerMiddleware(useRouterHistory(createHashHistory)())
	),
	window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
)(createStore);

export default (initialState) => {
	const store = finalCreateStore(rootReducer, initialState);

	if (module && module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers'))
		);
	}

	return store;
};
