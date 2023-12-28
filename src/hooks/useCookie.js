/*
Cookie
:서버에서 https 통신으로 client(Browser)에 데이터를 전달할때 header객체에 전달하는 경량의 문자 데이터(4KB:개별쿠키값)
:사용자의 브라우저에 물리적인 파일형태로 저장이 되기 때문에 사용자가 브라우저를 닫더라도 유지시킬수 있는 값
:만료일이 존재하고 사용자가 설정가능, 만료일을 지정하지 않으면 브라우저를 닫는 순간 쿠키값이 삭제됨

Cookie vs Session
:Cookie정보는 client쪽에 저장되는 반면 Session은 서버쪽에 저장됨
:덜 중요한 값을 유지시킬때 주로 cookie사용 (장바구니 목록, 오늘 하루 팝업안보기이 등...)
:사용자 개인정보같이 중요한 정보값을 session사용 (사용자 로그인 정보 등...)

Cookie vs Local Storage
:cookie데이터가 Local Storage에 비해서 경량의 문자값만 등록 가능 (cookie:4KB vs Local Storage:5MB)
:cookie는 만료일 지정가능 하기 때문에 자동적으로 값이 제거됨
:Local Storage는 사용자가 직접 삭제하기 전까지는 계속 유지됨
*/
export function useCookie(name, value, time) {
	let now = new Date();
	let duedate = now.getTime() + 1000 * time; //지금으로부터 time초뒤의 만료시간값
	now.setTime(duedate); //시간객체값을 위의 생성한 만료시간값으로 변경
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`; //한국시로 구한 만료시간값을 전세계 표준시로 변환해서 쿠키값을 만료시간값으로 설정
}
