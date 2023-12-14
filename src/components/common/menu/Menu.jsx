import './Menu.scss';
import { useCallback, useEffect, useRef } from 'react';

export default function Menu({ setToggle }) {
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setToggle(false);
	}, [setToggle]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);

	return (
		<aside className='Menu'>
			<h1>Mobile Menu</h1>
		</aside>
	);
}
