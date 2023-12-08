import { initGameState } from "../../constants";
import actionTypes from "../actionTypes";

export const updateCastling = direction => {
	return {
		type: actionTypes.CAN_CASTLE,
		payload: direction
	}
}
export const detectStalemate = () => {
	return {
		type: actionTypes.STALEMATE
	}
}
export const detectInsufficientMaterial = () => {
	return {
		type: actionTypes.INSUFFICIENT_MATERIAL
	}
}
export const detectThreefoldRepetition = () => {
	return {
		type: actionTypes.THREEFOLD_REPETITION
	}
}
export const detectCheckMate = winner => {
	return {
		type: actionTypes.WIN,
		payload: winner
	}
}
export const setupNewGame = () => {
	return {
		type: actionTypes.NEW_GAME,
		payload: initGameState
	}
}
export const takeBack = () => {
	return {
		type: actionTypes.TAKE_BACK
	}
}

export const updateLostFigures = figure => {
	return {
		type: actionTypes.UPDATE_LOST_FIGURES,
		payload: figure
	}
}

export const removeLostFigure = () => {
	return {
		type: actionTypes.REMOVE_LOST_FIGURE
	}
}

export const updateLastMove = (x, y, num, letter) => {
	return {
		type: actionTypes.UPDATE_LAST_MOVE,
		payload: [x, y, num, letter]
	}
}