const config 	 = require('../config.json')
const Web3   	 = require('web3')

let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider(config.provider))

//----------------------------------------------------------
let Contracts = {}

/*
	ABI 파일 불러옴
*/
let loadAbi = () => {
	for (let key in config.contracts) {

		let abiDecoder = require('abi-decoder')
		let abiFile    = require("../"+config.contracts[key].abiFile)
		let abiData    = (abiFile.abi || abiFile)

		abiDecoder.addABI(abiData)

		Contracts[key] = {
			abi: abiData,
			decoder: abiDecoder
		}

	}
}

loadAbi()

let getTransaction = async (txHash) => { return await web3.eth.getTransaction(txHash) }
let getBlock 	   = async (blockNumber) => { return await web3.eth.getBlock(blockNumber) }

// 컨트랙트 호출정보를 불러옴.
let getFuncDetail = async (txHash) => {

	let contractName = null;
	let txData = await getTransaction(txHash)

	for (let key in config.contracts) {
		if (config.contracts[key].address == txData.to) {
			contractName = key
			break
		}			
	}

	if (!contractName) return null;

	let deData = Contracts[contractName].decoder.decodeMethod(txData.input)
	let block  = await web3.eth.getBlock(txData.blockNumber)

	let result = {
		"function" : deData.name,
		"values" : {},
		"from" : txData.from,
		"to" : txData.to,
		"blockNumber" : txData.blockNumber,
		"timestamp": block.timestamp
	}

	deData.params.forEach(i => {
		result.values[i.name] = i.value;
	})

	return result
}
/*
return example.
{
	"function": "give",
	"values": {
		"projectId": "0",
		"name": "가나다",
		"amount": "2000000000000000000",
		"applyTrooper": true
	},
	"from": "0x6F416e6c9DE497CAb058FA552cC578DCe8E66a5D",
	"to": "0x0b15Bffb75dc8a2C854f5E51F1426764Cfb24c9c",
	"blockNumber": 9032090,
	"timestamp": 1567464748
}
*/

module.exports = {
	web3,
	Contracts,
	getBlock,
	getTransaction,
	getFuncDetail
}
