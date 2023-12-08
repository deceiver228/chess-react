import { addFigures } from "./utils/addFigures";

export const Status = {
	"ongoing": "Ongoing",
	"promoting": "Promoting",
	"white": "White wins",
	"black": "Black wins",
	"stalemate": "Game draws due to stalemate",
	"insufficient": "Game draws due to insufficient material",
	"threefold": "Game draws due to threefold repetition"
}

export const initGameState = {
	coords: null,
	highlightedIndex: -1,
	isMenuOpen: false,
	lastMoveList: [],
	lostWhiteFigures: [],
	lostBlackFigures: [],
	status: Status.ongoing,
	promotionSquare: null,
	castleDirection: {
		'w': 'both',
		'b': 'both'
	},
	figures: [addFigures()],
	turn: 'w',
	movesList: [],
	moving: false,
	movingFigure: [],
	candidateMoves: []
}