import Anime from '../../../asset/anime';
import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

//window.scrollY : 브라우저를 스크롤 할때마다 스크롤 되고 있는 거리값 (동적)
//DOM.scrollTop : DOM요소안쪽에서 스크롤할때마다 스크롤되고 있는 거리값 (동적)
//DOM.offsetTop : 문서에서 해당 돔요소의 세로 위치값 (정적)

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);

	const activation = () => {
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
		/*
		if (scroll >= secs.current[0].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[0].classList.add('on');
		}
		if (scroll >= secs.current[1].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[1].classList.add('on');
		}
		if (scroll >= secs.current[2].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[2].classList.add('on');
		}
		if (scroll >= secs.current[3].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[3].classList.add('on');
		}
    */
	};

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', activation);
		return () => wrap.current.removeEventListener('scroll', activation);
	}, []);
	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { duration: 500 });
							}}></li>
					);
				})}
		</ul>
	);
}
