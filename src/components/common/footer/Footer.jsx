import { useCookie } from '../../../hooks/useCookie';
import './Footer.scss';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
//npm i react-icons 로 아이콘설치해서 적용하기

export default function Footer() {
	const { setCookie, isCookie, viewCookie } = useCookie();

	return (
		<footer className='Footer'>
			<h1>Zeeeunee</h1>
			<p>2023 Zeeeunee &Copy; All Rights Reserved.</p>
			<ul>
				<li>
					<FaFacebook />
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaInstagram />
				</li>
			</ul>
			<button onClick={() => setCookie('today', 'done', 60 * 60)}>쿠키생성</button>
			<button onClick={() => setCookie('today', 'done', 0)}>쿠키삭제</button>
			<button onClick={() => console.log(isCookie('today=done'))}>쿠키확인</button>
			<button onClick={() => viewCookie()}>모든 쿠키 보기</button>
		</footer>
	);
}
