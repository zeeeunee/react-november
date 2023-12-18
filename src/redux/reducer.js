import { combineReducers } from 'redux';
import * as types from './action';

//순서1 - 리듀서 함수 호출되면서 빈배열로 멤버데이터가 저장될 전역 state값 초기화
const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'types.MEMBER.success':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	switch (action.type) {
		case 'types.HISTORY.success':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case 'types.YOUTUBE.success':
			return { ...state, youtube: action.payload };
		case 'tyes.YOUTUBE.fail':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const modalReducer = (state = { modal: false }, action) => {
	switch (action.type) {
		case types.MODAL.start:
			return { ...state, modal: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer, modalReducer });

export default reducers;
