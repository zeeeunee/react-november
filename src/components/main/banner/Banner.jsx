import './Banner.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Banner() {
	const [Frame, setFrame] = useState(null);
	const refBanner = useRef(null);
	const boxEl = useRef(null);

	const { getCurrentScroll } = useScroll(Frame);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(refBanner.current, -window.innerHeight / 2);
		if (scroll >= 0) {
			boxEl.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
			boxEl.current.style.opacity = 1 - scroll / 400;
		}
	}, [getCurrentScroll]);

	useEffect(() => {
		setFrame(refBanner.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		<section className='Banner myScroll' ref={refBanner}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
