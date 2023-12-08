import actionTypes from "../actionTypes";

export const authSuccess = user => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: user
	}
}

export const authLogout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}