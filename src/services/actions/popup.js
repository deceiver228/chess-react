import actionTypes from "../actionTypes"

export const openPromotion = ({num, letter, x, y}) => {
	return {
		type: actionTypes.PROMOTION_OPEN,
		payload: {num, letter, x, y}
	}
}

export const closePromotion = () => {
	return {
		type: actionTypes.PROMOTION_CLOSE
	}
}