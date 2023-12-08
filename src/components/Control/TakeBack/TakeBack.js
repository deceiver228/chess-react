import { useDispatch, useSelector } from "react-redux";
import { takeBack, removeLostFigure } from "../../../services/actions/game";
import { closePromotion } from "../../../services/actions/popup";

const TakeBack = () => {
	const dispatch = useDispatch();
	const movesList = useSelector(store => store.game.movesList);

	const onTakeBack = () => {
		dispatch(takeBack());
		dispatch(closePromotion());

		if (movesList[movesList.length - 1]?.includes('x')) {
			dispatch(removeLostFigure())
		}
	}
	return (
		<div className="takeBack">
			<button onClick={onTakeBack}>
				Take back
			</button>		
		</div>
	);
};

export default TakeBack;