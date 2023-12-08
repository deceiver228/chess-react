import { getCode } from '../../../utils/getCode';
import './Letters.css';

const Letters = ({letters}) => {
	return (
		<div className="letters">
			{letters.map(letter => <span key={letter}>{getCode(letter)}</span>)}
		</div>
	);
};

export default Letters;