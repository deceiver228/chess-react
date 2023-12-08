import { forwardRef } from 'react';
import './MenuItem.css';

const MenuItem = forwardRef((props, ref) => {
		const {active, disabled, children, ...resizeTo} = props;
		const className = `menu-item
			${disabled ? " disabled" : ""} 
			${active ? " active" : ""}`;
	return (
		<div ref={ref} className={className} disabled={disabled} active={active}>
			{props.children}
		</div>
	)
})

export default MenuItem;