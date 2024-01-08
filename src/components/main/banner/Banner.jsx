import { useEffect, useRef, useCallback } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const boxEl = useRef(null);

	//순서3 - 커스텀훅 호출시 useScroll이 제공하고 있는 빈참조객체 가져옴
	const { getCurrentScroll, Frame, refEl } = useScroll();

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(-window.innerHeight / 2);
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
		//순서4- 원하는 요소에 빈 참조객체 연결
		<section className='Banner myScroll' ref={refEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
