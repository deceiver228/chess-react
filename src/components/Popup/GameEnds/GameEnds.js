import { useDispatch, useSelector } from 'react-redux';
import { Status } from '../../../constants';
import { setupNewGame } from '../../../services/actions/game';
import './GameEnds.css';

const GameEnds = ({onClosePromotion}) => {
	const {status} = useSelector(store => store.game);
	const dispatch = useDispatch();

	if (status === Status.ongoing || status === Status.promoting)
		return null;

	const isWin = status?.endsWith('wins');

	const newGame = () => {
		dispatch(setupNewGame());
	}
	
	// css с фигурой на div с cN={status}
	return (
		<div className='popup--inner popup--inner__center'>
			<h1>{isWin ? status : 'Draw'}</h1>
			<p>{!isWin && status}</p>
			<div className={`${status}`}/>
			<button onClick={newGame}>New Game</button>
		</div>
	);
};

export default GameEnds;