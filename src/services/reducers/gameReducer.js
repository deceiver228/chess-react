import { Status } from "../../constants";
import { addFigures } from "../../utils/addFigures";
import actionTypes from "../actionTypes";

const initialState = {
	status: Status.ongoing,
	promotionSquare: null,
	castleDirection: {
		'w': 'both',
		'b': 'both'
	},
	lastMoveList: [],
	lostWhiteFigures: [],
	lostBlackFigures: [],
	figures: [addFigures()],
	turn: 'w',
	movesList: [],
	candidateMoves: []
}

export const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.NEW_MOVE: {
			let {turn, movesList, figures} = state;

			figures = [
				...figures,
				action.payload.newFigures
			]

			movesList = [
				...movesList,
				action.payload.newMove
			]

			turn = turn === 'w' ? 'b' : 'w';
			console.log(movesList, action.payload.newMove)
			return {
				...state,
				movesList,
				turn,
				figures
			}
		}

		case actionTypes.GENERATE_CANDIDATE_MOVES: {
			return {
				...state,
				candidateMoves: action.payload.candidateMoves
			}
		}

		case actionTypes.CLEAR_CANDIDATE_MOVES: {
			return {
				...state,
				candidateMoves: []
			}
		}

		case actionTypes.PROMOTION_OPEN: {
			return {
				...state,
				status: Status.promoting,
				promotingSquare: {...action.payload}
			}
		}

		case actionTypes.PROMOTION_CLOSE: {
			return {
				...state,
				status: Status.ongoing,
				promotingSquare: null
			}
		}

		case actionTypes.CAN_CASTLE: {
			let {turn, castleDirection} = state;
			let updatedCastleDirection = {
				...castleDirection,
				[turn]: action.payload
			}
			return {
				...state,
				castleDirection: updatedCastleDirection
			}
		}

		case actionTypes.STALEMATE: {
			return {
				...state,
				status: Status.stalemate
			}
		}

		case actionTypes.INSUFFICIENT_MATERIAL: {
			return {
				...state,
				status: Status.insufficient
			}
		}

		case actionTypes.THREEFOLD_REPETITION: {
			return {
				...state,
				status: Status.threefold
			}
		}

		case actionTypes.WIN: {
			return {
				...state,
				status: action.payload === 'w' ? Status.white : Status.black
			}
		}

		case actionTypes.NEW_GAME: {
			return {
				...state,
				...initialState
			}
		}

		case actionTypes.TAKE_BACK: {
			let {figures, movesList, lastMoveList, turn} = state;

			if (figures.length > 1) {
				figures = figures.slice(0, figures.length - 1);
				movesList = movesList.slice(0, movesList.length - 1);
				lastMoveList = lastMoveList.slice(0, lastMoveList.length - 1);
				turn = turn === 'w' ? 'b' : 'w';
			}

			return {
				...state,
				figures,
				movesList,
				lastMoveList,
				turn
			}
		}
		case actionTypes.UPDATE_LOST_FIGURES: {
			let {lostWhiteFigures, lostBlackFigures} = state;

			action.payload[0] === 'w'
				? lostBlackFigures = [...lostBlackFigures, action.payload]
				: lostWhiteFigures = [...lostWhiteFigures, action.payload]
			return {
				...state,
				lostWhiteFigures,
				lostBlackFigures
			}
		}

		case actionTypes.REMOVE_LOST_FIGURE: {
			let {turn, lostBlackFigures, lostWhiteFigures} = state;
			let newLostFigures = turn === 'b' ? [...lostBlackFigures] : [...lostWhiteFigures];

			if (turn === 'b') {
				newLostFigures = newLostFigures.filter((_, i) => i !== lostBlackFigures.length - 1)
			} else {
				newLostFigures = newLostFigures.filter((_, i) => i !== lostWhiteFigures.length - 1)
			}

			return {
				...state,
				lostBlackFigures: turn === 'b' ? newLostFigures : lostBlackFigures,
				lostWhiteFigures: turn === 'b' ? lostWhiteFigures: newLostFigures
			}
		}

		case actionTypes.UPDATE_LAST_MOVE: {
			let {lastMoveList} = state;
			let newLastMoveList = [...lastMoveList, [...action.payload]];
			return {
				...state,
				lastMoveList: newLastMoveList
			}
		}
		default:
			return state;
	}
}