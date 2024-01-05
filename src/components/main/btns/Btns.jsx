import Anime from '../../../asset/anime';
import { useCallback, useEffect, useRef, useState } from 'react';
import './Btns.scss';
import { useThrottle } from '../../../hooks/useThrottle';

//window.scrollY : 브라우저를 스크롤 할때마다 스크롤 되고 있는 거리값 (동적)
//DOM.scrollTop : DOM요소안쪽에서 스크롤할때마다 스크롤되고 있는 거리값 (동적)
//DOM.offsetTop : 문서에서 해당 돔요소의 세로 위치값 (정적)

export default function Btns(opt) {
	const defOpt = useRef({ frame: '.wrap', items: '.myScroll', base: -window.innerHeight / 2, isAuto: false });
	const resultOpt = useRef({ ...defOpt.current, ...opt });
	const [Num, setNum] = useState(0);

	const secs = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(resultOpt.current.base); //현재 섹션의 컨텐츠가 절반이상 보여야지 스크롤 활성화 처리
	const isMotion = useRef(false); //isMotion.current값이 true면 모션중이므로 재실행방지, false면 모션중이 아니므로 재실행가능
	const isAutoScroll = useRef(resultOpt.current.isAuto); //false면 autoScroll 작동안함 (개발자가 autoScroll기능을 할건지말건지 정하는거)

	const activation = () => {
		const scroll = wrap.current?.scrollTop;

		secs.current.forEach((_, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				//아래 구문에서 children이 아닌 querySelectorAll을 써야 되는 이유
				//children(HTMLCollections반환 LiveDOM) vs querySelectorAll(NodeList반환, Static DOM)
				//버튼 li요소를 Btns컴포넌트 마운트시 동적으로 생성하기 때문에
				//만약 컴포넌트 unmounted시 querySelector로 찾은 NodeList는 optionial chaining 처리가능하나
				//children으로 구한 HTMLCollection은 실시간으로 DOM의 상태값을 추적하기 떄문에 optional chaining처리 불가
				const btnsArr = btns.current?.querySelectorAll('li');
				btnsArr?.forEach(btn => btn.classList.remove('on'));
				btns.current?.querySelectorAll('li')[idx]?.classList.add('on');
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
		//초기값이 false이므로 처음 한번은 해당 조건문이 무시되면서 아래 코드실행됨
		if (isMotion.current) return;
		//조건문을 통과하자마자 바로 값을 true로 변경해서 다음부터는 재호출 안되도록 막음
		isMotion.current = true;
		console.log('move');
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { callback: () => (isMotion.current = false) });
		//모션함수가 실행되고 모션이 끝나는 순간 실행되는 callback으로 다시 isMotion.current값을 false로 변경해서 재실행 가능케 설정
		//결론 isMotion.current값을 이용해서 모션중에는 중복 함수호출 불가능하도록 모션중 재이벤트방지 처리
	};

	const autoScroll = useCallback(
		e => {
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
		},
		[Num]
	);

	//화면 리사이즈시 스크롤 위치값 보정처리
	const modifyPos = () => {
		console.log('modify');
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		wrap.current.scrollTop = secs.current[activeIndex].offsetTop;
	};

	const throttledActivation = useThrottle(activation);
	//스크롤 되는 횟수 줄이기
	const throttledModifyPos = useThrottle(modifyPos, 200); //gap=200 (1초에 5번호출되게)

	useEffect(() => {
		wrap.current = document.querySelector(resultOpt.current.frame);
		secs.current = wrap.current.querySelectorAll(resultOpt.current.items);
		setNum(secs.current.length);

		window.addEventListener('resize', throttledModifyPos);
		wrap.current.addEventListener('scroll', throttledActivation);
		isAutoScroll.current && wrap.current.addEventListener('mousewheel', autoScroll);
		return () => {
			window.removeEventListener('resize', throttledModifyPos);
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledActivation, autoScroll, throttledModifyPos, resultOpt.current.frame, resultOpt.current.items]);

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
