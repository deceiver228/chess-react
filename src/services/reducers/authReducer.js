import actionTypes from "../actionTypes";

const initialState = {
	email: null,
	id: null,
	token: null
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SUCCESS: {
			console.log(action.payload)
			return {
				...state,
				token: action.payload.token,
				email: action.payload.email,
				id: action.payload.id
			}
		}
		case actionTypes.AUTH_LOGOUT: {
			return {
				...state,
				...initialState
			}
		}
		default: {
			return state
		}
	}
}