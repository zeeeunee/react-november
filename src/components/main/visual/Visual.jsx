import { useRef } from 'react';
import './Visual.scss';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function Visual() {
	const Vids = useSelector(store => store.youtube.data);
	const swiperOpt = useRef({
		modules: [Autoplay],
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true,
		slidesPerView: 1,
		centeredSlides: true, //가운데 배치된 패널이 활성화
		breakpoints: {
			1000: { slidesPerView: 3 }
		},
		onSwiper: swiper => {
			swiper.slideNext(300); //처음 롤링했을때 왼쪽 빈 패널이 없게 한번 롤링시켜줌
		}
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{Vids.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={data.id}>
							<div className='inner'>
								<div className='picBox'>
									<p>
										<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
									</p>
									<p>
										<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
									</p>
								</div>
								<div className='txtBox'>
									<h2>{data.snippet.title}</h2>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
