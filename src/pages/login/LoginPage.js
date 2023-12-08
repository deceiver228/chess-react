import './LoginPage.css';
import Input from "../../components/Input/Input";
import PasswordInput from '../../components/Input/PasswordInput';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSuccess } from '../../services/actions/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(store => store.auth);

	const [form, setForm] = useState({email: '', password: ''});
	const [invalid, setInvalid] = useState(false);
	const onChange = e => setForm({...form, [e.target.name]: e.target.value});

	let login = e => {
		e.preventDefault();

		let auth = getAuth();
		signInWithEmailAndPassword(auth, form.email, form.password)
			.then(({user}) => {
				dispatch(authSuccess({
					email: user.email,
					id: user.uid,
					token: user.accessToken
				}))
				setForm({email: '', password: ''});
				navigate('/');
			})
			.catch(() => {
				setInvalid(!invalid)
			});
	};
	return isAuth.token ? <Navigate to="/"/> : (
		<div className="login-wrapper">
			<div className="login">
				<form className="form">
					<h1>Логин</h1>
					<Input placeholder="DemiMyruch@gmail.com" name="email" onChange={onChange} />
					<PasswordInput
						placeholder="Password"

						name="password"
						onChange={onChange}
					/>
					{invalid ? <h3>Incorrect data</h3> : null}
					<Button primary onClick={login}>Войти</Button>
					<h2>Нет аккаунта? Go <Link to="/register">reg</Link></h2>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;