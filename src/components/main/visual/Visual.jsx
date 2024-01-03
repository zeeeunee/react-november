import { useRef } from 'react';
import './Visual.scss';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Visual() {
	const Vids = useSelector(store => store.youtube.data);
	const swiperOpt = useRef({
		spaceBetween: 50,
		loop: true,
		slidesPerView: 3
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt}>
				{Vids.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={data.id}>
							<div className='inner'>
								<div className='picBox'>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
