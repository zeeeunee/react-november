import { useEffect, useRef, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';

export default function Pics() {
	const { scrollFrame, getCurrentScroll } = useScroll();
	const [Scrolled, setScrolled] = useState(0);

	const thisEl = useRef(null);
	const boxEl = useRef(null);

	useEffect(() => {
		scrollFrame?.addEventListener('scroll', () => {
			setScrolled(getCurrentScroll(thisEl.current));
			if (Scrolled >= 0) boxEl.current.style.transform = `translateX(${Scrolled}px)`;
		});
	}, [scrollFrame, getCurrentScroll]);
	return (
		<section className='Pics myScroll' ref={thisEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
