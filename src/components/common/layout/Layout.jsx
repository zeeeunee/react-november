import './Layout.scss';

export default function Layout({ children }) {
	return (
		<main className='Layout'>
			<h1>Title</h1>
			<div className='bar'></div>
			{/*Layout컴포넌트로 감싼 컨텐츠 내용이 아래 children위치에 출력됨 */}
			{children}
		</main>
	);
}
