import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';

export default function Pics() {
	const [Frame, setFrame] = useState(null);
	const thisEl = useRef(null);
	const titEl = useRef(null);
	const titEl2 = useRef(null);
	const { getCurrentScroll } = useScroll(Frame);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(thisEl.current, -window.innerHeight / 2);

		if (scroll >= 0) {
			titEl.current.style.transform = `translateX(${scroll}px)`;
			titEl.current.style.opacity = 1 - scroll / 800;
			titEl2.current.style.transform = ` scale(${1 + scroll / 400}) translateX(${scroll}px)`;
			titEl2.current.style.opacity = 1 - scroll / 500;
		}
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
			<h3 className='tit' ref={titEl}>
				FLICKR
			</h3>
			<h4 className='tit2' ref={titEl2}>
				PREVIEW
			</h4>
		</section>
	);
}
