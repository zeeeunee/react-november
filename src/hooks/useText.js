//use로 시작하는 커스텀훅 함수는 컴포넌트단에서 호출가능
//컴포넌트 안쪽의 또다른 hook이나 일반 핸들러함수 안쪽에서는 호출 불가능
//해결방법 : 커스텀훅이 특정기능을 수행해주는 또다른 함수를 내부적으로 생성한다음에 해당함수를 리턴
//일반 핸들러함수 안쪽에서 커스텀훅 자체는 호출불가하지만 커스텀훅이 리턴한 자식함수는 호출가능

export function useSplitText() {
	//해당 useSplitText훅은 호출시 아래의 함수를 리턴
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `<span style='transition-duration:${speed}s;transition-delay:${interval * count}s; display:inline-block;'>${letter}</span>`;
			count++;
		}
		ref.innerHTML = tags;
	};
}

export function useCustomText(type) {
	const toUpperText = (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};
	if (type === 'title') {
		return (txt) => {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		};
	}
	if (type === 'shorten') {
		return (txt, len = 100) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}
	if (type === 'combined') {
		//regEx (regular expression: 정규표현식) 문자열의 패턴별로 특정 기능 수행식
		// /정규표현식/
		return (txt) => {
			const resultText = txt
				.split(/-|_|\+/) //인수로 들어가는 특수문자가 -,_,+일때는 해당 구분자로 문자를 분리함 (예약어 문자열을 앞에 \붙여서 처리)
				.map((data) => toUpperText(data))
				.join(' ');
			return resultText;
		};
	}
}
