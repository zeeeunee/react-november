import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pid = process.env.REACT_APP_YOUTUBE_LIST;
	const num = 6;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const response = await fetch(baseURL);
	const data = await response.json();
	return data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['fetchYoutube'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 100 * 60 * 60 * 24,
		retry: 3 //만약 데이터 요청 실패시 재시도 횟수, default:3
	});
};

const fetchYoutubeById = async ({ queryKey }) => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${queryKey[1]}`;

	try {
		const data = await fetch(baseURL);
		const json = await data.json();
		return json.items[0].snippet;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeQueryById = id => {
	return useQuery(['fetchYoutube', id], fetchYoutubeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
