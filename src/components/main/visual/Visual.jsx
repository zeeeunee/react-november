import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useCustomText } from '../../../hooks/useText';

//Visual parent component
export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('shorten');
	const swiperRef = useRef(null);

	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true
	});

	return (
		<figure className='Visual'>
			{/* <Swiper modules={[Pagination, Autoplay]} pagination={pagination.current} autoplay={autoplay.current} loop={true}> */}
			<Swiper {...swiperOption.current}>
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

									<Link to={`/detail/${vid.id}`} onMouseEnter={swiperRef.current?.autoplay?.stop} onMouseLeave={swiperRef.current?.autoplay?.start}>
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
