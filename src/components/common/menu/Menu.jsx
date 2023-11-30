import { useEffect } from 'react';
import './Menu.scss';

export default function Menu({ setToggle }) {
	const closeMenu = () => {
		window.innerWidth >= 1000 && setToggle(false);
	};

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, []);
	return (
		<aside class Name='Menu'>
			Mobile Menu
		</aside>
	);
}
