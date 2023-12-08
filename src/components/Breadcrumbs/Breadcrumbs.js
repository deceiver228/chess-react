import './Breadcrumbs.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeRemainingCrumbs } from '../../utils/breadcrumbs';

const Crumb = ({url, title, path}) => {
	const navigate = useNavigate();
	const {state, pathname} = useLocation();
	const navigateTo = e => {
		e.preventDefault();
		navigate(path, {replace: true, state: removeRemainingCrumbs(state, url)});
	};
	return (
		<span className='crumb'>
			{path === pathname ? (title) : (
				<>
					<a href={url} onClick={navigateTo}>
						{title}
					</a>
				</>
			)}
		</span>
	);
}
const Breadcrumbs = () => {
	const { state } = useLocation();
	if (state) {
		return (
			<div>
				{state.map(crumb => (
					<Crumb {...crumb} key={crumb.url} />
				))}
			</div>
		);
	}
	return null;
};

export default Breadcrumbs;