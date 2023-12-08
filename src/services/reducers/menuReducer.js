import actionTypes from "../actionTypes";

const initialState = {
	coords: null,
	highlightedIndex: -1,
	isMenuOpen: false
}

export const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOOGLE_MENU: {
			let {isMenuOpen} = state;
			return {
				...state,
				isMenuOpen: !isMenuOpen
			}
		}

		case actionTypes.SET_HIGHTLIGHTED_MENU_ITEM: {
			return {
				...state,
				highlightedIndex: action.payload
			}
		}

		case actionTypes.ON_CHANGE_MENU_ITEM: {
			return {
				...state
			}
		}

		case actionTypes.SET_COORDS: {
			let coords = {...action.payload};
			return {
				...state,
				coords
			}
		}

		default:
			return state
	}
}