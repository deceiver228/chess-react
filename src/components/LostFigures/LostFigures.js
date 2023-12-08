import './LostFigures.css';

const LostFigures = ({title, figures}) => {
	return (
		<div className='lost'>
			{figures?.map((f, i) =>
				<div className={`lost-figure ${f}`} key={i}/>
			)}
		</div>
	);
};

export default LostFigures;