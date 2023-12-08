import { useDispatch, useSelector } from 'react-redux';
import { clearCandidates, makeNewMove } from '../../../services/actions/move';
import { copyFigures } from '../../../utils/copyFigures';
import { getNewMoveNotation } from '../../../utils/getNewMoveNotation';
import './PromotionBox.css';

const PromotionBox = ({onClosePromotion}) => {
	const options = ['q', 'r', 'b', 'n'];

	const game = useSelector(store => store.game);
	const dispatch = useDispatch();

	const {promotingSquare} = game;

	if (!promotingSquare)
		return null

	const color = promotingSquare.x === 7 ? 'w' : 'b';

	const getPromotionBoxPosition = () => {
		const style = {};
		style.top = promotingSquare.x === 7 ? '-12.5%' : '97.5%';
		if (promotingSquare.y <= 1)
			style.left = '0%';
		else if (promotingSquare.y >= 6)
			style.right = '0%';
		else
			style.left = `${12.5 * promotingSquare.y - 20}%`;

		return style;
	}

	const onClick = option => {
		onClosePromotion();
		const newFigures = copyFigures(game.figures[game.figures.length - 1]);

		newFigures[promotingSquare.num][promotingSquare.letter] = '';
		newFigures[promotingSquare.x][promotingSquare.y] = color + option;

		dispatch(clearCandidates());

		const newMove = getNewMoveNotation({
			...promotingSquare,
			figure: color + 'p',
			promotesTo: option,
			figures: game.figures[game.figures.length - 1]
		});

		dispatch(makeNewMove({newFigures, newMove}));
	}

	return (
		<div className='popup--inner promotion-choices' style={getPromotionBoxPosition()}>
			{options.map(option => 
				<div 
					key={option}
					className={`figure ${color}${option}`}
					onClick={() => onClick(option)}>
				</div>
			)}
		</div>
	);
};

export default PromotionBox;