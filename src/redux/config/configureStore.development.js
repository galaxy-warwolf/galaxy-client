import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";
import { DevTools } from "../../containers/";
import clientMiddleware from "../middleware/client";
import ApiClient from "../../common/http-client/ApiClient";
import persistState from "redux-localstorage";

const client = new ApiClient();
const clientMiddle = clientMiddleware(client);
const history = createHashHistory();
const reduxRouterMiddleware = routerMiddleware(history);

const finalCreateStore = compose(
	persistState(['auth', 'user']),
	applyMiddleware(
		thunk,
		clientMiddle,
		reduxRouterMiddleware
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
