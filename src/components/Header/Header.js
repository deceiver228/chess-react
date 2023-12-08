import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/header/game.svg'; 
import Dropdown from './Menu/Dropdown';
import MenuItem from './Menu/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../services/actions/auth';

const Header = () => {
	const items = [
		{label: 'Главная', value: 1},
		{label: 'Играть', value: 2},
		{label: 'Войти', value: 3},
		{label: 'О нас', value: 4},
		{label: 'Правила', value: 5},
		{label: 'Дебюты', value: 6}
	];
	const dispatch = useDispatch();
	const isAuth = useSelector(store => store.auth.email);

	console.log(isAuth)

	return (
		<header className='header'>
			<nav className='nav'>
				<Dropdown label='Menu' onChange={item => console.log(item)}>
					{
						items.map(item => (
						<MenuItem key={item.value} value={item}>
							{item.label}
						</MenuItem>
						))
					}
				</Dropdown>
				<NavLink to="/" className="nav item nav-logo">
				</NavLink>

				<NavLink to="/rules" className="nav-item">
					<img src={logo} alt="rules"/>
					<span>Правила шахмат</span>
				</NavLink>
				{isAuth ? 
					<>
						<NavLink to="/profile" className="nav-item">
							<img src={logo} alt="profile"/>
							<span>Личный кабинет</span>
						</NavLink>
						<NavLink to="/" className="nav-item" onClick={() => dispatch(authLogout())}>
							<img src={logo} alt="main"/>
							<span>Выйти</span>
						</NavLink>
					</>
					:
					<>
						<NavLink to="/login" className="nav-item">
							<img src={logo} alt="login"/>
							<span>Войти</span>
						</NavLink>
						<NavLink to="/register" className="nav-item">
							<img src={logo} alt="register"/>
							<span>Зарегистрироваться</span>
						</NavLink>
					</>
				}
			</nav>
		</header>
	);
};

export default Header;