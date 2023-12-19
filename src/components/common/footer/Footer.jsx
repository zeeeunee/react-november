import './Footer.scss';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
//npm i react-icons 로 아이콘설치해서 적용하기

export default function Footer() {
	return (
		<footer className='Footer'>
			<h1>Zeeeunee</h1>
			<p>2023 Zeeeunee &Copy; All Rights Reserved.</p>
			<ul>
				<li>
					{/* 외부 링크 연결시 일반 a태그 처리 rel=noopener noreferrer 속성 추가해서 window객체에 이전 리액트 컴포넌트의 정보를 참조못하게 처리 */}
					<a href='https://www.facebook.com' target='_self' rel='noopener noreferrer'>
						<FaFacebook />
					</a>
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaInstagram />
				</li>
			</ul>
		</footer>
	);
}
