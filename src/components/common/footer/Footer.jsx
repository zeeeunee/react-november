import { useSelector } from 'react-redux';
import './Footer.scss';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
//npm i react-icons 로 아이콘설치해서 적용하기

export default function Footer() {
	const { name, position } = useSelector(store => store.memberReducer.members[0]);
	return (
		<footer className='Footer'>
			<h1>Zeeeunee</h1>
			<p>2023 Zeeeunee &Copy; All Rights Reserved.</p>
			<h2>
				{position}:{name}
			</h2>
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
		</footer>
	);
}
