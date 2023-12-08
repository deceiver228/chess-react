import './Board.css';
import Figures from '../Figures/Figures';
import Letters from './Letters/Letters';
import Nums from './Nums/Nums';
import Popup from '../Popup/Popup';
import arbiter from '../../arbiter/arbiter';
import { getKingPosition } from '../../arbiter/getMoves';
import PromotionBox from '../Popup/PromotionBox/PromotionBox';
import GameEnds from '../Popup/GameEnds/GameEnds';
import { useSelector } from 'react-redux';

const Board = () => {

	const nums = Array(8).fill().map((_, i) => 8 - i);
	const letters = Array(8).fill().map((_, i) => i + 1);

	const game = useSelector(store => store.game)

	const figures = game.figures[game.figures?.length - 1]

	const isChecked = (() => {
		const isInCheck = arbiter.isPlayerInCheck({
			figuresAfterMove: figures,
			player: game.turn
		})
		if (isInCheck)
			return getKingPosition(figures, game.turn);
		return null;
	})(); // чтобы вызвать это единожды за рендер


	const getClassName = (i, j) => { // класснеймы для css вешаются на cells, а не на figures
		let c = 'cell ';
		c += (i + j) % 2 === 0 ? 'cell--black ' : 'cell--white ';

		if (game.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
			if (figures[i][j])
				c += 'attacking ';
			else
				c += 'highlight ';
		}
	
		if (isChecked && isChecked[0] === i && isChecked[1] === j)
			c += 'checked';
		if (game.lastMoveList?.length > 0) {
			let last = game.lastMoveList[game.lastMoveList.length - 1];
			if ((i === last[0] && j === last[1]) || (i === last[2] && j === last[3]))
				c += 'last-move';
		}
		return c;
	}

	return <div className='board'>
			<Nums nums={nums}/>
			<div className='cells'>
				{nums.map((num, i) => 
					letters.map((letter, j) =>
						<div 
							key={num + '-' + letter}
							className={`${getClassName(7 - i, j)} `}>
						</div>
					)
				)}
			</div>

			<Figures/>

			<Popup>
				<PromotionBox/>
				<GameEnds/>
			</Popup>

			<Letters letters={letters}/>
	</div>
}

export default Board;