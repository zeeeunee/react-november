import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useCustomText } from '../../../hooks/useText';

//Visual parent component
export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('shorten');

	const swiperRef = useRef(null);

	//swiper pagination option
	const pagination = useRef({
		clickable: true,
		renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>`
	});

	//swiper autoplay option
	const autoplay = useRef({
		delay: 2000,
		disableOnInteraction: true
	});

	return (
		<figure className='Visual'>
			<Swiper modules={[Pagination, Autoplay]} pagination={pagination.current} autoplay={autoplay.current} loop={true}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;

					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<div className='picBox'>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
								</div>
								<div className='txtBox'>
									<h2>{shortenText(vid.snippet.title, 50)}</h2>

									<Link to={`/detail/${vid.id}`} onMouseEnter={swiperRef.current.autoplay.stop} onMouseLeave={swiperRef.current.autoplay.start}>
										{/*마우스올리면 스와이프안되게하는기능 */}
										<span></span>View Detail
									</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}

				<Btns swiperRef={swiperRef} />
			</Swiper>
		</figure>
	);
}

//Swiper control child component
function Btns({ swiperRef }) {
	swiperRef.current = useSwiper();

	useEffect(() => {
		swiperRef.current.init(0);
		swiperRef.current.slideNext(300);
	}, [swiperRef]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiperRef.current.slideNext(300);
					swiperRef.current.autoplay.start();
				}}>
				start
			</button>
			<button onClick={() => swiperRef.current.autoplay.stop()}>stop</button>
		</nav>
	);
}
