module.exports = router = require('express').Router()

const { luniGet, luniPost, recoverOutputs, toStructArray } = require('../core/helper.js')
const { getTransaction, getFuncDetail, getBlock } = require('../core/blockchain.js')

// TxHash를 조회한 정보를 반환한다.
router.get('/txhash/:txid', async (req, res, next)=>{

	let txid = String(req.params.txid)

	getTransaction(txid).then(r => {

		res.json(r)

	}).catch(err => {
		res.status(500).json({success:false, message: err.message})
	})

})

// TxHash를 조회하여 컨트랙트 함수 호출 정보를 가져온다.
router.get('/txfunc/:txid', async (req, res, next)=>{

	let txid = String(req.params.txid)

	getFuncDetail(txid).then(r => {
		
		r.txid = txid;
		res.json(r)

	}).catch(err => {
		res.status(500).json({success:false, message: err.message})
	})

})

// 블럭에서 컨트랙트 함수 호출 정보를 가져온다. 
router.get('/func/:blockNumber', async (req, res, next)=>{

	let bNumber = String(req.params.blockNumber)

	let block    = await getBlock(bNumber)
	let callInfo = await getFuncDetail( block.transactions[0] )
	callInfo.txid = block.transactions[0]

	res.json(callInfo)
})
