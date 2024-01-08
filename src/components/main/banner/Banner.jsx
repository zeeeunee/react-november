import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';
export default function Banner() {
	const boxEl = useRef(null);

	//순서1 - useScroll훅으로 전달한 해당 컴포넌트에서의 커스텀스크롤 함수 정의
	const customHandleScroll = scroll => {
		boxEl.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
		boxEl.current.style.opacity = 1 - scroll / 400;
	};

	//순서2- 커스텀스크롤 함수를 useScroll호출시 인수로 전달
	const { refEl } = useScroll(customHandleScroll);

	return (
		<section className='Banner myScroll' ref={refEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
