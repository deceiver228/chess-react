import './Figures.css';
import Figure from './Figure';
import { useRef, useState } from 'react';
import { clearCandidates, makeNewMove } from '../../services/actions/move';
import arbiter from '../../arbiter/arbiter';
import { openPromotion } from '../../services/actions/popup';
import { detectStalemate, updateCastling, detectInsufficientMaterial, detectCheckMate, detectThreefoldRepetition, updateLostFigures, updateLastMove } from '../../services/actions/game';
import { getCastlingDirections } from '../../arbiter/getMoves';
import { getNewMoveNotation } from '../../utils/getNewMoveNotation';
import { useDispatch, useSelector } from 'react-redux';

const Figures = () => {

	const ref = useRef();

	const game = useSelector(store => store.game);
	const dispatch = useDispatch();

	const [moving, setMoving] = useState(false);
	const [movingFigure, setMovingFigure] = useState({figure: [], num: null, letter: null});

	const currentFigures = game.figures[game.figures?.length - 1];

	const dropCoords = e => {
		const {width, left, top} = ref.current.getBoundingClientRect()
		const size = width / 8;
		const y = Math.floor((e.clientX - left) / size);
		const x = 7 - Math.floor((e.clientY - top) / size); // Вычисляем в какую клетку мы дропнули фигуру (x, y)

		return {x, y};
	}

	const openPromotionBox = ({num, letter, x, y}) => {
		dispatch(openPromotion({
			num: Number(num),
			letter: Number(letter),
			x, y
		}))
	}

	const updateCastlingState = ({figure, num, letter}) => {
		const direction = getCastlingDirections({
			castleDirection: game.castleDirection,
			figure, num, letter
		})
		if (direction)
			dispatch(updateCastling(direction))
	}

	const move = e => {
		e.preventDefault();
		const {x, y} = dropCoords(e);
		const [figure, num, letter] = e.dataTransfer !== undefined 
			? e.dataTransfer.getData('text').split(',')
			: Object.values(movingFigure);

		if (game.candidateMoves?.find(m => m[0] === x && m[1] === y)) {

			const opponent = figure.startsWith('b') ? 'w' : 'b';
			const castleDirection = game.castleDirection[`${figure[0]}`];

			if (currentFigures[x][y]) {
				dispatch(updateLostFigures(currentFigures[x][y]));
			}

			if ((figure === 'wp' && x === 7) || (figure === 'bp' && x === 0)) {
				openPromotionBox({num, letter, x, y});
				return;
			}
			if (figure.endsWith('k') || figure.endsWith('r')) {
				updateCastlingState({figure, num, letter})
			}
			const newFigures = arbiter.performMove({
				figures: currentFigures,
				figure, num, letter,
				x, y
			})

			const newMove = getNewMoveNotation({
				figures: currentFigures, figure, num, letter, x, y
			});
			dispatch(makeNewMove({newFigures, newMove}));
			dispatch(updateLastMove(x, y, Number(num), Number(letter)));

			if (arbiter.insufficientMaterial(newFigures)) {
				dispatch(detectInsufficientMaterial()); // мало фигур для игры
			} else if (arbiter.isStalemate({figures: newFigures, player: opponent, castleDirection})) {
				dispatch(detectStalemate()); // пат
			} else if (arbiter.isThreefoldRepetition(game.figures, newFigures)) {
				dispatch(detectThreefoldRepetition()); // троекратное повторение позиции
			} else if (arbiter.isCheckMate({figures: newFigures, player: opponent, castleDirection})) {
				dispatch(detectCheckMate(figure[0])); // мат
			}
		}
		dispatch(clearCandidates());
	}

	const onDrop = e => {
		e.preventDefault();

		move(e);
	}
	const onDragOver = e => {
		e.preventDefault();
	}
	const onBoardClick = e => {

		const {x, y} = dropCoords(e);
		const cur = currentFigures[x][y]

		if (game.turn === cur[0] && cur && !moving) {
			setMovingFigure({figure: cur, num: x, letter: y})
			setMoving(true)
		}
		else if (moving) {
			if (game.turn === cur) {
				setMovingFigure({figure: cur, num: x, letter: y})
			} else {
				move(e);
				setMovingFigure({figure: [], num: null, letter: null})
				setMoving(false)
			}
		}
	}

	return <div 
		className='figures'
		ref={ref}
		onDrop={onDrop}
		onDragOver={onDragOver}
		onClick={onBoardClick}>
			{currentFigures && currentFigures?.map((n, num) => 
				n.map((_, letter) =>
					currentFigures[num][letter]
					?	<Figure
							key={num + '-' + letter}
							num={num}
							letter={letter}
							figure={currentFigures[num][letter]}
						/>
					: null
			))}

	</div>
}

export default Figures;