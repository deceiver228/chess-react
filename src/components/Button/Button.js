import './Button.css';

const Button = ({ primary, secondary, ...props }) => {
	return (
		<button {...props} className={`button ${primary ? `primary` : `secondary`}`}>
			{props.children}
		</button>
	);
};

export default Button;