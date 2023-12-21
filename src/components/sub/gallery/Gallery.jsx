import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { IoSearch } from 'react-icons/io5';
import Modal from '../../common/modal/Modal';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../../../redux/modalSlice';

export default function Gallery() {
	const dispatch = useDispatch();
	console.log('re-render');
	const myID = useRef('199697926@N08'); //1-참조객체에 내 아이디값 등록

	const isUser = useRef(myID.current); //isUser의 초기값을 내 아이디 문자값으로 등록
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);

	const gap = useRef(20);

	//검색함수가 실행됐는지를 확인하기 위한 참조객체
	const searched = useRef(false);

	const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		//Interest함수 호출시 isUser값을 빈문자열로 초기화 (false로 인식되는 값)
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = e => {
		//콕 찍어서 isUser의 값과 myID값이 동일할때만 함수 중지
		//마이갤러리 함수 호출시에는 isUser의 문자값이 담겨있다고 하더라도 내 아이디와 똑같지 않으면 핸들러함수를 실행하게 처리
		//다른 사용자 갤러리를 갔다가 다시 myGallery호출시 이미 다른 사용자 유저 id가 담겨있기 때문에 내 갤러리가 호출되지 않는 문제를 해결하기 위함
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = e => {
		//isUser값이 비어있기만 하면 중지
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = e => {
		//기본 submit이벤트는 전송기능이기 때문에 무조건 화면이 새로고침됨
		//전송을 할것이 아니라 리액트로 추가 로직구현을 할것이므로 기본 전송기능 막음
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';
		fetchFlickr({ type: 'search', keyword: keyword });
	};

	//검색함수가 한번이라도 실행되면 영구적으로 초기값을 true로 변경처리
	searched.current = true;

	const fetchFlickr = async opt => {
		console.log('fetching again...');
		const num = 100;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
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

		// if (json.photos.photo.length === 0) {
		// 	return alert('해당 검색어의 결과값이 없습니다.');
		// }

		setPics(json.photos.photo);
	};
	const openModal = e => {
		setOpen(true);
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');

		//2-처음 컴포넌트 마운트시 타입을 user로 지정하고 id값으로 내 아이디등록
		fetchFlickr({ type: 'user', id: myID.current });
		//fetchFlickr({ type: 'interest' });
		//fetchFlickr({ type: 'search', keyworld: 'landscape' });
	}, []);

	return (
		<>
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
				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{/* 3항 연산자로 배열에 받아지는 값이 없으면 경고문구 출력: 주의점: 3항연산자로 JSX를 분기처리시에는 괄호로 묶어줌 */}
						{/* searched값이 true고 검색결과가 없는 2가지 조건이 동시에 만족해야지 에러메시지 출력 */}
						{searched.current && Pics.length === 0 ? (
							<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												dispatch(modalOpen());
												setIndex(idx);
											}}>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>
			{Open && (
				<Modal Open={Open} setOpen={setOpen}>
					{Pics.length !== 0 && (
						<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
					)}
				</Modal>
			)}
		</>
	);
}

/*
	순서1.일반 동적 데이터를 제외한 일반 정적인 컨텐츠가 렌더링됨 (참조객체에 20 상수값을 미리 담아놓음)
	순서2.정적인 JSX가 요소 일단은 브라우저에 렌더링완료되었기 때문에 useEffect실행가능해짐
	순서3.useEffect안쪽에서 미리 참조객체에 연결해놓은 refFrameWrap에 접근 가능 (이때 refFrameWrap에 --gap변수에 20이라는 값을 강제 적용 이때부터는 sass파일에 --gap이란 변수가 없더라도 리액트에서 동적으로 gap이라는 변수값을 넣었기 때문에 활용가능)
	순서4-리액트에 동적으로 변수값을 적용해서 돔을생성하고 나면 그 이후 scss가 해당 변수값을 읽어서 화면 스타일링
	순서1-처음에 gap이라는 참조객체값을 해석
	순서2-2번째 렌더링타임에 useEffect가 실행되면서 참조객체에 담겨있는 section요소에 강제로 gap변수값을 적용
	순서3-3번째 렌더링 타임에 fecthing데이터에 의한 동적 요소가 출력되면서 그때 비로서 변수값이 적용된 sass styling 적용 (paint)
*/
