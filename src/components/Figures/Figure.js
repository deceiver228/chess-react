import { useDispatch, useSelector } from 'react-redux';
import arbiter from '../../arbiter/arbiter';
import { clearCandidates, generateCandidateMoves } from '../../services/actions/move';

const Figure = ({num, letter, figure}) => {

	const game = useSelector(store => store.game);
	const dispatch = useDispatch();
	const {turn, figures: currentFigures, castleDirection} = game;

	const onDragStart = e => {
		dispatch(clearCandidates());
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain',`${figure},${num},${letter}`);
		setTimeout(() => {
			e.target.style.display = 'none';
		}, 0)
		if (turn === figure[0]) {
			const candidateMoves = 
				arbiter.getValidMoves({
					figures: currentFigures[currentFigures.length - 1],
					prevFigures: currentFigures[currentFigures.length - 2],
					castleDirection: castleDirection[turn],
					figure,
					num,
					letter});
			dispatch(generateCandidateMoves({candidateMoves}))
		}
	}

	const onDragEnd = e => e.target.style.display = 'block';

	const onFigureClick = e => {
		if (!figure) {
			dispatch(clearCandidates())
		}
		if (turn === figure[0]) {
			const candidateMoves = 
				arbiter.getValidMoves({
					figures: currentFigures[currentFigures.length - 1],
					prevFigures: currentFigures[currentFigures.length - 2],
					castleDirection: castleDirection[turn],
					figure,
					num,
					letter});
			dispatch(generateCandidateMoves({candidateMoves}))
		}
	}

	return (
		<div
			onClick={e => onFigureClick(e)}
			className={`figure ${figure} f-${letter}${num}`}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}/>
	);
};

export default Figure;