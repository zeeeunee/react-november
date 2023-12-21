import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useEffect, useState } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchMember } from './redux/memberSlice';
import { fetchHistory } from './redux/historySlice';
import { fetchFlickr } from './redux/flickrSlice';

function App() {
	const dispatch = useDispatch();
	useSelector(store => console.log(store));

	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	//slice로 부터 fetching함수 가져와서 dispatch로 자동생성된 액션객체 전달
	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMember());
		dispatch(fetchHistory());
		dispatch(fetchFlickr({ type: 'interest' }));
	}, [dispatch]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />

			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Footer />
			{Toggle && <Menu setToggle={setToggle} />}
		</div>
	);
}

export default App;
