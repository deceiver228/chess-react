import './Dropdown.css';
import { setHlMenuItem, toogleMenu,onChangeMenuItem, setCoords } from '../../../services/actions/menu';
import React, { Children, cloneElement, isValidElement, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

const Dropdown = (props) => {
	const {label, children} = props;
	
	const {isMenuOpen, coords, highlightedIndex} = useSelector(store => store.menu);
	const dispatch = useDispatch();
	
	const elements = useRef({});
	const controlRef = useRef(null);

const getCoords = () => {
		const box = controlRef.current?.getBoundingClientRect();
		if (box) {
			return {
				left: box.left,
				top: box.top + box.height,
				width: box.width,
			};
		}
		return null;
	};


	useEffect(() => { // 
		if (!isMenuOpen) return;

		const coords = getCoords();
		dispatch(setCoords(coords));
	}, [isMenuOpen]);

	// const length = Children.count(children);

	const items = useMemo(() => Children.toArray(children), [children]);
	const indexes = useMemo(() => (
		items.reduce((result, item, index) => {
			if (React.isValidElement(item)) {
				if (!item.props.disabled) { // + && item.type === MenuItem
				result.push(index)
			}
		}

		return result;
		}, [])
	), [items]);


	const handleKeyDown = async (ev) => {
		switch (ev.code) {
			case 'ArrowDown':
				ev.preventDefault();
				ev.stopPropagation();
				dispatch(setHlMenuItem(highlightedIndex => {
					const index = highlightedIndex === indexes.length - 1 ? 0 : highlightedIndex + 1;
					return index;
				}));
				break;
			case 'ArrowUp': {
				ev.preventDefault();
				ev.stopPropagation();
				dispatch(setHlMenuItem(highlightedIndex => {
					const index = highlightedIndex === 0 ? indexes.length - 1 : highlightedIndex - 1;
					return index;
				}));
				break;
			}
			case 'Enter': {
				ev.preventDefault();
				ev.stopPropagation();
				const item = items[indexes[highlightedIndex]];
				if (highlightedIndex !== -1 && isValidElement(item)) {
					handleChange(item.props.value);
				}
				break;
			}
		}
	}

	useEffect(() => {
		return () => isMenuOpen
			? document.addEventListener('keydown', handleKeyDown, true)
			: document.removeEventListener('keydown', handleKeyDown, true);
	}, [isMenuOpen]);

	const handleOpen = () => {
		dispatch(toogleMenu());
	};
	const handleChange = item => {
		dispatch(onChangeMenuItem(item));
		dispatch(toogleMenu());
	}	

	return (
		<div className="menu menu-inner">
			<button ref={controlRef} onClick={handleOpen} className='menu-btn' type='button'
				style={{
				left: `${p => `${p.coords.left}px`}`,
				top: `${p => `${p.coords.top}px`}`,
				minWidth: `${p => `${Math.max(150, p.coords.width)}px`}`}}> {label}
			</button>
			{
				isMenuOpen && coords &&	 createPortal(
					<>
						<div className='backdrop' onClick={() => dispatch(toogleMenu())}/>
						<div className='menu'>
							{
								Children.map(children, (child, index) => {
									if (isValidElement(child)) {
										return cloneElement(child, {
											active: index === indexes[highlightedIndex],
											onMouseEnter: () => dispatch(setHlMenuItem(indexes.indexOf(index))),
											ref: (node) => {
												elements.current[index] = node;
											},
											onClick: (ev) => {
												ev.stopPropagation();
												handleChange(child.props.value);
											}
										})
									}
								})
							}
						</div>
					</>, document.body)
			}
		</div>
	)
}

export default Dropdown;