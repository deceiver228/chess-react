import { areSameColorCells } from "../utils/areSameColorCells";
import { findFigureCoords } from '../utils/findFigureCoords';
import { getBishopMoves, getKingMoves, getKnightMoves, getPawnCaptures, getPawnMoves, getQueenMoves, getRookMoves, getCastlingMoves, getKingPosition, getFigures } from "./getMoves";
import { moveFigure, movePawn } from './move';
import { figuresAreEqual } from '../utils/figuresAreEqual';

const arbiter = {
	getRegularMoves: function({figures, figure, num, letter}) {
		if(figure.endsWith('r')) 
			return getRookMoves({figures, figure, num, letter});
		if (figure.endsWith('b'))
			return getBishopMoves({figures, figure, num, letter});
		if (figure.endsWith('q'))
			return getQueenMoves({figures, figure, num, letter});
		if (figure.endsWith('n')) 
			return getKnightMoves({figures, num, letter});
		if (figure.endsWith('k'))
			return getKingMoves({figures, num, letter});
		if (figure.endsWith('p')) 
			return getPawnMoves({figures, figure, num, letter});
	},
	getValidMoves: function({figures, prevFigures, castleDirection, figure, num, letter}) {
		let moves = this.getRegularMoves({figures, figure, num, letter});
		const notInCheckMoves = [];

		if (figure.endsWith('p')) {
			moves = [
				...moves,
				...getPawnCaptures({figures, prevFigures, figure, num, letter})
			]
		}
		if (figure.endsWith('k')) {
			moves = [
				...moves,
				...getCastlingMoves({figures, castleDirection, figure, num, letter})
			]
		}

		moves.forEach(([x, y]) => {
			const figuresAfterMove = this.performMove({figures, figure, num, letter, x, y});

			if (!this.isPlayerInCheck({figuresAfterMove, figures, player: figure[0]})) {
				notInCheckMoves.push([x, y]);
			}
		})
		return notInCheckMoves;
	},
	performMove: function({figures, figure, num, letter, x ,y}) {
		if (figure.endsWith('p')) {
			return movePawn({figures, figure, num, letter, x, y});
		} else {
			return moveFigure({figures, figure, num, letter, x, y});
		}
	},
	isPlayerInCheck: function({figuresAfterMove, figures, player}) {
		const enemy = player.startsWith('w') ? 'b' : 'w';
		let kingPos = getKingPosition(figuresAfterMove, player);
		const enemyFigures = getFigures(figuresAfterMove, enemy);

		const enemyMoves = enemyFigures.reduce((acc, f) => acc = [
			...acc,
			...(f.figure.endsWith('p'))
				? getPawnCaptures({figures: figuresAfterMove, prevFigures: figures, ...f})
				: this.getRegularMoves({figures: figuresAfterMove, ...f})
		], []);

		if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y))
			return true;
		return false;
	},
	isStalemate: function({figures, player, castleDirection}) {
		const isInCheck = this.isPlayerInCheck({figuresAfterMove: figures, player});
	
		if (isInCheck)
			return false;
		
		const playerFigures = getFigures(figures, player);
		const moves = playerFigures.reduce((acc, f) => acc = [
			...acc,
			...(this.getValidMoves({
				figures,
				castleDirection,
				...f
			}))
		], []);

		return (!isInCheck && moves.length === 0);
	},
	insufficientMaterial: function(figures) {
		const pieces = figures.reduce((acc, num) => acc = [
			...acc,
			...num.filter(x => x)
		], []);
		if (pieces.length === 2)
			return true;
		if (pieces.length === 3 && (pieces.some(p => p.endsWith('b')) || pieces.some(p => p.endsWith('n'))))
			return true;
		if (pieces.length === 4
			&& pieces.every(p => p.endsWith('b') || p.endsWith('k'))
			&& new Set(pieces).size === 4
			&& areSameColorCells(
				findFigureCoords(figures, 'wb')[0],
				findFigureCoords(figures, 'bb')[0]
			))
				return true;
		return false;
	},
	isCheckMate: function({figures, player, castleDirection}) {
		const isInCheck = this.isPlayerInCheck({figuresAfterMove: figures, player});

		if (!isInCheck)
			return false;

		const playerFigures = getFigures(figures, player);
		const moves = playerFigures.reduce((acc, f) => acc = [
			...acc,
			...(this.getValidMoves({
				figures,
				castleDirection,
				...f
			}))
		], []);

		return (isInCheck && moves.length === 0);
	},
	isThreefoldRepetition: function(figures, newFigures) {
		let c = 0;
		let newFig = [].concat(...[].concat(...newFigures));

		figures.forEach(f => {
			let fig = [].concat(...[].concat(...f));
			if (figuresAreEqual(fig, newFig))
				c++;
		})
		return c === 2 ? true : false;
	}
}

export default arbiter;