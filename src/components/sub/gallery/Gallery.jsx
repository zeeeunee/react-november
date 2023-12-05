import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { IoSearch } from 'react-icons/io5';

export default function Gallery() {
	console.log('re-render');
	const myID = useRef('199697926@N08'); //1-참조객체에 내 아이디값 등록

	const isUser = useRef(myID.current); //isUser의 초기값을 내 아이디 문자값으로 등록
	const refNav = useRef(null);
	const [Pics, setPics] = useState([]);

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		//Interest함수 호출시 isUser값을 빈문자열로 초기화 (false로 인식되는 값)
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = (e) => {
		//콕 찍어서 isUser의 값과 myID값이 동일할때만 함수 중지
		//마이갤러리 함수 호출시에는 isUser의 문자값이 담겨있다고 하더라도 내 아이디와 똑같지 않으면 핸들러함수를 실행하게 처리
		//다른 사용자 갤러리를 갔다가 다시 myGallery호출시 이미 다른 사용자 유저 id가 담겨있기 때문에 내 갤러리가 호출되지 않는 문제를 해결하기 위함
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = (e) => {
		//isUser값이 비어있기만 하면 중지
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = (e) => {
		//기본 submit이벤트는 전송기능이기 때문에 무조건 화면이 새로고침됨
		//전송을 할것이 아니라 리액트로 추가 로직구현을 할것이므로 기본 전송기능 막음
		e.preventDefault();
		const keyword = e.target.children[0].value;
	};

	const fetchFlickr = async (opt) => {
		const num = 100;
		const flickr_api = process.env.REACT_APP_YOUTUBE_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';

		const interestURL = `${baseURL}${method_interest}`;

		//3- userURL에는 user_id를 상수값이 아닌 호출시점에 전달된 opt객체의 id로 등록해서 URL생성
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;

		let url = '';

		//4- 만들어진 URL로 데이터요청
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();

		setPics(json.photos.photo);
	};

	useEffect(() => {
		//2-처음 컴포넌트 마운트시 타입을 user로 지정하고 id값으로 내 아이디등록
		fetchFlickr({ type: 'user', id: myID.current });
		//fetchFlickr({ type: 'interest' });
		//fetchFlickr({ type: 'search', keyworld: 'landscape' });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet' ref={refNav}>
					<button onClick={handleInterest}>Interest Gallery</button>
					<button className='on' onClick={handleMine}>
						My Gallery
					</button>
				</nav>
				<form onSubmit={handleSearch}>
					<input type='text' placeholder='Search' />
					<button className='btnSearch'>
						<IoSearch />
					</button>
				</form>
			</article>
			<section>
				<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic) => {
						return (
							<article key={pic.id}>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
									/>
								</div>
								<h2>{pic.title}</h2>

								<div className='profile'>
									<img
										src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
										alt='사용자프로필이미지'
										onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
									/>
									<span onClick={handleUser}>{pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout>
	);
}
