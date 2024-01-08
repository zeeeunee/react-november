import Anime from '../asset/anime';
import { useState, useEffect, useRef } from 'react';

export function useScroll() {
	//순서1 - 커스텀훅 안쪽에서 자체적으로 빈 참조객체 생성
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = (baseLine = 0) => {
		const scroll = Frame.scrollTop - baseLine;
		//순서5- 부모컴포넌트에서 참조객체 연결된 값을 hook내부적으로 활용
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	//순서2 - 부모에서 해당 참조객체를 활용하도록 리턴
	return { scrollTo, getCurrentScroll, Frame, refEl };
}
