// 글로벌 유틸 함수 설정
const _ = require('lodash')
const config   = require('../config.json')
const axios    = require('axios')
const lib_luni = require('./lib.luniverse.js')

// 루니버스용 Header가 포함된 Get 호출 헬퍼
function luniGet(url, params) {

	return axios.get( config.HOST+url, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`,
	        'Content-Type': 'application/json'
		},
		params: params
	})
}

// 루니버스용 Header가 포함된 Post 호출 헬퍼
function luniPost(url, body) {

	return axios.post( config.HOST+url, body, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`,
			'Content-Type': 'application/json'
		}
	})

}

// ABI를 이용해, 어레이로 반환되는 타입들을 Object로 복구 한다.
function recoverOutputs(abi, funcName, rawArray) {
	let outputs = abi.filter(i => i.name == funcName)[0].outputs;
	let result  = {}

	outputs.forEach( (i,index) => {
		result[i.name] = ((i.type.indexOf('uint') == 0) && (rawArray[index].length < 10)) ?
			Number(rawArray[index]) :
			rawArray[index];
	})

	return result;
}

//----------------------------------------------------------

module.exports = {
	luniGet,
	luniPost,
	_,
	recoverOutputs,
	toStructArray: lib_luni.toStructArray
}