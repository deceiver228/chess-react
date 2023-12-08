import './MovesList.css';
import { useSelector } from 'react-redux';

const MovesList = () => {
	const movesList = useSelector(store => store.game.movesList)
	console.log(movesList)
	// (i / 2) + 1 для того чтобы ходы записывались по 2 на 1 строчке
	return (
		<div className="moves-list">
			{movesList?.map((move, i) => 
				<div key={i} data-number={Math.floor((i / 2) + 1)}> 
					{move}
				</div>
			)}
		</div>
	);
};

export default MovesList;