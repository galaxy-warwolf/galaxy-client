
import { AUTH, AUTH_FAIL, AUTH_SUCCESS } from '../../common/constants/Actions';

const initialState = {
	name: ""
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case AUTH:
			return state;
		case AUTH_SUCCESS:
			return {
				...state,
				...action.result
			}
		case AUTH_FAIL:
			return state;
		default:
			return state;
	}
}
