import Anime from '../asset/anime';
import { useRef, useEffect } from 'react';

export function useScroll(frame = '.wrap') {
	//선택자로 스크롤을 제어해야 되는 루트컴포넌트의 클래스명을 받아 DOM요소를 참조객체에 연결
	const scrollFrame = useRef(null); //스크롤이벤트가 발생하는 프레임요소

	//특정targetPos위치값으로 스크롤이동하는 함수 정의
	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	//실시간 scroll값 반환 메서드
	const getCurrentScroll = () => {
		const scroll = scrollFrame.current.scrollTop;
		return scroll;
	};

	//컴포넌트 마운트시 frameRef에 선택자 담기
	useEffect(() => {
		scrollFrame.current = document.querySelector(frame);
	}, [frame]);

	//scrollTo함수를 비구조화할당으로 뽑아내기 위해서 객체로 묶어서 반환
	return { scrollTo, getCurrentScroll, scrollFrame };
}
