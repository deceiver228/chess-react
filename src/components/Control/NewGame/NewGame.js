import { useDispatch } from "react-redux";
import { setupNewGame } from "../../../services/actions/game";
import { closePromotion } from "../../../services/actions/popup";

const NewGame = () => {
	const dispatch = useDispatch();
	
	const onNewGame = () => {
		dispatch(setupNewGame());
		dispatch(closePromotion());

	}
	return (
		<div className="newGame">
			<button onClick={onNewGame}>
				New Game
			</button>		
		</div>
	);
};

export default NewGame