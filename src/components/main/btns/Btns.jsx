import Anime from '../../../asset/anime';
import { useEffect, useRef, useState } from 'react';
import './Btns.scss';
import { useThrottle } from '../../../hooks/useThrottle';

//window.scrollY : 브라우저를 스크롤 할때마다 스크롤 되고 있는 거리값 (동적)
//DOM.scrollTop : DOM요소안쪽에서 스크롤할때마다 스크롤되고 있는 거리값 (동적)
//DOM.offsetTop : 문서에서 해당 돔요소의 세로 위치값 (정적)

export default function Btns() {
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2); //현재 섹션의 컨텐츠가 절반이상 보여야지 스크롤 활성화 처리

	const activation = () => {
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
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

	const moveScroll = idx => {
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { duration: 500 });
	};

	const autoScroll = e => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		//현재 활성화된 버튼의 순번구함
		const activeIndex = btnsArr.indexOf(activeEl);

		//휠 다운시
		if (e.deltaY > 0) {
			console.log('wheel down');
			//현재순번이 마지막순번이 아니면 다음순번 섹션위치로 모션이동
			activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
		} else {
			//휠 업시
			console.log('wheel up');
			//현재순번이 첫번째순번이 아니면 이전순번 섹션 위치로 모션이동
			activeIndex !== 0 && moveScroll(activeIndex - 1);
		}
	};
	const throttledActivation = useThrottle(activation);
	//스크롤 되는 횟수 줄이기

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = wrap.current.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('mousewheel', autoScroll);
		wrap.current.addEventListener('scroll', throttledActivation);
		return () => {
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledActivation]);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === 0 ? 'on' : ''}
							onClick={() => {
								moveScroll(idx);
							}}></li>
					);
				})}
		</ul>
	);
}
