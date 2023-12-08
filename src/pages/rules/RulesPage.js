import React from 'react';
import './RulesPage.css';

const RulesPage = () => {
	return (
		<div className='container'>
			<div className='rules'>
				<h1 className='rules-title'>Правила шахмат: </h1>
				<iframe className='rules-video' width="560" height="315" src="https://www.youtube.com/embed/a-I58LCBSnU?si=2nAfo5_TIxf6-fgU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			</div>
		</div>
	);
};

export default RulesPage;