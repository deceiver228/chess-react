import './Input.css';

const Input = ({
	icon: Icon,
	onIconClick,
	value,
	placeholder,
	onChange,
	type,
	...props
}) => {
	const icon = Icon ? <Icon onClick={onIconClick} /> : null;
	return (
		<div className="input-wrapper">
			<input
				autoComplete="off"
				className="input"
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				{...props}
			/>
			{icon}
		</div>
	);
};

export default Input;