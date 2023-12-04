import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	//1-참조객체에 내 아이디값 등록
	const myID = useRef('199697926@N08');

	const fetchFlickr = async (opt) => {
		const num = 100;
		const flickr_api = process.env.REACT_APP_YOUTUBE_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';

		const interestURL = `${baseURL}${method_interest}`;

		//3- userURL에는 user_id를 상수값이 아닌 호출시점에 전달된 opt객체의 id로 등록해서 URL생성
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;

		let url = '';

		//4- 만들어진 URL로 데이터요청
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);

		const data = await fetch(url);
		const json = await data.json();

		setPics(json.photos.photo);
	};

	useEffect(() => {
		//2-처음 컴포넌트 마운트시 타입을 user로 지정하고 id값으로 내 아이디등록
		fetchFlickr({ type: 'user', id: myID.current });
		//fetchFlickr({ type: 'interest' });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet'>
					<button onClick={() => fetchFlickr({ type: 'interest' })}>Interest Gallery</button>
					<button onClick={() => fetchFlickr({ type: 'user', id: myID.current })}>My Gallery</button>
				</nav>
			</article>
			<section className='frame'>
				<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic, idx) => {
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
									<span onClick={() => fetchFlickr({ type: 'user', id: pic.owner })}>{pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout>
	);
}
