import React from 'react';
import { Status } from '../../constants';
import { closePromotion } from '../../services/actions/popup';
import './Popup.css';
import { useDispatch, useSelector } from 'react-redux';

const Popup = ({children}) => {
	const status = useSelector(store => store.game.status);
	const dispatch = useDispatch();

	if (status === Status.ongoing)
		return null;

	const onClosePromotion = () => {
		dispatch(closePromotion());
	}
 // внутри дива 'popup' прокидка пропсов в каждого из его возможных детей <promotionbox/> и <gameends/> как <gameends onClosePromotion={onClosePromotion}/>
	return (
		<div className='popup'>
			{
				React.Children
				.toArray(children)
				.map(child => React.cloneElement(child, {onClosePromotion}))
			} 
		</div>
	);
};

export default Popup;