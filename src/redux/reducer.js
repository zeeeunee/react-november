import { combineReducers } from 'redux';

//dispatch가 필요한 이유
//원래 데이터는 자체DB이던 외부 API데이터이던 어쨌든 fetching을 통해서 외부데이터를 가져와야됨
//그래서 위와 같이 reducer안쪽에 초기 데이터를 설정하는 것이 불가능

//dispatch로 외부데이터를 fetching후 전역 state에 담는 순서
//1. 컴포넌트에서 useEffect로 mount시 fetching함수 호출후 데이터 반환
//2. 해당데이터를 지역state에 담는 것이 아닌 action객체의 payload에 담아서 dispatch로 reducer에 전달
//3. 아래 reducer함수 로직에 의해서 fetching된 데이터가 store에 전달되고
//4. 이후 각 컴포넌트에서 useSelector로 해당 데이터에 자유롭게 접근 가능
const initMember = {
	members: [
		{
			name: 'David',
			position: 'President',
			pic: 'member1.jpg'
		},
		{
			name: 'Julia',
			position: 'Vice President',
			pic: 'member2.jpg'
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg'
		},
		{
			name: 'Michael',
			position: 'Front-end Developer',
			pic: 'member4.jpg'
		},
		{
			name: 'Emma',
			position: 'Back-end Developer',
			pic: 'member5.jpg'
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg'
		}
	]
};

//초기 데이터값을 state로 지정하고 추후 action객체가 넘어오면 action의 타입에 따라서 해당 데이터를 변경해주는 변형자함수
//{type:'SET_MEMBERS':payload[변경할데이터배열]}
//{type:'ANYTHING':payload:err}
/*
const memberReducer = (state = initMember, action) => {
	if (action.type === 'SET_MEMBERS') {
		return { ...state, members: action.payload };
	} else {
		return state;
	}
};
*/
//위와 똑같은 로직
const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

//해당 파일에서 내보내는 여러개의 리듀서객체를 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer });
export default reducers;
