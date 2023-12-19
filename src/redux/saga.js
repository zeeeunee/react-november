/*
  ---saga 전용 내장 함수들---
  takeLatest(제일 마지막 요청만 수행), takeEvery (들어오는 모든 요청을 전부수행)
  call (saga에서 api관련 fetch함수를 호출할때 쓰는 함수, 두번째 인수값 전달가능)
  put (saga에서 만들어진 액션객체를 리듀서에 전달, 기존 dispatch랑 동일 )
  fork (saga에서 제너레이터 호출 및 이터러블 객체 반환 함수)  
  all (이터러블 객체 비동기적으로 그룹호출 함수)
*/
import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment, fetchHistory } from './api';
import * as types from './actionType';

function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}

function* returnMembers() {
	try {
		const response = yield call(fetchDepartment);
		yield put({ type: types.MEMBERS.success, payload: response.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.fail, payload: err });
	}
}

function* callHistory() {
	yield takeLatest(types.HISTORY.start, returnHistory);
}

function* returnHistory() {
	try {
		const response = yield call(fetchHistory);
		yield put({ type: types.HISTORY.success, payload: response.history });
	} catch (err) {
		yield put({ type: types.HISTORY.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory)]);
}
