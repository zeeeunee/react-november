import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';

export default function Pics() {
	const [Frame, setFrame] = useState(null);
	const thisEl = useRef(null);
	const boxEl = useRef(null);
	const { getCurrentScroll } = useScroll(Frame);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(thisEl.current, -window.innerHeight / 2);

		scroll >= 0 && (boxEl.current.style.transform = `translateX(${scroll}px)`);
	}, [getCurrentScroll]);
	useEffect(() => {
		setFrame(thisEl.current?.closest('.wrap'));
	}, []);
	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);
	return (
		<section className='Pics myScroll' ref={thisEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
