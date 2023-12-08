import './Form.css';

const Form = ({children, ...props}) => {
	return (
		<form noValidate {...props}>
			{children}
		</form>
	);
};

export default Form;