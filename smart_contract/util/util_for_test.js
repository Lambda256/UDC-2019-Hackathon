let _ = require('lodash')

// https://github.com/pouladzade/Seriality

// 버퍼로 Serialize된 스트링을 다시 어레이로 복구
/* example
0xeca095eab8b0ec988100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009
486f6c64657220320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008
=>
return) ['Holder 2', '정기영']
*/
function parseBytes(data) {
	let output = []

	data
	.substr(2)	// 0x 잘라내기
	.match(/.{1,128}/g) // HEX 코드라서 64개x2바이트 = 128 바이트씩 분리
	.forEach(i => {
		output.push( i
			.match(/.{1,2}/g)  // 2바이트씩 분리
			.filter( (j, index, arr) => ((j != '00') && (index != arr.length-1)) ) // 맨뒤 스트링 길이 제거
			.map(k => parseInt(k, 16))	// Int Array로 전환
		)
	})

	return output.map(i => {
		return new Buffer.from(i).toString('utf8')
	}).reverse() // 바이트 어레이는 뒤집혀서 온다.
}


// 개별 어레이를 스트럭쳐에 맞는 어레이로 복구
// prefix * : 파싱이 필요한 바이트어레이
// prefix $ : 숫자형으로 변환
/* example
let data = lxUtil.toStructArray(
	['id', '$amount', '*name'],
	r.data.data.res)
return)
 [ {id:'0', 'amount':4, name:'Holder 1'},
   {id:'1', 'amount':4, name:'Holder 2'},
   {id:'2', 'amount':4, name:'정기영'} ]
*/
function toStructArray(fields, returnValue) {

	// 오브젝트 타입일때는, 0,1,2 이렇게 들어오므로 어레이로 변환
	if (!Array.isArray(returnValue)) {
		let reArray = []
        let keys = Object.keys(returnValue).sort()
        keys.forEach(i => { reArray.push( returnValue[i] ) })
		returnValue = reArray
	}

	let stArray = []

	// 바이트어레이 파싱이 필요한 필드들 변환처리
	fields.forEach( (item, index) => {
		if (item[0] == '$') {
			returnValue[index] = returnValue[index].map(n => Number(n.toString()))
			fields[index] = item.substr(1)
		} else if (item[0] == '*') {
			returnValue[index] = parseBytes(returnValue[index])
			fields[index] = item.substr(1)
		}
	})

	// 오브젝트로 통합
	_.zip( ...returnValue ).forEach(item => {
		stArray.push( _.zipObject(fields, item) )
	})

	return stArray
}

// 테스트용 벨런스 추적기
class Tracker {
    constructor(token, account) {
		this.account = account
		this.token   = token
	}

    async get() {
        this.prev = await this.token.balanceOf(this.account)
        return this.prev
	}

    async delta() {
        const current = await this.token.balanceOf(this.account)
        const delta   = current.sub(this.prev)
        this.prev = current
        return delta
    }
}

async function balanceTracker(token, owner) {
	const tracker = new Tracker(token, owner)
	await tracker.get()
	return tracker
}

module.exports = {
	parseBytes,
	toStructArray,
	balanceTracker
}
