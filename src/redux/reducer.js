import { combineReducers } from 'redux';

//순서1 - 리듀서 함수 호출되면서 빈배열로 멤버데이터가 저장될 전역 state값 초기화
const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_HISTORY':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer });
export default reducers;
