import './RegisterPage.css';
import Input from "../../components/Input/Input";
import PasswordInput from '../../components/Input/PasswordInput';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authSuccess } from '../../services/actions/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(store => store.auth);

	const [form, setForm] = useState({email: '', password: ''});
	const onChange = e => setForm({...form, [e.target.name]: e.target.value});
	let register = e => {
		e.preventDefault();

		const auth = getAuth();
		console.log(auth);
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then(({user}) => {
				console.log(user.email)
				dispatch(authSuccess({
					email: user.email,
					id: user.uid,
					token: user.accessToken
				}))
				setForm({email: '', password: ''})
				navigate('/');
			})
			.catch(console.error)
	};
	return isAuth.token ? <Navigate to="/"/> : (
		<div className="login-wrapper">
			<div className="login">
				<form className="form">
					<h1>Регистрация</h1>
					<Input placeholder="DemiMyruch@gmail.com" name="email" onChange={onChange} />
					<PasswordInput
						placeholder="Password"

						name="password"
						onChange={onChange}
					/>
					<Button primary onClick={register}>Зарегистрироваться</Button>
					<h2>Есть аккаунт? Go <Link to="/login">login</Link></h2>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;