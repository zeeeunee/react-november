import Anime from '../asset/anime';

export function useScroll(scrollFrame) {
	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	const getCurrentScroll = (selfEl, baseLine = -window.innerHeight / 2) => {
		const scroll = scrollFrame.scrollTop - baseLine;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};
	return { scrollTo, getCurrentScroll };
}
