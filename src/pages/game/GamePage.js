import React from 'react';
import LostFigures from '../../components/LostFigures/LostFigures';
import Control from '../../components/Control/Control';
import Board from '../../components/Board/Board';
import MovesList from '../../components/Control/MovesList/MovesList';
import TakeBack from '../../components/Control/TakeBack/TakeBack';
import NewGame from '../../components/Control/NewGame/NewGame';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GamePage = () => {
	const {lostWhiteFigures, lostBlackFigures} = useSelector(store => store.game);
	const isAuth = useSelector(store => store.auth);
	return !isAuth.token ? <Navigate to='/login'/> : (
		<div className='board-inner'>
			<LostFigures title={`White figures`} figures={lostBlackFigures}/>
			<Board/>
			<Control>
				<MovesList/>
				<TakeBack/>
				<NewGame/>
			</Control>
			<LostFigures title={`Black figures`} figures={lostWhiteFigures}/>
		</div>
	);
};

export default GamePage;