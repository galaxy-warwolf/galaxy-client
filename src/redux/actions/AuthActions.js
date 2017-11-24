import { AUTH, AUTH_FAIL, AUTH_SUCCESS, LOGOUT_SUCCESS } from '../../common/constants/Actions';
import { push } from 'react-router-redux';

export function auth(data, config) {
	return {
		types: [AUTH, AUTH_SUCCESS, AUTH_FAIL],
		promise: (client) => client.post(`<%= API_URL %>/api/auth`, { data }, config),
		data
	}
}

export function login(data) {
	return {
		type: AUTH_SUCCESS,
		data
	}
}

export function logout() {
	return (dispatch) => {
		// 清除缓存数据
		dispatch({ type: LOGOUT_SUCCESS });
		// 跳转到登陆页面
		dispatch(push("/login"));
	}
}
