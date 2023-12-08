import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import GamePage from './pages/game/GamePage';
import RulesPage from './pages/rules/RulesPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';


function App() {
	return (
		<BrowserRouter basename="/">
			<div className="App">
				<Header/>
				<main>
					<Routes>
							<Route path="/" element={<GamePage/>} exact/>
							<Route path="/rules" element={<RulesPage/>} exact/>
							<Route path="/register" element={<RegisterPage/>} exact/>
							<Route path="/login" element={<LoginPage/>} exact/>
					</Routes>
				</main>
				<Footer/>
			</div>
		</BrowserRouter>
	);
}

export default App;
