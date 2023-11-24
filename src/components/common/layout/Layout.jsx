import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);

	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle.current, title);
		refFrame.current.classList.add('on');
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{/*Layout컴포넌트로 감싼 컨텐츠 내용이 아래 children위치에 출력됨 */}
			{children}
		</main>
	);
}
