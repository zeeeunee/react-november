import { useSelector } from 'react-redux';
import './Visual.scss';

export default function Visual() {
	const Vids = useSelector(store => store.youtubeReducer.youtube);
	return (
		<figure className='Visual'>
			{Vids?.map((vid, idx) => {
				console.log(vid);
				if (idx >= 4) return null;
				return (
					<article key={vid.id}>
						<div className='pic'>
							<img src={vid.snippet.thumbnails.default.url} alt={vid.snippet.title} />
						</div>
					</article>
				);
			})}
		</figure>
	);
}
