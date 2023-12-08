import { useState } from 'react';
import eye from '../../assets/form/eye-show.svg';
import eyeHide from '../../assets/form/eye-hide.svg';
import Input  from './Input';

const Eye = props => <img src={eye} alt="eye" onClick={props.onClick}/>
const EyeHide = props => <img src={eyeHide} alt="eye-hide" onClick={props.onClick}/>

const PasswordInput = (props) => {
	const [isHide, setHide] = useState(true);

	return (
		<Input {...props} type={isHide ? "password" : "text"} icon={isHide ? EyeHide : Eye} onIconClick={() => setHide(!isHide)}/>
	);
};

export default PasswordInput;