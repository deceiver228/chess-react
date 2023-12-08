import actionTypes from "../actionTypes"

export const toogleMenu = () => {
	return {
		type: actionTypes.TOOGLE_MENU
	}
}

export const setHlMenuItem = index => {
	return {
		type: actionTypes.SET_HIGHTLIGHTED_MENU_ITEM,
		payload: index
	}
}

export const onChangeMenuItem = item => {
	return {
		type: actionTypes.ON_CHANGE_MENU_ITEM,
		payload: item
	}
}

export const setCoords = coords => {
	return {
		type: actionTypes.SET_COORDS,
		payload: coords
	}
}