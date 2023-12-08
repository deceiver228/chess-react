import arbiter from "./arbiter";

export const getRookMoves = ({figures, figure, num, letter}) => {
	const moves = [];
	const us = figure[0]
	const enemy = us === 'w' ? 'b' : 'w';

	const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // возможные направления движения Ладьи

	direction.forEach(dir => {
		for (let i = 1; i < 8; i++) {
			const x = num + (i * dir[0]);
			const y = letter + (i * dir[1]);
			if (figures?.[x]?.[y] === undefined)
				break;
			if (figures[x][y].startsWith(enemy)) {
				moves.push([x, y]);
				break;
			}
			if (figures[x][y].startsWith(us))
				break;
			moves.push([x, y]);
		}
	})

	return moves;
}
export const getKnightMoves = ({figures, num, letter}) => {
	const moves = [];
	const enemy = figures[num][letter].startsWith('w') ? 'b' : 'w';

	const candidates = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]; // возможные ходы Коня
	candidates.forEach(c => {
		const x = num + c[0];
		const y = letter + c[1];
		const cell = figures?.[x]?.[y];
		if (cell !== undefined && (cell.startsWith(enemy) || cell === ''))
			moves.push([x, y]);
		
	})
	return moves;
}
export const getBishopMoves = ({figures, figure, num, letter}) => {
	const moves = [];
	const us = figure[0]
	const enemy = us === 'w' ? 'b' : 'w';

	const direction = [[-1, -1], [-1, 1], [1, -1], [1, 1]]; // возможные направления движения Слона

	direction.forEach(dir => {
		for (let i = 1; i < 8; i++) {
			const x = num + (i * dir[0]);
			const y = letter + (i * dir[1]);
			if (figures?.[x]?.[y] === undefined)
				break;
			if (figures[x][y].startsWith(enemy)) {
				moves.push([x, y]);
				break;
			}
			if (figures[x][y].startsWith(us))
				break;
			moves.push([x, y]);
		}
	})

	return moves;
}
export const getQueenMoves = ({figures, figure, num, letter}) => {
	const moves = [
		...getRookMoves({figures, figure, num, letter}),
		...getBishopMoves({figures, figure, num, letter})
	];
	return moves;
}
export const getKingMoves = ({figures, num, letter}) => {
	const moves = [];
	const enemy = figures[num][letter].startsWith('w') ? 'b' : 'w';

	const candidates = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	candidates.forEach(c => {
		const x = num + c[0];
		const y = letter + c[1];
		const cell = figures?.[x]?.[y]
		if(cell !== undefined && (cell.startsWith(enemy) || cell === ''))
			moves.push([x, y]);
	})

	return moves;
}
export const getPawnMoves = ({figures, figure, num, letter}) => {
	const moves = [];
	const dir = figure === 'wp' ? 1 : -1;

	if (!figures?.[num + dir][letter]) {
		moves.push([num + dir, letter]);
	}

	if (num % 5 === 1) { // проверка на первый ход
		if (figures?.[num + dir]?.[letter] === '' && figures?.[num + dir * 2]?.[letter] === '')
			moves.push([num + dir * 2, letter])
	}

	return moves;
}
export const getPawnCaptures = ({figures, prevFigures, figure, num, letter}) => {
	const moves = [];
	const dir = figure === 'wp' ? 1 : -1;
	const enemy = dir === 1 ? 'b' : 'w';

	if (figures?.[num + dir]?.[letter - 1] && figures?.[num + dir]?.[letter - 1].startsWith(enemy)) { // взятие слева
		moves.push([num + dir, letter - 1]);
	}
	if (figures?.[num + dir]?.[letter + 1] && figures?.[num + dir]?.[letter + 1].startsWith(enemy)) { // взятие справа
		moves.push([num + dir, letter + 1]);
	}
	
	const enemyPawn = dir === 1 ? 'bp' : 'wp';
	const bothLetters = [letter - 1, letter + 1];
	if (prevFigures) {
		if ((dir === 1 && num === 4) || (dir === -1 && num === 3)) {
			bothLetters.forEach(letter => {
				if (figures?.[num]?.[letter] === enemyPawn
					&& figures?.[num + dir * 2]?.[letter] === ''
					&& prevFigures?.[num]?.[letter] === ''
					&& prevFigures?.[num + dir * 2]?.[letter] === enemyPawn) {
						moves.push([num + dir, letter]);
				}
			})
		}
	}

	return moves;
}
export const getCastlingMoves = ({figures, castleDirection, figure, num, letter}) => {
	const moves = [];

	if (letter !== 4 || num % 7 !== 0 || castleDirection === 'none') {
		return moves;
	}

	const x = figure.startsWith('w') ? 0 : 7; // black or white
	if (arbiter.isPlayerInCheck({figuresAfterMove: figures, player: figure[0]}))
		return moves
	if ((['left', 'both'].includes(castleDirection))
		&& !figures[x][3]
		&& !figures[x][2]
		&& !figures[x][1]
		&& figures[x][0] === (x === 0 ? 'wr' : 'br')
		&& !arbiter.isPlayerInCheck({
			figuresAfterMove: arbiter.performMove({figures, figure, num, letter, x: x, y: 3}),
			player: figure[0]
			})
		&& !arbiter.isPlayerInCheck({
			figuresAfterMove: arbiter.performMove({figures, figure, num, letter, x: x, y: 2}),
			player: figure[0]
			})) {
				moves.push([x, 2]);
		}
	if (['right', 'both'].includes(castleDirection)
		&& !figures[x][5]
		&& !figures[x][6]
		&& figures[x][7] === (x === 0 ? 'wr' : 'br')
		&& !arbiter.isPlayerInCheck({
			figuresAfterMove: arbiter.performMove({figures, figure, num, letter, x: x, y: 6}),
			player: figure[0]
			})
		&& !arbiter.isPlayerInCheck({
			figuresAfterMove: arbiter.performMove({figures, figure, num, letter, x: x, y: 5}),
			player: figure[0]
			}))  {
			moves.push([x, 6]);
	}

	return moves;
}
export const getCastlingDirections = ({castleDirection, figure, num, letter}) => {
	num = Number(num);
	letter = Number(letter);

	const direction = castleDirection[figure[0]];
	if (figure.endsWith('k'))
		return 'none';
	if ((letter === 0 && num === 0) || (letter === 0 && num === 7)) {
		if (direction === 'both')
			return 'right';
		if (direction === 'left')
			return 'none';
	}
	if ((letter === 7 && num === 0) || (letter === 7 && num === 7)) {
		if (direction === 'both')
			return 'left';
		if (direction === 'right')
			return 'none';
	}
}
export const getKingPosition = (figures, player) => {
	let kingPos;
	figures.forEach((num, x) => {
		num.forEach((letter, y) => {
			if (figures[x][y].startsWith(player) && figures[x][y].endsWith('k'))
				kingPos = [x, y];
		})
	})
	return kingPos;
}
export const getFigures = (figures, enemy) => {
	const enemyFigures = [];
	figures.forEach((num, x) => {
		num.forEach((letter, y) => {
			if (figures[x][y].startsWith(enemy))
				enemyFigures.push({
					figure: figures[x][y],
					num: x,
					letter: y
				})
		})
	})
	return enemyFigures;
}