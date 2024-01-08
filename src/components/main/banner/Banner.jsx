import { useEffect, useState, useRef, useCallback } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const refBanner = useRef(null);
	const boxEl = useRef(null);

	const { getCurrentScroll, Frame } = useScroll();

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(refBanner.current, -window.innerHeight / 2);
		if (scroll >= 0) {
			boxEl.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
			boxEl.current.style.opacity = 1 - scroll / 400;
		}
	}, [getCurrentScroll]);

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
