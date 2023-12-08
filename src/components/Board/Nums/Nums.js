import './Nums.css';

const Nums = ({nums}) => {
	return (
		<div className="nums">
			{nums.map(num => <span key={num}>{num}</span>)}
		</div>
	);
};

export default Nums;