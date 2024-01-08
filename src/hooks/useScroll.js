import Anime from '../asset/anime';
import { useState, useEffect, useRef, useCallback } from 'react';

//순서3 - 부모컴포넌트로 커스텀스크롤 함수를 파라미터를 통해 내부로 전달
export function useScroll(customHandler) {
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);

	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = useCallback(
		(baseLine = -window.innerHeight / 2) => {
			const scroll = Frame.scrollTop - baseLine;
			const modifiedScroll = scroll - refEl.current?.offsetTop;
			return modifiedScroll;
		},
		[Frame]
	);

	//순서4- 전달받은 커스텀스크롤 함수를 내부에 있는 handleScroll함수 안쪽에 호출에서
	//내부적으로 getCurrentScroll값이 반환하고 있는 스크롤값과 연동시켜줌
	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		if (scroll >= 0) customHandler(scroll);
	}, [getCurrentScroll, customHandler]);

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	//순서5- 해당 커스텀훅을 호출하고 있는 부모 컴포넌트가 마운트시 handleScroll함수에 scoll이벤트 연결
	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return { scrollTo, getCurrentScroll, Frame, refEl };
}
