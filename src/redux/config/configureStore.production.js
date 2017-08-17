import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import {useRouterHistory} from "react-router";
import {createHashHistory} from "history";
import {routerMiddleware} from "react-router-redux";
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
	)
)(createStore);

export default (initialState) => {
	return finalCreateStore(rootReducer, initialState);
};
